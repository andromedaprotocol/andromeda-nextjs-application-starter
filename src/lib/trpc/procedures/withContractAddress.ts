import { z } from "zod";

import { VFS } from "@/lib/andrjs/ados/vfs";
import { withChainConfig } from "./withChainConfig";
import { queryVfsResolvePathUsingPathOnly } from "../router/os/vfs/query";

/**
 * Middleware to add chain config to the context.
 * Adds a required chainId to the input and adds the chain config to the context.
 */
export const withContractAddress = withChainConfig
  .input(
    z.object({
      "contract-address": VFS.PATH_SCHEMA,
    }),
  )
  .use(async ({ ctx, next, input }) => {
    const resolvedContractAddress = await queryVfsResolvePathUsingPathOnly(
      ctx.chainList,
      input["contract-address"],
      ctx.chainConfig,
    );
    return next({ ctx: { ...ctx, resolvedContractAddress } });
  });
