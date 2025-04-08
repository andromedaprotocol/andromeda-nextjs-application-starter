"use client";

import GridBackground from "@/components/GridBackground";
import { useChainConfig } from "@/lib/andrjs/hooks/useChainConfig";
import { useAndromedaStore } from "@/zustand/andromeda";
import React from "react";
import { ConnectWallet } from "../wallet";

interface Props { }

const LandingPage: React.FC<Props> = (props) => {
  const { connectedChain } = useAndromedaStore();
  const { data, isLoading } = useChainConfig(connectedChain || "");
  return (
    <GridBackground>
      <div className="flex flex-col min-h-screen items-center justify-center gap-4">
        <img src="/logo.png" className="w-30" alt='logo' />
        <p className="text-4xl font-bold">Andromeda Nextjs Starter Template</p>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <p>
            Click the button to connect to <b>{data?.displayName}</b>.
          </p>
        )}
        <p className="font-light">
          Learn more about Andromeda&nbsp;
          <a
            className="text-blue-500 underline"
            href="https://docs.andromedaprotocol.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
        </p>
        <ConnectWallet />
      </div>
    </GridBackground>
  );
};

export default LandingPage;
