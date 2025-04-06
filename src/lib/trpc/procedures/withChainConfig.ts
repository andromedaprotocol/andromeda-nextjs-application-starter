import { z } from "zod";

import { t } from "../trpc";

/**
 * Middleware to add chain config to the context.
 * Adds a required chainId to the input and adds the chain config to the context.
 */
export const withChainConfig = t.procedure
  .input(
    z.object({
      'chain-identifier': z.string(),
    }),
  )
  .use(async ({ ctx, next, input }) => {
    const chainConfig = ctx.chainList.find(
      (c) =>
        c.chainId === input['chain-identifier'] ||
        c.name === input['chain-identifier']
    );
    if (!chainConfig) {
      throw new Error(`Chain config not found for ${input['chain-identifier']}`);
    }
    return next({ ctx: { ...ctx, chainConfig } });
  });
