import { z } from "zod";

import { withChainConfig } from "../procedures";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { IChainConfig, IKeplrConfig } from "../query/chain/types";
import { queryKeplrConfig } from "../query/chain";

export const chainConfigRouter = createTRPCRouter({
  all: publicProcedure.input(z.object({})).query<IChainConfig[]>(({ ctx }) => {
    return ctx.chainList;
  }),
  byIdentifier: withChainConfig
    .input(z.object({}))
    .query<IChainConfig>(({ ctx }) => {
      return ctx.chainConfig;
    }),
  keplrConfig: publicProcedure
    .input(z.object({ chainId: z.string() }))
    .query<IKeplrConfig>(({ input }) => {
      return queryKeplrConfig(input.chainId);
    }),
});
