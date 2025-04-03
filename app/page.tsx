'use client'

import GridBackground from "@/components/GridBackground";
import { trpc_react_client } from "@/lib/trpc/client";
import { ConnectWallet } from "@/modules/wallet";
import { useAndromedaStore } from "@/zustand/andromeda";
import React from "react"


interface Props {
}

const Page = (props: Props) => {
    const { chainName } = useAndromedaStore()
    const { data } = trpc_react_client.chainConfig.byIdentifier.useQuery({
        name: chainName
    })
    const { } = props;
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
                <p>
                    Click button to connect <b>Andromeda {data?.chainType}</b>.
                </p>
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

export default Page