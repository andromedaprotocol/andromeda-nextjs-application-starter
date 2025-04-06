import { z } from "zod";

import { withChainConfig } from "../procedures";
import { createTRPCRouter } from "../trpc";
import { KERNEL } from "@/lib/andrjs/ados/kernel";
import { queryKernelKeyAddress } from "../query/os/kernel";

export const kernelRouter = createTRPCRouter({
    keyAddress: withChainConfig.input(z.object({
        key: z.nativeEnum(KERNEL.KernelKey),
    })).query<KERNEL.KeyAddressResponse>(({ input, ctx }) => {
        return queryKernelKeyAddress(ctx.chainConfig.lcdUrl, ctx.chainConfig.kernelAddress, input.key);
    }),

});
