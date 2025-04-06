import type { CacheEntry } from "@epic-web/cachified";
import { cachified } from "@epic-web/cachified";
import { LRUCache } from "lru-cache";
import { LcdClient } from "@/lib/andrjs/lcd-client";
import { VFS } from "@/lib/andrjs/ados/vfs";
import { IChainConfig } from "../chain/types";
import { isValidBech32Address } from "@/lib/andrjs/functions";
import { bech32 } from "bech32";
import { queryKernelKeyAddress } from "./kernel";
import { KERNEL } from "@/lib/andrjs/ados/kernel";

const cache = new LRUCache<string, CacheEntry>({
  max: 5,
});

export async function queryVfsUsername(
  lcdUrl: string,
  vfsAddress: string,
  address: string
) {
  return cachified({
    key: ["query", "vfs", vfsAddress, "username", address].join("-"),
    cache,
    ttl: 1000 * 60 * 5, // 5 minutes
    getFreshValue: async () => {
      const lcdClient = new LcdClient(lcdUrl);
      const username =
        await lcdClient.queryContractSmart<VFS.GetUsernameResponse>(
          vfsAddress,
          VFS.getUsernameMsg(address)
        );
      return username;
    },
  });
}

export async function queryVfsResolvePath(
  lcdUrl: string,
  vfsAddress: string,
  path: string
) {
  return cachified({
    key: ["query", "vfs", vfsAddress, "resolvePath", path].join("-"),
    cache,
    ttl: 1000 * 60 * 60 * 24, // 1 day
    getFreshValue: async () => {
      const lcdClient = new LcdClient(lcdUrl);
      const resolvedPath =
        await lcdClient.queryContractSmart<VFS.ResolvePathResponse>(
          vfsAddress,
          VFS.resolvePathMsg(path)
        );
      return resolvedPath;
    },
  });
}

export async function queryVfsResolvePathUsingPathOnly(chains: IChainConfig[], path: string, defaultConfig: IChainConfig) {
  // Strip the path to a raw vfs path (no protocols etc)
  const rawPath = VFS.stripPath(path);

  // If the path is an IBC path, extract the chain name and use it to query the chain config
  // i.e. if the path looks like "ibc://chainId/..." we want to use "chainId" as the chain name
  const chainIdentifier = VFS.getChainIdentifierFromPath(path);
  const chainConfig = chainIdentifier
    ? chains.find(
      (c) =>
        c.chainId === chainIdentifier ||
        c.name === chainIdentifier ||
        c.chainName === chainIdentifier,
    )
    : defaultConfig;
  if (!chainConfig) {
    throw new Error(
      `Chain config not found for identifier: ${chainIdentifier}`,
    );
  }

  // If the path is a valid bech32 address, return it early to prevent unnecessary queries
  if (isValidBech32Address(rawPath)) {
    const { prefix } = bech32.decode(rawPath);
    // Ensure the bech32 prefix matches the chain config
    if (prefix !== chainConfig.addressPrefix) {
      throw new Error(
        `Invalid bech32 prefix, got ${prefix} expected ${chainConfig.addressPrefix}`,
      );
    }

    return rawPath;
  }

  // Query the kernel to resolve the VFS address
  const vfsAddress = await queryKernelKeyAddress(
    chainConfig.lcdUrl,
    chainConfig.kernelAddress,
    KERNEL.KernelKey.VFS,
  );

  // Query the VFS contract to resolve the path
  const resolvePath = await queryVfsResolvePath(
    chainConfig.lcdUrl,
    vfsAddress,
    rawPath,
  );
  return resolvePath;
}
