import { QueryClient } from "@tanstack/react-query";

import {
    createTRPCProxyClient,
    httpBatchLink,
    loggerLink,
    splitLink,
    httpBatchStreamLink,
    httpSubscriptionLink,
} from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from ".";
import superJSON from "superjson";

export const queryClient = new QueryClient();

// Used in server setup
export const trpcReactClient = createTRPCReact<AppRouter>();

// Used in client side functions where hook is not available
export const trpcStandaloneClient = createTRPCProxyClient<AppRouter>({
    links: [
        loggerLink({
            enabled: (op) =>
                process.env.NODE_ENV === "development" ||
                (op.direction === "down" && op.result instanceof Error),
        }),
        httpBatchStreamLink({
            url: getBaseUrl() + "/api/trpc",
            transformer: superJSON,
        }),
    ],
});

export const createTRPCClient = () =>
    trpcReactClient.createClient({
        links: [
            loggerLink({
                enabled: (op) =>
                    process.env.NODE_ENV === "development" ||
                    (op.direction === "down" && op.result instanceof Error),
            }),
            splitLink({
                // uses the httpSubscriptionLink for subscriptions
                condition: (op) => op.type === "subscription",
                true: httpSubscriptionLink({
                    url: getBaseUrl() + `/api/trpc`,
                    transformer: superJSON,
                }),
                false: httpBatchLink({
                    url: getBaseUrl() + `/api/trpc`,
                    transformer: superJSON,
                }),
            }),
        ],
    });

function getBaseUrl() {
    if (typeof window !== "undefined") return window.location.origin;
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return `http://localhost:${process.env.PORT ?? 3000}`;
}

