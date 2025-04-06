'use client'

import GridBackground from "@/components/GridBackground";
import { trpc_react_client } from "@/lib/trpc/client";
import { ConnectWallet } from "@/modules/wallet";
import { useAndromedaStore } from "@/zustand/andromeda";
import React from "react"


interface Props {
}

const LandingPage: React.FC<Props> = (props) => {
    const { chainName } = useAndromedaStore()
    const { data, isLoading } = trpc_react_client.chainConfig.byIdentifier.useQuery({
        name: chainName
    })
    return (
        <GridBackground>
            <div className="flex flex-col min-h-screen items-center justify-center gap-4">
                <img
                    src="/logo.png"
                    className="w-30"
                />
                <p className="text-4xl font-bold">
                    Andromeda Nextjs Starter Template
                </p>
                {isLoading ? (
                    <p>
                        Loading...
                    </p>
                ) : (
                    <p>
                        Click the button to connect to <b>{data?.displayName}</b>.
                    </p>
                )}
                <p className="font-light">
                    Learn more about Andromeda&nbsp;
                    <a className="text-blue-500 underline" href="https://docs.andromedaprotocol.io" target="_blank" rel="noopener noreferrer">
                        here
                    </a>
                </p>
                <ConnectWallet />
            </div>
        </GridBackground>
    )
}

export default LandingPage