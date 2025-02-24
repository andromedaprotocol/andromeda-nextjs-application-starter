"use client";
import React, { FC } from "react";
import { Button } from "../components/ui/button"; // ShadCN Button
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"; // ShadCN Popover components
import { ChevronDown, X, ExternalLink } from "lucide-react"; // Using Lucide icons
import useQueryChain from "@/lib/graphql/hooks/chain/useChainConfig";
import { disconnectAndromedaClient, useAndromedaStore } from "@/zustand/andromeda";

interface ConnectedProps {}

const Connected: FC<ConnectedProps> = () => {
  const { accounts, chainId } = useAndromedaStore();
  const account = accounts[0];
  const { data: config } = useQueryChain(chainId);
  const address = account?.address ?? "";
  const truncatedAddress = address.slice(0, 6) + "......" + address.slice(address.length - 4);

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline" className="flex items-center justify-between border-gray-300 p-2 hover:border-primary-600">
          <div className="flex items-center space-x-2">
            <img src={config?.iconUrls?.sm ?? ""} className="w-5" />
            <span className="text-md">{truncatedAddress}</span>
            <span className={`badge ${config?.chainType === "mainnet" ? "bg-green-500" : "bg-purple-500"} text-white rounded-full px-2 py-1 text-xs`}>
              {config?.chainType}
            </span>
          </div>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-4 bg-white shadow-lg rounded-lg w-80">
        <div className="mb-3 flex items-center space-x-2">
          <img src={config?.iconUrls?.sm ?? ""} className="w-5" />
          <span className="font-semibold text-gray-700 flex-1">
            {config?.chainName ?? config?.chainId}
          </span>
          <span className={`badge ${config?.chainType === "mainnet" ? "bg-green-500" : "bg-purple-500"} text-white rounded-full px-2 py-1 text-xs`}>
            {config?.chainType}
          </span>
        </div>

        <input
          value={account?.address ?? ""}
          className="w-full p-2 text-sm text-gray-700 bg-gray-100 rounded-md mb-3"
          readOnly
        />

        <div className="mb-3 flex flex-col space-y-2">
        <Button asChild>
          <a
            href={config?.blockExplorerAddressPages[0]?.replaceAll(
              "${address}",
              account?.address ?? ""
            )}
            target="_blank"
            className="w-full flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Explorer
          </a>
        </Button>
        <Button
          onClick={disconnectAndromedaClient}
          className="w-full text-white bg-red-500 hover:bg-red-600 text-sm flex items-center gap-2"
        >
          <X className="w-4 h-4" />
          Disconnect
        </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Connected;
