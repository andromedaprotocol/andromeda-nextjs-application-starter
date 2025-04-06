import { Fee, Msg } from "@andromedaprotocol/andromeda.js";
import { ChainClient } from "@andromedaprotocol/andromeda.js/dist/clients";
import {
  ExecuteInstruction,
  InstantiateOptions,
} from "@cosmjs/cosmwasm-stargate";
import { Coin, EncodeObject } from "@cosmjs/proto-signing";
import { bech32 } from "bech32";

/**
 * Instantiate a contract
 * @param client
 * @param codeId
 * @param msg
 * @param label
 * @param fee
 */
export async function instantiateContract(
  client: ChainClient,
  codeId: number,
  msg: Msg,
  label: string,
  fee?: Fee,
  options?: InstantiateOptions,
) {
  const tx = await client.instantiate(codeId, msg, label, fee, {
    memo: "Instantiate with Starter Template",
    ...options,
  });
  return tx;
}

/**
 * Execute a contract
 * @param client
 * @param contractAddress
 * @param msg
 * @param fee
 */
export async function executeContract(
  client: ChainClient,
  contractAddress: string,
  msg: Msg,
  fee?: Fee,
) {
  const tx = await client.execute(contractAddress, msg, fee);
  return tx;
}

/**
 * Multi execute a contract
 * @param client
 * @param msgs
 * @param fee
 */
export async function multiExecuteContract(
  client: ChainClient,
  msgs: ExecuteInstruction[],
  fee?: Fee,
) {
  const encoded = msgs.map((msg) =>
    client.encodeExecuteMsg(msg.contractAddress, msg.msg, [
      ...(msg.funds ?? []),
    ]),
  );
  const tx = await client.signAndBroadcast(encoded, fee);
  return tx;
}

/**
 * Query a contract
 * @param client
 * @param contractAddress
 * @param msg
 * @returns
 */
export async function queryContract<T = any>(
  client: ChainClient,
  contractAddress: string,
  msg: Msg,
) {
  const tx = await client.queryClient!.queryContractSmart(contractAddress, msg);
  return tx as T;
}

/**
 * Simulate a message
 * @param client
 * @param msgs
 * @returns
 */
export async function simulateMsgs(client: ChainClient, msgs: EncodeObject[]) {
  const fee = await client.simulateMulti(msgs);
  return fee;
}

/**
 * Simulate an execute message
 * @param client
 * @param contractAddress
 * @param msg
 * @param funds
 * @param fee
 */
export async function simulateExecute(
  client: ChainClient,
  contractAddress: string,
  msg: Msg,
  funds?: Coin[],
  fee?: Fee,
  memo?: string,
) {
  const result = await client.simulateExecute(
    contractAddress,
    msg,
    funds ?? [],
    fee,
    memo,
  );
  return result;
}

/**
 * Simulate an instantiate message
 * @param client
 * @param codeId
 * @param msg
 * @param label
 * @param fee
 */
export async function simulateInstantiate(
  client: ChainClient,
  codeId: number,
  msg: Msg,
  label: string,
  fee?: Fee,
  options?: InstantiateOptions,
) {
  const result = await client.simulateInstantiate(
    codeId,
    msg,
    label,
    fee,
    options,
  );
  return result;
}

/**
 * Validates whether a given string is a valid bech32 address
 *
 * @param address - The string to validate as a bech32 address
 * @returns boolean - True if the address is a valid bech32 address, false otherwise
 *
 * @example
 * isValidBech32Address("cosmos1..."); // returns true
 * isValidBech32Address("invalid"); // returns false
 */
export function isValidBech32Address(address: string): boolean {
  try {
    bech32.decode(address);
    return true;
  } catch {
    return false;
  }
}
