import { Badge } from "@/components/ui/badge";
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
      <PopoverTrigger asChild>
        <Button
          className={`border border-gray-300 outline-none text`}
          variant="outline"
        >
          <div className="flex items-center">
            <img src={config?.iconUrls?.sm ?? ""} className="w-5" alt="icon" />
            <span className="text-md ml-2">{truncatedAddress}</span>
            <Badge
              className={`ml-2 text-white uppercase ${config?.chainType === "mainnet" ? 'bg-green-500' : 'bg-purple-500'}`}
              variant={"default"}
              size={"sm"}
            >
              {config?.chainType}
            </Badge>
          </div>
          <ChevronDownIcon className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-4 shadow-lg rounded-md mt-1">
        <div className="flex items-center mb-3">
          <img src={config?.iconUrls?.sm ?? ""} className="w-5" alt="icon" />
          <span className="font-semibold flex-1 ml-2">
            {config?.chainName ?? config?.chainId}
          </span>
          <Badge
            className={`text-white uppercase ${config?.chainType === "mainnet" ? 'bg-green-500' : 'bg-purple-500'}`}
            variant={"default"}
            size={"sm"}
          >
            {config?.chainType}
          </Badge>
        </div>
        <input
          value={account?.address ?? ""}
          className="mb-2 p-2 text-sm rounded w-full"
          readOnly
        />
        <div className="grid grid-cols-2 gap-3 mt-0.5">
          <Button
            asChild
            className="flex items-center justify-center border text-sm"
            size='sm'
            variant="ghost"
          >
            <a
              href={config?.blockExplorerAddressPages[0]?.replaceAll(
                "${address}",
                account?.address ?? ""
              )}
              target="_blank"
            >
              <ExternalLinkIcon className="w-4 h-4" />
              Explorer
            </a>
          </Button>
          <Button
            onClick={disconnectAndromedaClient}
            className="flex items-center justify-center  text-sm"
            size='sm'
            variant='destructive'
          >
            <XIcon className="w-2 h-2" />
            Disconnect
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default Connected;
