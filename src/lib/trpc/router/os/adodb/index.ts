import { z } from "zod";

import { queryAdodbCodeId } from "./query";
import { KERNEL } from "@/lib/andrjs/ados/kernel";
import { createTRPCRouter } from "@/lib/trpc/trpc";
import { withChainConfig } from "@/lib/trpc/procedures";
import { queryKernelKeyAddress } from "../kernel/query";
import { ADODB } from "@/lib/andrjs/ados/adodb";

export const adodbRouter = createTRPCRouter({
  getCodeId: withChainConfig
    .input(
      z.object({
        ado: z.string(),
      }),
    )
    .query<ADODB.GetCodeIdResponse>(async ({ input, ctx }) => {
      const rpcClient = await ctx.getRpcClient(input["chain-identifier"]);
      const adodbAddress = await queryKernelKeyAddress(
        rpcClient,
        ctx.chainConfig.kernelAddress,
        KERNEL.KernelKey.ADODB,
      );
      const codeId = await queryAdodbCodeId(rpcClient, adodbAddress, input.ado);
      return codeId;
    }),
});
