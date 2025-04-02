import { createTRPCRouter } from "./trpc";
import { chainConfigRouter } from "./chain";


export const appRouter = createTRPCRouter({
    chainConfig: chainConfigRouter
});

export type AppRouter = typeof appRouter;