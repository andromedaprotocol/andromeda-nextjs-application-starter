"use client"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./client"
import { FC, useState } from "react"
import { createTRPCClient, trpc_react_client } from "./client"

export const TRPCReactProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [trpcClient] = useState(() => createTRPCClient());

    return (
        <QueryClientProvider client={queryClient} >
            <trpc_react_client.Provider client={trpcClient} queryClient={queryClient}>
                {children}
            </trpc_react_client.Provider>
        </QueryClientProvider>
    )
}
