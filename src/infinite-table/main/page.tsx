import * as React from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { dataOptions } from "./query-options";
import { Client } from "./client";
import { LoaderCircle } from "lucide-react";
import {
  createSerializer
} from "nuqs";
import { createSearchParamsCache } from "nuqs/server";
import { cache } from "react";
import { prepareColumnFilterSchema, prepareSearchParamsParser } from "./utils";
import { SiTicktick } from "react-icons/si";
import { ImCross } from "react-icons/im";
import { FaThumbsUp } from "react-icons/fa";
import { FaShippingFast } from "react-icons/fa";
import { FaUndo } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { FaShip } from "react-icons/fa";
import { FaGlobeAsia } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa6";
import { useFilterOrderStore } from "../../store/filterStore";

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
  const {filterOrder, setFilterOrder} = useFilterOrderStore();
  const [sheetFields, setSheetFields] = React.useState<any[]>([]);
  const [tableHeading, setTableHeading] = React.useState<string>("");

  const searchParamsParser = prepareSearchParamsParser(filterFields, 15);

  const columnFilterSchema = prepareColumnFilterSchema(filterFields);

  
  const searchParamsCache = cache(() => createSearchParamsCache(searchParamsParser));
  
  const searchParamsSerializer = createSerializer(searchParamsParser);
  

  const fetchColumnConfigs = async () => {
    try {
      const response = await fetch('/serialization_table_config_api/');
      // const response = await fetch('/infinite/api/config');
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const columnConfigData = data.columns.map((config: any) => ({
        ...config,
        cell: ({ row }: { row: any }) => {
          const value = row.getValue(config.accessorKey) as string;
          if(config.accessorKey == row.original?.redirect_link?.key){
            return <div className="text-sm text-[#212429] py-1 font-medium">{value}</div>;

          }else if(value=='Decommissioned'){
            return <div className="text-sm bg-[#FCE9E9] text-[#E11F1F] border border-1 border-[#E11F1F] py-1 font-medium flex items-center gap-1 px-2 rounded-md"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_710_511)">
            <path d="M8.74965 8.75L5.25 5.25M5.25037 8.75L8.75 5.25" stroke="#E11F1F" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.8334 6.99996C12.8334 3.7783 10.2217 1.16663 7.00008 1.16663C3.77842 1.16663 1.16675 3.7783 1.16675 6.99996C1.16675 10.2216 3.77842 12.8333 7.00008 12.8333C10.2217 12.8333 12.8334 10.2216 12.8334 6.99996Z" stroke="#E11F1F" stroke-width="0.875"/>
            </g>
            <defs>
            <clipPath id="clip0_710_511">
            <rect width="14" height="14" fill="white"/>
            </clipPath>
            </defs>
            </svg>
            {value}</div>;
          }else if(value=='Commissioned'){

            return <div className="text-sm bg-[#E8F3FF] text-[#0066DA] border border-1 border-[#0066DA] py-1 font-medium flex items-center gap-1 px-2 rounded-md"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_710_465)">
            <path d="M12.8334 7.00008C12.8334 3.77842 10.2217 1.16675 7.00008 1.16675C3.77842 1.16675 1.16675 3.77842 1.16675 7.00008C1.16675 10.2217 3.77842 12.8334 7.00008 12.8334C10.2217 12.8334 12.8334 10.2217 12.8334 7.00008Z" stroke="#0066DA" stroke-width="0.875"/>
            <path d="M4.66675 7.29167L6.12508 8.75L9.33341 5.25" stroke="#0066DA" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_710_465">
            <rect width="14" height="14" fill="white"/>
            </clipPath>
            </defs>
            </svg>
            {value}</div>;
          }else if(value=='Consumed'){
            return <div className="text-sm bg-[#E3FBE8] text-[#02B426] py-1 border border-1 border-[#02B426] font-medium flex items-center gap-1 px-2 rounded-md">
             <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_710_465)">
<path d="M12.8334 7.00008C12.8334 3.77842 10.2217 1.16675 7.00008 1.16675C3.77842 1.16675 1.16675 3.77842 1.16675 7.00008C1.16675 10.2217 3.77842 12.8334 7.00008 12.8334C10.2217 12.8334 12.8334 10.2217 12.8334 7.00008Z" stroke="#02B426" stroke-width="0.875"/>
<path d="M4.66675 7.29167L6.12508 8.75L9.33341 5.25" stroke="#02B426" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_710_465">
<rect width="14" height="14" fill="white"/>
</clipPath>
</defs>
</svg>
            {value}</div>;

          }else if(value=='Active'){
            return <div className="text-sm bg-[#E8F3FF] text-[#0066DA] border border-1 border-[#0066DA] py-1 font-medium flex items-center gap-1 px-2 rounded-md"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_710_465)">
            <path d="M12.8334 7.00008C12.8334 3.77842 10.2217 1.16675 7.00008 1.16675C3.77842 1.16675 1.16675 3.77842 1.16675 7.00008C1.16675 10.2217 3.77842 12.8334 7.00008 12.8334C10.2217 12.8334 12.8334 10.2217 12.8334 7.00008Z" stroke="#0066DA" stroke-width="0.875"/>
            <path d="M4.66675 7.29167L6.12508 8.75L9.33341 5.25" stroke="#0066DA" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_710_465">
            <rect width="14" height="14" fill="white"/>
            </clipPath>
            </defs>
            </svg>
            {value}</div>;
          }else if(value=='Inactive'){
            return <div className="text-sm bg-gray-100 text-black py-1 border border-1 border-black font-medium flex items-center gap-1 px-2 rounded-md">{value}</div>;
          }else if(value=='Delivered'){

            return <div className="text-sm bg-[#E3FBE8] text-[#02B426] py-1 border border-1 border-[#02B426] font-medium flex items-center gap-1 px-2 rounded-md"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.25 4.08337V7.00004M1.75 4.08337C1.75 5.871 1.75 9.78499 1.75 10.0108C1.75 10.8173 2.88496 11.2967 5.15488 12.2556C6.06678 12.6408 6.52272 12.8334 7 12.8334V6.62367" stroke="#02B426" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8.75 11.0833C8.75 11.0833 9.26042 11.0833 9.77083 12.25C9.77083 12.25 11.3922 9.33333 12.8333 8.75" stroke="#02B426" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.85679 5.65326L3.15275 4.82871C2.21758 4.37618 1.75 4.14993 1.75 3.79163C1.75 3.43333 2.21758 3.20707 3.15275 2.75455L4.85679 1.92999C5.90847 1.42108 6.43434 1.16663 7 1.16663C7.56566 1.16663 8.09153 1.42108 9.14322 1.92999L10.8473 2.75455C11.7824 3.20707 12.25 3.43333 12.25 3.79163C12.25 4.14993 11.7824 4.37618 10.8473 4.82871L9.14322 5.65326C8.09153 6.16218 7.56566 6.41663 7 6.41663C6.43434 6.41663 5.90847 6.16218 4.85679 5.65326Z" stroke="#02B426" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3.5 7L4.66667 7.58333" stroke="#02B426" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9.91659 2.33337L4.08325 5.25004" stroke="#02B426" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {value}</div>;
          }else if(value=='Returned'){

            return <div className="text-sm bg-[#FCE9E9] text-[#E11F1F] py-1 border border-1 border-[#E11F1F] font-medium flex items-center gap-1 px-2 rounded-md"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.75 7.58329V4.66663H12.25V7.58329C12.25 9.78316 12.25 10.8832 11.5666 11.5665C10.8832 12.25 9.7832 12.25 7.58333 12.25H6.41667C4.21678 12.25 3.11684 12.25 2.43342 11.5665C1.75 10.8832 1.75 9.78316 1.75 7.58329Z" stroke="#E11F1F" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1.75 4.66667L2.25481 3.54487C2.64631 2.67486 2.84206 2.23985 3.23885 1.99492C3.63563 1.75 4.14458 1.75 5.1625 1.75H8.8375C9.85542 1.75 10.3644 1.75 10.7612 1.99492C11.1579 2.23985 11.3537 2.67486 11.7452 3.54487L12.25 4.66667" stroke="#E11F1F" stroke-width="0.875" stroke-linecap="round"/>
            <path d="M7 4.66667V1.75" stroke="#E11F1F" stroke-width="0.875" stroke-linecap="round"/>
            <path d="M4.95841 7.87504H8.16675C8.8111 7.87504 9.33341 8.39736 9.33341 9.04171C9.33341 9.68606 8.8111 10.2084 8.16675 10.2084H7.58341M5.83341 6.70837L4.66675 7.87504L5.83341 9.04171" stroke="#E11F1F" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {value}</div>;
          }else if(value=='Disposed'){

            return <div className="text-sm bg-[#FCE9E9] text-[#E11F1F] border border-1 border-[#E11F1F] py-1 font-medium flex items-center gap-1 px-2 rounded-md"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.89575 2.91663H5.06304C5.45312 2.91663 5.81739 2.72168 6.03374 2.39711L6.50776 1.68614C6.72412 1.36158 7.08841 1.16663 7.47849 1.16663H10.0965C10.5987 1.16663 11.0445 1.48796 11.2033 1.96436L11.5208 2.91663M12.3958 2.91663H4.81242" stroke="#E11F1F" stroke-width="0.875" stroke-linecap="round"/>
            <path d="M11.5208 2.91663L11.1593 8.69513C11.1467 8.88605 11.135 9.06408 11.1232 9.23033M2.77075 2.91663L3.12344 8.68964C3.21376 10.0979 3.25893 10.802 3.63332 11.3083C3.81842 11.5587 4.05689 11.7699 4.33353 11.9287C4.89309 12.25 5.64257 12.25 7.14149 12.25H8.60409" stroke="#E11F1F" stroke-width="0.875" stroke-linecap="round"/>
            <path d="M11.8125 11.0834C11.8125 10.1168 11.029 9.33337 10.0625 9.33337C9.09597 9.33337 8.3125 10.1168 8.3125 11.0834C8.3125 12.0499 9.09597 12.8334 10.0625 12.8334C11.029 12.8334 11.8125 12.0499 11.8125 11.0834Z" stroke="#E11F1F" stroke-width="0.875"/>
            </svg>
            {value}</div>;
          }else if(value=='Staged'){

            return <div className="text-sm bg-[#E8F3FF] text-[#0066DA] border border-1 border-[#0066DA] py-1 font-medium flex items-center gap-1 px-2 rounded-md"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.25 4.08337V7.00004M1.75 4.08337C1.75 5.871 1.75 9.78499 1.75 10.0108C1.75 10.8173 2.88496 11.2967 5.15488 12.2556C6.06678 12.6408 6.52272 12.8334 7 12.8334V6.62367" stroke="#0066DA" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8.75 11.0833C8.75 11.0833 9.26042 11.0833 9.77083 12.25C9.77083 12.25 11.3922 9.33333 12.8333 8.75" stroke="#0066DA" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.85679 5.65326L3.15275 4.82871C2.21758 4.37618 1.75 4.14993 1.75 3.79163C1.75 3.43333 2.21758 3.20707 3.15275 2.75455L4.85679 1.92999C5.90847 1.42108 6.43434 1.16663 7 1.16663C7.56566 1.16663 8.09153 1.42108 9.14322 1.92999L10.8473 2.75455C11.7824 3.20707 12.25 3.43333 12.25 3.79163C12.25 4.14993 11.7824 4.37618 10.8473 4.82871L9.14322 5.65326C8.09153 6.16218 7.56566 6.41663 7 6.41663C6.43434 6.41663 5.90847 6.16218 4.85679 5.65326Z" stroke="#0066DA" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3.5 7L4.66667 7.58333" stroke="#0066DA" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9.91659 2.33337L4.08325 5.25004" stroke="#0066DA" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {value}</div>;
          }else if(value=='Out for Delivery'){

            return <div className="text-sm bg-[#FFF5E8] text-[#FF6A00] border border-1 border-[#FF6A00] py-1 font-medium flex items-center gap-1 px-2 rounded-md"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.3749 10.2083C11.3749 11.0137 10.722 11.6667 9.91659 11.6667C9.11118 11.6667 8.45825 11.0137 8.45825 10.2083C8.45825 9.40293 9.11118 8.75 9.91659 8.75C10.722 8.75 11.3749 9.40293 11.3749 10.2083Z" stroke="#FF6A00" stroke-width="0.875"/>
            <path d="M5.54167 10.2083C5.54167 11.0137 4.88875 11.6667 4.08333 11.6667C3.27792 11.6667 2.625 11.0137 2.625 10.2083C2.625 9.40293 3.27792 8.75 4.08333 8.75C4.88875 8.75 5.54167 9.40293 5.54167 10.2083Z" stroke="#FF6A00" stroke-width="0.875"/>
            <path d="M8.45842 10.2084H5.54175M11.3751 10.2084H11.8203C11.9486 10.2084 12.0127 10.2084 12.0666 10.2017C12.4641 10.1521 12.7772 9.83906 12.8267 9.44158C12.8334 9.38768 12.8334 9.32352 12.8334 9.19524V7.58337C12.8334 5.48929 11.1359 3.79171 9.04175 3.79171M1.16675 2.33337H7.00008C7.82503 2.33337 8.23751 2.33337 8.49382 2.58966C8.75008 2.84594 8.75008 3.25842 8.75008 4.08337V9.04171M1.16675 7.43754V8.75004C1.16675 9.29522 1.16675 9.56782 1.28397 9.77087C1.36077 9.90387 1.47123 10.0144 1.60425 10.0911C1.80729 10.2084 2.07989 10.2084 2.62508 10.2084" stroke="#FF6A00" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1.16675 4.08337H4.66675M1.16675 5.83337H3.50008" stroke="#FF6A00" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {value}</div>;
          }else if(value=='Expired'){

            return <div className="text-sm bg-[#FCE9E9] text-[#E11F1F] border border-1 border-[#E11F1F] py-1 font-medium flex items-center gap-1 px-2 rounded-md"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.10441 5.64829C4.51239 3.15691 5.21638 1.91121 6.18243 1.59056C6.71384 1.41415 7.28633 1.41415 7.81774 1.59056C8.7838 1.91121 9.48777 3.15691 10.8958 5.64829C12.3038 8.13965 13.0077 9.38536 12.7965 10.4004C12.6803 10.9588 12.3941 11.4652 11.9788 11.8473C11.224 12.5416 9.81607 12.5416 7.00008 12.5416C4.18413 12.5416 2.77615 12.5416 2.02131 11.8473C1.60605 11.4652 1.31981 10.9588 1.20363 10.4004C0.992444 9.38536 1.69643 8.13965 3.10441 5.64829Z" stroke="#E11F1F" stroke-width="0.875"/>
            <path d="M6.99536 9.33325H7.00099" stroke="#E11F1F" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7 7.58335V5.25" stroke="#E11F1F" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {value}</div>;
          }else if(value=='Shipped'){
            return <div className="text-sm bg-[#FFF5E8] text-[#FF6A00] border border-1 border-[#FF6A00] py-1 font-medium flex items-center gap-1 px-2 rounded-md"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_711_543)">
            <path d="M7.58342 12.8334C7.10613 12.8334 6.6502 12.6344 5.73828 12.2363C4.67394 11.7717 3.85915 11.4161 3.29386 11.0834H1.16675M7.58342 12.8334C8.0607 12.8334 8.51663 12.6344 9.42856 12.2363C11.6985 11.2455 12.8334 10.7501 12.8334 9.91675V3.79175M7.58342 12.8334V6.41675M2.33341 3.79175V5.54175" stroke="#FF6A00" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5.44004 5.65339L3.73601 4.82883C2.80083 4.37631 2.33325 4.15005 2.33325 3.79175C2.33325 3.43345 2.80083 3.20719 3.73601 2.75455L5.44004 1.93011C6.49172 1.4212 7.01759 1.16675 7.58325 1.16675C8.14891 1.16675 8.67479 1.4212 9.72648 1.93011L11.4305 2.75455C12.3657 3.20707 12.8333 3.43345 12.8333 3.79175C12.8333 4.15005 12.3657 4.37631 11.4305 4.82883L9.72648 5.65339C8.67479 6.1623 8.14891 6.41675 7.58325 6.41675C7.01759 6.41675 6.49172 6.1623 5.44004 5.65339Z" stroke="#FF6A00" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10.5796 2.34253L4.58911 5.24124" stroke="#FF6A00" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1.16675 7.58325H2.91675" stroke="#FF6A00" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1.16675 9.33325H2.91675" stroke="#FF6A00" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_711_543">
            <rect width="14" height="14" fill="white"/>
            </clipPath>
            </defs>
            </svg>
            {value}</div>;
          }else if(value=='Arriving in India'){
            return <div className="text-sm bg-[#E8F3FF] text-[#0066DA] border border-1 border-[#0066DA] py-1 font-medium flex items-center gap-1 px-2 rounded-md"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.57665 6.95242L4.51417 5.77307C4.83931 5.57548 5.00189 5.47668 5.11411 5.34117C5.59977 4.75473 5.17208 3.88855 5.24451 3.20658C5.31947 2.50066 5.99264 1.53517 6.67123 1.23584C6.88006 1.14372 7.11964 1.14372 7.32847 1.23584C8.00706 1.53517 8.68023 2.50066 8.75519 3.20658C8.82764 3.88855 8.39994 4.75473 8.88562 5.34117C8.99779 5.47668 9.16037 5.57548 9.48552 5.77307L11.4232 6.95236C12.0163 7.31327 12.2499 7.6985 12.2499 8.42312C12.2499 8.81751 12.0753 8.92321 11.7234 8.84271L8.32562 8.0653L8.17302 9.40044C8.11772 9.88455 8.09007 10.1266 8.17005 10.3483C8.35741 10.8676 8.99342 11.2929 9.38186 11.6706C9.59659 11.8793 9.83085 12.4796 9.58609 12.7525C9.43494 12.9211 9.18942 12.7842 9.02049 12.7185L7.39374 12.0858C7.19926 12.0102 7.10196 11.9724 6.99988 11.9724C6.89774 11.9724 6.80044 12.0102 6.60595 12.0858L4.97923 12.7185C4.81027 12.7842 4.56478 12.9211 4.41364 12.7525C4.16884 12.4796 4.40314 11.8793 4.61782 11.6706C5.00628 11.2929 5.64232 10.8676 5.82965 10.3483C5.90963 10.1266 5.88198 9.88455 5.82666 9.40044L5.6741 8.0653L2.27651 8.84265C1.92442 8.92321 1.74989 8.81745 1.75 8.42289C1.75019 7.69839 1.98374 7.31333 2.57665 6.95242Z" stroke="#0066DA" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {value}</div>;
          }else{
            return <div className="text-sm text-[#212429] py-1 font-medium">{value}</div>;
          }
        }
      }));
      let data_table_column_order = data.column_order.map((item) => item.key);
      let data_table_visibility = {}
      data.column_order.forEach((item) => {
        data_table_visibility[item.key] = item.visibility;
      })

      localStorage.setItem('data-table-column-order', JSON.stringify(data_table_column_order));
      localStorage.setItem('data-table-visibility', JSON.stringify(data_table_visibility));

      setColumns(columnConfigData);
      setFilterFields(data.filterFields);
      setFilterOrder(data.filter_order);
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
      <React.Suspense fallback={<></>}>
      {/* <React.Suspense fallback={<LoaderCircle className="h-16 w-16 animate-spin" />}> */}
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
