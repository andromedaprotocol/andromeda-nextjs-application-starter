import type { Msg } from "@andromedaprotocol/andromeda.js";
import { useCallback } from "react";
import useAndromedaClient from "./useAndromedaClient";

/**
 * A hook for performing a query on a given contract, returns an async query function
 * @param address
 * @returns
 */
export default function useQueryContract<T = any>(address: string) {
  const client = useAndromedaClient();

  const query = useCallback(
    async (msg: Msg) => {
      return client!.queryContract<T>(address, msg);
    },
    [address, client],
  );

  return query;
}
