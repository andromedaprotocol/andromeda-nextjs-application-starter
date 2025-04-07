"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./client";
import { FC, useState } from "react";
import { createTRPCClient, trpcReactClient } from "./client";

export const TRPCReactProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [trpcClient] = useState(() => createTRPCClient());

  return (
    <QueryClientProvider client={queryClient}>
      <trpcReactClient.Provider client={trpcClient} queryClient={queryClient}>
        {children}
      </trpcReactClient.Provider>
    </QueryClientProvider>
  );
};
