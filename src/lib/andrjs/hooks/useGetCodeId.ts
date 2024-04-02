import useAndromedaClient from "./useAndromedaClient";
import { useQuery } from "@tanstack/react-query";

/**
 * A hook for performing a query to adodb for adoType codeId, returns codeId for the adoType which you can use to instantiate
 * @param address
 * @returns
 */
export default function useGetCodeId(adoType: string) {
  const client = useAndromedaClient();

  return useQuery({
    queryKey: ['andrjs', 'adodb', 'code_id', { address: client?.os?.adoDB?.address }],
    queryFn: () => {
      return client!.os.adoDB!.getCodeId(adoType);
    },
    enabled: !!client?.os?.adoDB?.address
  })
}
