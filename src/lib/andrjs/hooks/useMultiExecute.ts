import type { Fee, Msg } from "@andromedaprotocol/andromeda.js";
import { Coin } from "@cosmjs/proto-signing";
import { useCallback } from "react";
import useAndromedaClient from "./useAndromedaClient";

/**
 * A hook for performing a multi execute tx on a given contract, returns an async multi execute function
 * @param address
 * @returns
 */
export default function useMultiExecuteContract(address: string) {
  const client = useAndromedaClient();

  const multiExecute = useCallback(
    async (msgs: Array<{ msg: Msg, funds?: Coin[] }>, fee: Fee, memo = "Execute Starter Template") => {
      const encoded = msgs.map(msg => client!.chainClient!.encodeExecuteMsg(address, msg.msg, msg.funds ?? []))
      return client!.signAndBroadcast(encoded, fee, memo);
    },
    [address, client],
  );

  return multiExecute;
}
