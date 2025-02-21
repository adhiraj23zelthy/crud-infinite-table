import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import * as React from "react";
import { getQueryClient } from "./get-query-client";

export function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();


  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
