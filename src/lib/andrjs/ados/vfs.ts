import { z } from "zod";
import { isValidBech32Address } from "../functions";

/**
 * Queries for the vfs contract
 */
export namespace VFS {
  export const getUsernameMsg = (address: string) => {
    return {
      get_username: { address },
    };
  };

  export type GetUsernameResponse = string;

  export const resolvePathMsg = (path: string) => {
    return {
      resolve_path: { path },
    };
  };

  export type ResolvePathResponse = string;

  export const PATH_REGEX =
    /(^((([A-Za-z0-9]+:\/\/)?([A-Za-z0-9.-_]{2,80}\/)))?((~[a-z0-9]{2,}|(lib|home))(\/[A-Za-z0-9.-_]{2,80}?)*(\/)?)$)|(^(~[a-z0-9]{2,}|\/(lib|home))(\/[A-Za-z0-9.-_]{2,80}?)*(\/)?$)|(^[a-z0-9]{2,}$)|(^.(\/[A-Za-z0-9.-_]{2,40}?)*(\/)?$)/;

  export const PATH_SCHEMA = z
    .string()
    .min(1, "Address cannot be empty")
    .max(100, "Address is too long")
    .refine(isValidVfsPath, "Invalid VFS path");
  /**
   * Validates whether a given string is a valid VFS path
   *
   * @param path - The string to validate as a VFS path
   * @returns boolean - True if the path is a valid VFS path, false otherwise
   */
  export function isValidVfsPath(path: string): boolean {
    return isValidBech32Address(path) || PATH_REGEX.test(path);
  }

  /**
   * Extracts the chain ID from an IBC path string
   * @param path - The path string to parse (expected format: "ibc://chainName/...")
   * @returns The chain ID if the path is a valid IBC path, undefined otherwise
   */
  export function getChainIdentifierFromPath(path: string): string | undefined {
    if (!path.startsWith("ibc://")) {
      return;
    }
    const pathWithoutPrefix = path.slice(6);
    const chainIdentifier = pathWithoutPrefix.split("/")[0];
    return chainIdentifier;
  }

  /**
   * Strips the path to a raw vfs path (no protocols etc)
   * @param path - The path string to strip
   * @returns The stripped path
   */
  export function stripPath(path: string): string {
    if (path.startsWith("./")) {
      throw new Error("Cannot resolve local paths");
    }

    // Non IBC
    if (!path.startsWith("ibc://")) {
      // Check if the path is a valid bech32 address
      const isBech32 = isValidBech32Address(path);

      // If the path is not a bech32 address, check if it contains a "/"
      if (!path.includes("/") && !isBech32) {
        throw new Error("Invalid path");
      }
      return path;
    }
    const pathWithoutPrefix = path.slice(6); // Remove "ibc://"
    const pathParts = pathWithoutPrefix.split("/");
    const isVfsPath = pathParts.length > 1;
    if (isVfsPath) {
      return `/${pathParts.slice(1).join("/")}`; // Remove chain name and join rest of path and prefix with "/"
    }

    // At this point the path **MUST** be a valid bech32 address
    if (!isValidBech32Address(path)) {
      throw new Error("Invalid bech32 address");
    }
    return path;
  }
}
