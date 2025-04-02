import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { trpc_react_client } from "@/lib/trpc/client";
import { disconnectAndromedaClient, useAndromedaStore } from "@/zustand/andromeda";
import { ChevronDownIcon, ExternalLinkIcon, XIcon } from "lucide-react";

import React, { FC } from "react";

interface ConnectedProps { }
const Connected: FC<ConnectedProps> = (props) => {
  const { } = props;
  const { accounts, chainName } = useAndromedaStore();
  const account = accounts[0];
  const { data: config } = trpc_react_client.chainConfig.byIdentifier.useQuery({ name: chainName });
  const address = account?.address ?? "";
  const truncatedAddress = address.slice(0, 6) + "......" + address.slice(address.length - 4);
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          className={`border border-gray-300 outline-none text-lg`}
        >
          <div className="flex items-center mr-2">
            <img src={config?.iconUrls?.sm ?? ""} className="w-5" alt="icon" />
            <span className="text-md">{truncatedAddress}</span>
            <span
              className={`ml-2 text-xs py-1 px-2 rounded-full ${config?.chainType === "mainnet" ? 'bg-green-500' : 'bg-purple-500'}`}
            >
              {config?.chainType}
            </span>
          </div>
          <ChevronDownIcon className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-4 bg-white shadow-lg rounded-md">
        <div className="flex items-center mb-3">
          <img src={config?.iconUrls?.sm ?? ""} className="w-5" alt="icon" />
          <span className="font-semibold text-gray-700 flex-1">
            {config?.chainName ?? config?.chainId}
          </span>
          <span
            className={`ml-2 text-xs py-1 px-2 rounded-full ${config?.chainType === "mainnet" ? 'bg-green-500' : 'bg-purple-500'}`}
          >
            {config?.chainType}
          </span>
        </div>
        <input
          value={account?.address ?? ""}
          className="mb-2 p-2 text-sm text-gray-700 bg-gray-100 rounded w-full"
          readOnly
        />
        <div className="flex space-x-2 mb-2">
          <Button
            asChild
            className="flex items-center justify-center border border-gray-300 text-gray-700 w-full text-sm"
          >
            <a
              href={config?.blockExplorerAddressPages[0]?.replaceAll(
                "${address}",
                account?.address ?? ""
              )}
              target="_blank"
            >
              <ExternalLinkIcon className="w-4 h-4 mr-2" />
              Explorer
            </a>
          </Button>
          <Button
            onClick={disconnectAndromedaClient}
            className="flex items-center justify-center bg-red-500 text-white w-full text-sm"
          >
            <XIcon className="w-2 h-2 mr-2" />
            Disconnect
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default Connected;
