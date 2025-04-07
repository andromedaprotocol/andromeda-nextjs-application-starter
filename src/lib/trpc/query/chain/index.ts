import type { CacheEntry } from "@epic-web/cachified";
import { cachified } from "@epic-web/cachified";
import { LRUCache } from "lru-cache";
import { IChainConfig, IKeplrConfig } from "./types";

const cache = new LRUCache<string, CacheEntry>({
  max: 5,
});

export async function queryAllChainConfigs(devMode = false) {
  return cachified({
    key: `getAllChainConfigs-${devMode}`,
    cache,
    ttl: 1000 * 60 * 60 * 24, // 1 day
    getFreshValue: async () => {
      console.log("Running all chains query");
      const chains = (await fetch(
        `${process.env.NEXT_PUBLIC_DATABASE_API_URL}/chains`,
      ).then((res) => res.json())) as IChainConfig[];
      return chains;
    },
  });
}

export async function queryChainConfig(identifier: string) {
  return cachified({
    key: `getChainConfig-${identifier}`,
    cache,
    ttl: 1000 * 60 * 60 * 24, // 1 day
    getFreshValue: async () => {
      const chain = (await fetch(
        `${process.env.NEXT_PUBLIC_DATABASE_API_URL}/chains/${identifier}`,
      ).then((res) => res.json())) as IChainConfig;
      return chain;
    },
  });
}

export async function queryChainConfigByAddressPrefix(addressPrefix: string) {
  return cachified({
    key: `getChainConfigByAddressPrefix-${addressPrefix}`,
    cache,
    ttl: 1000 * 60 * 60 * 24, // 1 day
    getFreshValue: async () => {
      const chain = (await fetch(
        `${process.env.NEXT_PUBLIC_DATABASE_API_URL}/chains/${addressPrefix}`,
      ).then((res) => res.json())) as IChainConfig;
      return chain;
    },
  });
}

export async function queryKeplrConfig(chainId: string) {
  return cachified({
    key: `getChainKeplrConfig-${chainId}`,
    cache,
    ttl: 1000 * 60 * 60 * 24, // 1 day
    getFreshValue: async () => {
      // Return local chain config if local chains are enabled
      const chain = (await fetch(
        `${process.env.NEXT_PUBLIC_DATABASE_API_URL}/keplr/${chainId}`,
      ).then((res) => res.json())) as IKeplrConfig;
      return chain;
    },
  });
}
