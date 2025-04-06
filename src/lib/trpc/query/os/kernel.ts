import { KERNEL } from "@/lib/andrjs/ados/kernel";
import type { CacheEntry } from "@epic-web/cachified";
import { cachified } from "@epic-web/cachified";
import { LRUCache } from "lru-cache";
import { LcdClient } from "@/lib/andrjs/lcd-client";

const cache = new LRUCache<string, CacheEntry>({
  max: 5,
});

export async function queryKernelKeyAddress(
  lcdUrl: string,
  kernelAddress: string,
  key: KERNEL.KernelKey,
) {
  return cachified({
    key: ["query", "kernel", kernelAddress, "keyAddress", key].join("-"),
    cache,
    ttl: 1000 * 60 * 60 * 24, // 1 day
    getFreshValue: async () => {
      const lcdClient = new LcdClient(lcdUrl);
      const address =
        await lcdClient.queryContractSmart<KERNEL.KeyAddressResponse>(
          kernelAddress,
          KERNEL.keyAddressMsg(key),
        );
      return address;
    },
  });
}
