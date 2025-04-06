import { trpcReactClient } from "@/lib/trpc/client";

export const useChainConfig = (chainIdentifier: string) => {
  const result = trpcReactClient.chainConfig.byIdentifier.useQuery(
    {
      "chain-identifier": chainIdentifier,
    },
    { enabled: !!chainIdentifier },
  );
  return result;
};
