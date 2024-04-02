import type { Fee, Msg } from "@andromedaprotocol/andromeda.js";
import { Coin } from "@cosmjs/proto-signing";
import { useCallback } from "react";
import useAndromedaClient from "./useAndromedaClient";

/**
 * A hook for creating a new contract, returns an async instantiate function
 * @returns instantiate
 */
export default function useInstantiateContract() {
  const client = useAndromedaClient();

  const instantiate = useCallback(
    async (codeId: number, msg: Msg, label = "Instantiate with Starter Template", fee: Fee, memo = "Instantiate with Starter Template", funds?: Coin[]) => {
      return client!.instantiate(codeId, msg, label, fee, {
        memo,
        funds
      });
    },
    [client],
  );

  return instantiate;
}
