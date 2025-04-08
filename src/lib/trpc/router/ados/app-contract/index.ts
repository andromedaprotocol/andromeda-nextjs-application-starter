import { z } from "zod";

import { APP_CONTRACT } from "@/lib/andrjs/ados/app-contract";
import {
    queryAppGetAddressesWithNames,
    queryAppGetComponents,
} from "./query";
import { createTRPCRouter } from "@/lib/trpc/trpc";
import { withContractAddress } from "@/lib/trpc/procedures/withContractAddress";

export const appContractRouter = createTRPCRouter({
    getComponents: withContractAddress
        .input(z.object({}))
        .query<APP_CONTRACT.GetComponentsResponse>(async ({ ctx }) => {
            const components = await queryAppGetComponents(
                ctx.chainConfig.lcdUrl,
                ctx.resolvedContractAddress,
            );
            return components;
        }),

    getAddressesWithNames: withContractAddress
        .input(z.object({}))
        .query<APP_CONTRACT.GetAddressesWithNamesResponse>(async ({ ctx }) => {
            const addresses = await queryAppGetAddressesWithNames(
                ctx.chainConfig.lcdUrl,
                ctx.resolvedContractAddress,
            );
            return addresses;
        }),
});
