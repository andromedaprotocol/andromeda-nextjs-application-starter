import { z } from "zod";

import { createTRPCRouter } from "../trpc";
import { APP_CONTRACT } from "@/lib/andrjs/ados/app-contract";
import { queryAppGetAddressesWithNames, queryAppGetComponents } from "../query/ados/app-contract";
import { withContractAddress } from "../procedures/withContractAddress";

export const appContractRouter = createTRPCRouter({
    getComponents: withContractAddress
        .input(z.object({}))
        .query<APP_CONTRACT.GetComponentsResponse>(async ({ ctx }) => {
            const components = await queryAppGetComponents(
                ctx.chainConfig.lcdUrl,
                ctx.resolvedContractAddress
            );
            return components;
        }),

    getAddressesWithNames: withContractAddress
        .input(z.object({}))
        .query<APP_CONTRACT.GetAddressesWithNamesResponse>(async ({ ctx }) => {
            const addresses = await queryAppGetAddressesWithNames(
                ctx.chainConfig.lcdUrl,
                ctx.resolvedContractAddress
            );
            return addresses;
        }),
});
