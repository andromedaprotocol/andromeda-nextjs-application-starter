import { createTRPCRouter } from "../trpc";
import { chainConfigRouter } from "./chain";
import { kernelRouter } from "./kernel";
import { vfsRouter } from "./vfs";
import { appContractRouter } from "./app-contract";

export const appRouter = createTRPCRouter({
    chainConfig: chainConfigRouter,
    kernel: kernelRouter,
    vfs: vfsRouter,
    appContract: appContractRouter,
});

export type AppRouter = typeof appRouter;
