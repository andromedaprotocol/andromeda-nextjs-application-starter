import { z } from "zod";

import { withChainConfig } from "../procedures";
import { createTRPCRouter } from "../trpc";
import { VFS } from "@/lib/andrjs/ados/vfs";
import { queryVfsResolvePathUsingPathOnly, queryVfsUsername } from "../query/os/vfs";
import { KERNEL } from "@/lib/andrjs/ados/kernel";
import { queryKernelKeyAddress } from "../query/os/kernel";

export const vfsRouter = createTRPCRouter({

    username: withChainConfig.input(z.object({
        address: z.string(),
    })).query<VFS.GetUsernameResponse>(async ({ input, ctx }) => {
        const vfsAddress = await queryKernelKeyAddress(ctx.chainConfig.lcdUrl, ctx.chainConfig.kernelAddress, KERNEL.KernelKey.VFS);
        const username = await queryVfsUsername(ctx.chainConfig.lcdUrl, vfsAddress, input.address);
        return username;
    }),

    resolvePath: withChainConfig.input(z.object({
        path: VFS.PATH_SCHEMA,
    })).query<VFS.ResolvePathResponse>(async ({ input, ctx }) => {
        const resolvedPath = await queryVfsResolvePathUsingPathOnly(ctx.chainList, input.path, ctx.chainConfig);
        return resolvedPath;
    }),

}); 
