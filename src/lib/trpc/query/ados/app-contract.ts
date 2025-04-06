import type { CacheEntry } from "@epic-web/cachified";
import { cachified } from "@epic-web/cachified";
import { LRUCache } from "lru-cache";
import { LcdClient } from "@/lib/andrjs/lcd-client";
import { APP_CONTRACT } from "@/lib/andrjs/ados/app-contract";

const cache = new LRUCache<string, CacheEntry>({
  max: 5,
});

export async function queryAppGetComponents(
  lcdUrl: string,
  contractAddress: string,
) {
  return cachified({
    key: ["query", "app", contractAddress, "getComponents"].join("-"),
    cache,
    ttl: 1000 * 60 * 5, // 5 minutes
    getFreshValue: async () => {
      const lcdClient = new LcdClient(lcdUrl);
      const components =
        await lcdClient.queryContractSmart<APP_CONTRACT.GetComponentsResponse>(
          contractAddress,
          APP_CONTRACT.getComponentsMsg(),
        );
      return components;
    },
  });
}

export async function queryAppGetAddressesWithNames(
  lcdUrl: string,
  contractAddress: string,
) {
  return cachified({
    key: ["query", "app", contractAddress, "getAddressesWithNames"].join("-"),
    cache,
    ttl: 1000 * 60 * 5, // 5 minutes
    getFreshValue: async () => {
      const lcdClient = new LcdClient(lcdUrl);
      const addresses =
        await lcdClient.queryContractSmart<APP_CONTRACT.GetAddressesWithNamesResponse>(
          contractAddress,
          APP_CONTRACT.getAddressesWithNamesMsg(),
        );
      return addresses;
    },
  });
}
