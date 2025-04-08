import { z } from "zod";

import { KERNEL } from "@/lib/andrjs/ados/kernel";
import { withChainConfig } from "@/lib/trpc/procedures";
import { createTRPCRouter } from "@/lib/trpc/trpc";
import { queryKernelKeyAddress } from "./query";

export const kernelRouter = createTRPCRouter({
    keyAddress: withChainConfig
        .input(
            z.object({
                key: z.nativeEnum(KERNEL.KernelKey),
            }),
        )
        .query<KERNEL.KeyAddressResponse>(({ input, ctx }) => {
            return queryKernelKeyAddress(
                ctx.chainConfig.lcdUrl,
                ctx.chainConfig.kernelAddress,
                input.key,
            );
        }),
});
