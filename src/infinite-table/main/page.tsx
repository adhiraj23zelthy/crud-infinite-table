
// import * as React from "react";
// import { useSearchParams } from 'next/navigation';
// import { searchParamsCache } from "./search-params";
// import { useQueryClient, QueryClientProvider} from '@tanstack/react-query';
// import { dataOptions } from "./query-options";
// import { Client } from "./client";

// // Separate component that uses useSearchParams
// function DataFetcher({ children }) {
//   const searchParams = useSearchParams();
//   console.log('searchParams', searchParams);
//   const queryClient = useQueryClient();
//   console.log('queryClient', queryClient);

//   React.useEffect(() => {
//     const search = searchParamsCache().parse(Object.fromEntries(searchParams.entries()));
//     queryClient.prefetchInfiniteQuery(dataOptions(search));
//   }, [searchParams, queryClient]);

//   return children;
// }

// export default function Page() {
//   return (
//     <React.Suspense fallback={<div>Loading...</div>}>
//       <DataFetcher>
//         <Client />
//       </DataFetcher>
//     </React.Suspense>
//   );
// }

import * as React from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { searchParamsCache } from "./search-params";
import { useQueryClient } from '@tanstack/react-query';
import { dataOptions } from "./query-options";
import { Client } from "./client";

// Initialize QueryClient
const queryClient = new QueryClient();

function DataFetcher({ children }) {
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
  console.log('searchParams', searchParams);
  const queryClient = useQueryClient();
  console.log('queryClient', queryClient);

  React.useEffect(() => {
    const search = searchParamsCache().parse(Object.fromEntries(searchParams.entries()));
    queryClient.prefetchInfiniteQuery(dataOptions(search));
  }, [searchParams, queryClient]);

  return children;
}

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <React.Suspense fallback={<div>Loading...</div>}>
        <DataFetcher>
          <Client />
        </DataFetcher>
      </React.Suspense>
    </QueryClientProvider>
  );
}
