import * as React from "react";
import { cn } from "../../../lib/utils";
import { Table } from "@tanstack/react-table";
import { DataTableSheetRowAction } from "./data-table-sheet-row-action";
import { DataTableFilterField, SheetField } from "../types";
import { SheetDetailsContentSkeleton } from "./data-table-sheet-skeleton";
import { DataTableSheetTrackHistory } from "./data-table-sheet-track-history";
import { ExternalLink } from 'lucide-react';

interface DataTableSheetContentProps<TData, TMeta>
  extends React.HTMLAttributes<HTMLDListElement> {
  data?: any;
  table: Table<TData>;
  fields: SheetField<TData, TMeta>[];
  filterFields: DataTableFilterField<TData>[];
  totalRows: number;
  filterRows: number;
  totalRowsFetched: number;
  metadata?: TMeta & {
    totalRows: number;
    filterRows: number;
    totalRowsFetched: number;
  };
}


export function DataTableSheetContent<TData, TMeta>({
  data,
  table,
  className,
  fields,
  filterFields,
  metadata,
  ...props
}: DataTableSheetContentProps<TData, TMeta>) {
  console.log('data in sheet', data, fields)
  if (!data) return <SheetDetailsContentSkeleton fields={fields} />;

  return (
    <dl className={cn("divide-y", className)} {...props}>
      {fields.map((field) => {
        if (field.condition && !field.condition(data)) return null;

        const Component = field.component;
        const value = String(data[field.id]);
        console.log('value', field.label, data.redirect_link.key)
        return (
          <div key={field.id.toString()}>
              <div
                className={cn(
                  "flex gap-4 my-1 py-1 text-sm justify-between items-center w-full",
                  field.className
                )}
              >
                <dt className="shrink-0 text-muted-foreground">
                  {field.label}
                </dt>
                <dd className="font-mono w-full text-right">
                  {/* {Component ? (
                    <Component {...data} metadata={metadata} />
                  ) : ( */}
                  {
                    field.label==data.redirect_link.key ? <a className="flex justify-end text-blue-600" target="_blank" href={data.redirect_link.url}><span>{value}</span><ExternalLink className="w-4 h-4 ml-1" /></a> : value
                  }
                    {/* {value} */}
                  {/* )} */}
                </dd>
              </div>
           
          </div>
        );
      })}
      <div className="pb-20">
      <DataTableSheetTrackHistory data={data} />
      </div>
    </dl>
  );
}
