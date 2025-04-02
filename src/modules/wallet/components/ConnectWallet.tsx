"use client";
import React, { FC } from "react";
import Connected from "./Connected";
import useAndromedaClient from "@/lib/andrjs/hooks/useAndromedaClient";
import { connectAndromedaClient, useAndromedaStore } from "@/zustand/andromeda";
import { Button } from "@/components/ui/button";

interface ConnectWalletProps { }
const ConnectWallet: FC<ConnectWalletProps> = (props) => {
  const { } = props;
  const { isLoading } = useAndromedaStore();
  const client = useAndromedaClient();
  if (client) {
    return <Connected />;
  }
  return (
    <Button
      onClick={() => connectAndromedaClient()}
      disabled={isLoading}
    >
      Connect Wallet
    </Button>
  );
};
export default ConnectWallet;
