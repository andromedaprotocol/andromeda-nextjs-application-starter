"use client";
import { TRPCReactProvider } from "@/lib/trpc/provider";
import {
  KEPLR_AUTOCONNECT_KEY,
  connectAndromedaClient,
  initiateKeplr,
  useAndromedaStore,
} from "@/zustand/andromeda";
import React, { FC, ReactNode, useLayoutEffect } from "react";

interface Props {
  children?: ReactNode;
}

const Providers: FC<Props> = (props) => {
  const { children } = props;
  const isLoading = useAndromedaStore((state) => state.isLoading);
  const isInitialized = useAndromedaStore((state) => state.isInitialized);
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
      if (!isInitialized) {
        connectAndromedaClient(
          process.env.NEXT_PUBLIC_CHAIN_IDENTIFIER || "",
        ).catch((err) => {
          console.error(err);
        });
      }
    }
  }, [keplr, isInitialized, isLoading]);

  return <TRPCReactProvider>{children}</TRPCReactProvider>;
};

export default Providers;
