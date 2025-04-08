import { ChainClient } from "@andromedaprotocol/andromeda.js/dist/clients";
import { useQuery } from "@tanstack/react-query";

/**
 * A hook to query a contract client side directly using a chain query client
 * @param queryClient - The query client - Get it from andromeda.js chain client
 * @param contractAddress - The address of the contract
 * @param msg - The message to send to the contract
 * @returns The result of the query
 */
export const useQueryContract = <R = any, M = any>(
    queryClient: NonNullable<ChainClient["queryClient"]>,
    contractAddress: string,
    msg: M
) => {
    const result = useQuery({
        queryKey: ["contract", contractAddress, msg],
        queryFn: async () => {
            const res = await queryClient
                .queryContractSmart(contractAddress, msg)
                .then((res) => res as Response);
            return res;
        },
    });
    return result;
};
