import { createTRPCRouter } from "../trpc";
import { chainConfigRouter } from "./chain";
import { kernelRouter } from "./os/kernel";
import { vfsRouter } from "./os/vfs";
import { appContractRouter } from "./ados/app-contract";
import { assetsRouter } from "./assets";
import { cw721Router } from "./ados/cw721";
import { cw20Router } from "./ados/cw20";
import { primitiveRouter } from "./ados/primitive";
import { exchangeRouter } from "./ados/exchange";
import { auctionRouter } from "./ados/auction";
import { marketplaceRouter } from "./ados/marketplace";
import { crowdfundRouter } from "./ados/crowdfund";
import { baseAdoRouter } from "./ados/base";
import { adodbRouter } from "./os/adodb";

export const appRouter = createTRPCRouter({
  chainConfig: chainConfigRouter,
  assets: assetsRouter,
  os: {
    kernel: kernelRouter,
    vfs: vfsRouter,
    adodb: adodbRouter,
  },
  ado: {
    base: baseAdoRouter,
    appContract: appContractRouter,
    cw721: cw721Router,
    cw20: cw20Router,
    crowdfund: crowdfundRouter,
    primitive: primitiveRouter,
    exchange: exchangeRouter,
    auction: auctionRouter,
    marketplace: marketplaceRouter,
  },
});

export type AppRouter = typeof appRouter;
