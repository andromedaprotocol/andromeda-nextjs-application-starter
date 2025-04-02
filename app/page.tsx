import { ConnectWallet } from "@/modules/wallet";
import React from "react"


interface Props {
}

const Page = async (props: Props) => {
    const { } = props;
    return (
        <div className="flex flex-col min-h-screen items-center justify-center gap-4">
            <img
                src="/logo.png"
                className="w-24"
            />
            <p className="text-3xl font-bold">
                Andromeda Nextjs Starter Template
            </p>
            <p>
                Click button to connect <b>Andromeda Devnet</b>.
            </p>
            <p className="font-light mb-6">
                Learn more about Andromeda&nbsp;
                <a className="text-blue-500 underline" href="https://docs.andromedaprotocol.io" target="_blank" rel="noopener noreferrer">
                    here
                </a>
            </p>
            <ConnectWallet />
        </div>
    )
}

export default Page