import { useAndromedaStore } from "@/zustand/andromeda";

/**
 * A hook to use the current Andromeda Client in context
 * @returns
 */
export default function useAndromedaClient() {
  const { client, isConnected, isLoading } = useAndromedaStore();
  if (!isConnected || isLoading) {
    return undefined;
  }
  return client;
}
