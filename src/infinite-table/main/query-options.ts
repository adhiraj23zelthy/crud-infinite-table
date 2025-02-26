import { infiniteQueryOptions, keepPreviousData } from "@tanstack/react-query";
import type { Percentile } from "../lib/request/percentile";
import type { FacetMetadataSchema } from "./schema";

export type LogsMeta = {
  currentPercentiles: Record<Percentile, number>;
};

export type InfiniteQueryMeta<TMeta = Record<string, unknown>> = {
  totalRowCount: number;
  filterRowCount: number;
  // chartData: { timestamp: number; [key: string]: number }[];
  facets: Record<string, FacetMetadataSchema>;
  metadata?: TMeta;
};

export const dataOptions = (search: any,searchParamsSerializer: any) => {
  return infiniteQueryOptions({
    queryKey: ["data-table", searchParamsSerializer({ ...search, uuid: null })], // remove uuid as it would otherwise retrigger a fetch
    queryFn: async ({ pageParam = 0 }) => {
      const start = (pageParam as number) * search.size;
      const serialize = searchParamsSerializer({ ...search, start });
      const response = await fetch(`/serialization-wh/api/${serialize}`);
      return response.json() as Promise<{
        data: any;
        meta: InfiniteQueryMeta<LogsMeta>;
      }>;
    },
    initialPageParam: 0,
    getNextPageParam: (_lastGroup, groups) => groups.length,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
};
