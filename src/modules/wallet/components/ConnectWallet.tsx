"use client";
import React, { FC } from "react";
import Connected from "./Connected";
import useAndromedaClient from "@/lib/andrjs/hooks/useAndromedaClient";
import { connectAndromedaClient, useAndromedaStore } from "@/zustand/andromeda";
import { Button } from "@/components/ui/button";
import { Loader2, Wallet } from "lucide-react";

interface ConnectWalletProps {}
const ConnectWallet: FC<ConnectWalletProps> = (props) => {
  const {} = props;
  const { isLoading } = useAndromedaStore();
  const client = useAndromedaClient();
  if (client) {
    return <Connected />;
  }
  return (
    <Button
      onClick={() =>
        connectAndromedaClient(process.env.NEXT_PUBLIC_CHAIN_IDENTIFIER || "")
      }
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="text-blue-500 w-4 h-4 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <Wallet className="w-4 h-4 text-blue-500"></Wallet>
          Connect Wallet
        </>
      )}
    </Button>
  );
};
export default ConnectWallet;
