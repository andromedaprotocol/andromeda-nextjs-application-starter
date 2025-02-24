"use client";
import React, { FC } from "react";
import Connected from "./Connected";
import useAndromedaClient from "@/lib/andrjs/hooks/useAndromedaClient";
import { connectAndromedaClient, useAndromedaStore } from "@/zustand/andromeda";
import { Button, buttonVariants } from "../components/ui/button"; // Assuming ShadCN's Button component
import { Plus } from "lucide-react"; // Using Lucide's Plus icon



interface ConnectWalletProps {}

const ConnectWallet: FC<ConnectWalletProps> = () => {
  const { isLoading } = useAndromedaStore();
  const client = useAndromedaClient();

  if (client) {
    return <Connected />;
  }

  return (
    <div className="flex items-center justify-center h-screen">
    <Button
      onClick={() => connectAndromedaClient()}
      disabled={isLoading}
      className={buttonVariants({ variant: "default" })}  
    >
      <Plus className="h-5 w-5" />
      Connect Wallet
    </Button>
    </div>
  );
};

export default ConnectWallet;
