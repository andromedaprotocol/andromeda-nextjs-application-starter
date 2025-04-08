import { createTRPCRouter } from "../trpc";
import { chainConfigRouter } from "./chain";
import { kernelRouter } from "./os/kernel";
import { vfsRouter } from "./os/vfs";
import { appContractRouter } from "./ados/app-contract";
import { assetsRouter } from "./assets";
export const appRouter = createTRPCRouter({
  chainConfig: chainConfigRouter,
  kernel: kernelRouter,
  vfs: vfsRouter,
  appContract: appContractRouter,
  assets: assetsRouter,
});

export type AppRouter = typeof appRouter;
