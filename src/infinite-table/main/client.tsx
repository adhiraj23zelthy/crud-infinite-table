import * as React from "react";
import { DataTableInfinite } from "./data-table-infinite";
import { useQueryStates } from "nuqs";
import { useInfiniteQuery } from "@tanstack/react-query";
import { dataOptions } from "./query-options";
import { useHotKey } from "../hooks/use-hot-key";

export function Client({columns, filterFields, sheetFields, tableHeading, searchParamsSerializer, searchParamsParser}: any) {
  const [search] = useQueryStates(searchParamsParser);
  const { data, isFetching, isLoading, fetchNextPage } = useInfiniteQuery(
    dataOptions(search, searchParamsSerializer)
  );
  useResetFocus();



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
    searchParamsParser={searchParamsParser}
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
