"use client";

import { apolloClient } from "@/lib/graphql";
import { ThemeProvider } from "@/components/ThemeProvider";
import {
  KEPLR_AUTOCONNECT_KEY,
  connectAndromedaClient,
  initiateKeplr,
  useAndromedaStore,
} from "@/zustand/andromeda";
import { ApolloProvider } from "@apollo/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { FC, ReactNode, useLayoutEffect, useMemo } from "react";

interface Props {
  children?: ReactNode;
}

const Providers: FC<Props> = ({ children }) => {
  const queryClient = useMemo(() => new QueryClient(), []);
  const isConnected = useAndromedaStore((state) => state.isConnected);
  const isLoading = useAndromedaStore((state) => state.isLoading);
  const keplr = useAndromedaStore((state) => state.keplr);

  useLayoutEffect(() => {
    initiateKeplr();
  }, []);

  useLayoutEffect(() => {
    const autoconnect = localStorage.getItem(KEPLR_AUTOCONNECT_KEY);
    if (
      !isLoading &&
      typeof keplr !== "undefined" &&
      autoconnect === keplr?.mode
    ) {
      if (!isConnected) {
        connectAndromedaClient();
      }
    }
  }, [keplr, isConnected, isLoading]);

  return (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
};

export default Providers;
