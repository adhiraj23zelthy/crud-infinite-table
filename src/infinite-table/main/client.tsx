import * as React from "react";
import { DataTableInfinite } from "./data-table-infinite";
import { useQueryStates } from "nuqs";
import { searchParamsParser } from "./search-params";
import { useInfiniteQuery } from "@tanstack/react-query";
import { dataOptions } from "./query-options";
import { useHotKey } from "../hooks/use-hot-key";

export function Client() {
  const [search] = useQueryStates(searchParamsParser);
  const [columns, setColumns] = React.useState<any[]>([]);
  const [filterFields, setFilterFields] = React.useState<any[]>([]);
  const [sheetFields, setSheetFields] = React.useState<any[]>([]);
  const [tableHeading, setTableHeading] = React.useState<string>("");
  const { data, isFetching, isLoading, fetchNextPage } = useInfiniteQuery(
    dataOptions(search)
  );
  useResetFocus();

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
      console.log(columnConfigData);
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

  const flatData = React.useMemo(
    () => data?.pages?.flatMap((page) => page.data ?? []) ?? [],
    [data?.pages]
  );

  const lastPage = data?.pages?.[data?.pages.length - 1];
  const totalDBRowCount = lastPage?.meta?.totalRowCount;
  const filterDBRowCount = lastPage?.meta?.filterRowCount;
  const metadata = lastPage?.meta?.metadata;
  const totalFetched = flatData?.length;

  const { sort, start, size, uuid, ...filter } = search;

  if (columns.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="h-8 w-8">Loading...</div>
      </div>
    );
  }


  return (
    <DataTableInfinite
    tableHeading={tableHeading}
      columns={columns}
      data={flatData}
      totalRows={totalDBRowCount}
      filterRows={filterDBRowCount}
      totalRowsFetched={totalFetched}
      defaultColumnFilters={Object.entries(filter)
        .map(([key, value]) => ({
          id: key,
          value,
        }))
        .filter(({ value }) => value ?? undefined)}
      defaultColumnSorting={sort ? [sort] : undefined}
      defaultRowSelection={search.uuid ? { [search.uuid]: true } : undefined}
      meta={metadata}
      filterFields={filterFields}
      sheetFields={sheetFields}
      isFetching={isFetching}
      isLoading={isLoading}
      fetchNextPage={fetchNextPage}
      getRowClassName={(row) => ""}
      getRowId={(row) => row.serialNumber}
    />
  );
}

function useResetFocus() {
  useHotKey(() => {
    document.body.setAttribute("tabindex", "0");
    document.body.focus();
    document.body.removeAttribute("tabindex");
  }, ".");
}
