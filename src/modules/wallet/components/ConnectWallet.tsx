"use client";
import { Button } from "@chakra-ui/react";
import React, { FC } from "react";
import Connected from "./Connected";
import useAndromedaClient from "@/lib/andrjs/hooks/useAndromedaClient";
import { connectAndromedaClient, useAndromedaStore } from "@/zustand/andromeda";
import { PlusSquareIcon } from "@chakra-ui/icons";

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
      leftIcon={<PlusSquareIcon boxSize={5} />}
      colorScheme="purple"
      onClick={() => connectAndromedaClient()}
      isLoading={isLoading}
    >
      Connect Wallet
    </Button>
  );
};
export default ConnectWallet;
