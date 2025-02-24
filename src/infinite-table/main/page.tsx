import * as React from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';

// import { searchParamsCache } from "./search-params";
import { useQueryClient } from '@tanstack/react-query';
import { dataOptions } from "./query-options";
import { Client } from "./client";
import { z } from "zod";

import {
  createParser,
  createSerializer,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsTimestamp,
  type inferParserType,
} from "nuqs";
import { createSearchParamsCache } from "nuqs/server";
import {
  RANGE_DELIMITER,
  SORT_DELIMITER,
} from "../lib/delimiters";

import { cache } from "react";
// Initialize QueryClient
const queryClient = new QueryClient();

function DataFetcher({ children, searchParamsCache, searchParamsSerializer }) {
  function useSearchParams() {
    const searchParams = useMemo(() => {
      return new URLSearchParams(window.location.search);
    }, [window.location.search]);
  
    return {
      get: (key: string) => searchParams.get(key),
      getAll: (key: string) => searchParams.getAll(key),
      has: (key: string) => searchParams.has(key),
      toString: () => searchParams.toString(),
      entries: () => searchParams.entries(),
    };
  }
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  React.useEffect(() => {
    const search = searchParamsCache().parse(Object.fromEntries(searchParams.entries()));
    queryClient.prefetchInfiniteQuery(dataOptions(search, searchParamsSerializer));
  }, [searchParams, queryClient]);

  return children;
}

export default function Page() {
  const [columns, setColumns] = React.useState<any[]>([]);
  const [filterFields, setFilterFields] = React.useState<any[]>([]);
  const [sheetFields, setSheetFields] = React.useState<any[]>([]);
  const [tableHeading, setTableHeading] = React.useState<string>("");

  
  
  const parseAsSort = createParser({
    parse(queryValue) {
      const [id, desc] = queryValue.split(SORT_DELIMITER);
      if (!id && !desc) return null;
      return { id, desc: desc === "desc" };
    },
    serialize(value) {
      return `${value.id}.${value.desc ? "desc" : "asc"}`;
    },
  });

  const searchParamsParser = {
    uuid: parseAsString,
    date: parseAsArrayOf(parseAsTimestamp, RANGE_DELIMITER),

    // REQUIRED FOR SORTING & PAGINATION
    sort: parseAsSort,
    size: parseAsInteger.withDefault(30),
    start: parseAsInteger.withDefault(0),
  
    // REQUIRED FOR SELECTION
    id: parseAsString,
  };

  const columnFilterSchema = z.object({});

  filterFields.forEach(field => {
    const { value, type } = field; // Assuming field has 'value' and 'type' properties
    if (type === 'timerange') {
      columnFilterSchema.shape[value] = z
        .string()
        .transform((val) => val.split(RANGE_DELIMITER))
        .pipe(z.coerce.string().array().max(2))
        .optional();
    } else {
      columnFilterSchema.shape[value] = z.string().optional();
    }
  });

  filterFields.forEach(field => {
    const { value, type } = field; // Assuming field has 'value' and 'type' properties
    if (type === 'timerange') {
      searchParamsParser[value] = parseAsArrayOf(parseAsTimestamp, RANGE_DELIMITER);
    } else {
      searchParamsParser[value] = parseAsString;
    }
  });

  console.log("z obj", columnFilterSchema);
    

  
  const searchParamsCache = cache(() => createSearchParamsCache(searchParamsParser));
  
  const searchParamsSerializer = createSerializer(searchParamsParser);
  

  const fetchColumnConfigs = async () => {
    try {
      const response = await fetch('/infinite/api/config');
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      const columnConfigData = data.columns.map((config: any) => ({
        ...config,
        cell: ({ row }: { row: any }) => {
          const value = row.getValue(config.accessorKey) as string;
          return <div>{value}</div>;
        }
      }));
      console.log('form page',data);

      setColumns(columnConfigData);
      setFilterFields(data.filterFields);
      setSheetFields(data.sheetFields);
      setTableHeading(data.table_heading);
    } catch (error) {
      console.error('Failed to fetch column configurations:', error);
      setColumns([]);
    }
  };

  React.useLayoutEffect(() => {
    fetchColumnConfigs();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <React.Suspense fallback={<div>Loading...</div>}>
        <DataFetcher searchParamsCache={searchParamsCache} searchParamsSerializer={searchParamsSerializer}>
          <Client 
          columns={columns} 
          filterFields={filterFields} 
          sheetFields={sheetFields} 
          tableHeading={tableHeading} 
          searchParamsSerializer={searchParamsSerializer} 
          searchParamsParser={searchParamsParser}
          columnFilterSchema={columnFilterSchema}
          />
        </DataFetcher>
      </React.Suspense>
    </QueryClientProvider>
  );
}
