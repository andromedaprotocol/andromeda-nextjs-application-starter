"use client"
import { KERNEL } from "@/lib/andrjs/ados/kernel"
import { trpcReactClient } from "@/lib/trpc/client"
import React from "react"

interface Props {
}
const Page = (_props: Props) => {
    const { data: keyAddress } = trpcReactClient.kernel.keyAddress.useQuery({
        key: KERNEL.KernelKey.VFS,
        "chain-identifier": process.env.NEXT_PUBLIC_CHAIN_IDENTIFIER || "",
    })
    const { data: username } = trpcReactClient.vfs.username.useQuery({
        "chain-identifier": process.env.NEXT_PUBLIC_CHAIN_IDENTIFIER || "",
        address: "andr15f2wf3pte0szl8stfcl260h9h20newrrglcmkl",
    })
    const { data: components } = trpcReactClient.appContract.getComponents.useQuery({
        "contract-address": "archway1j5e0p0hdsv6x6kqkza683kdhsfazlxsr3n58v3pzylgk7w45tjuq9znpcw",
        'chain-identifier': "archway-testnet",
    })
    const { data: addresses } = trpcReactClient.appContract.getAddressesWithNames.useQuery({
        "contract-address": "andr1xguyrfnys0z0uzwmmkcsj0crqvug4x5x3heekxrzxjjfvzju54rq5fxkmf",
        'chain-identifier': process.env.NEXT_PUBLIC_CHAIN_IDENTIFIER || "",
    })
    return (
        <div>
            <h1>{JSON.stringify(keyAddress)}</h1>
            <h1>{JSON.stringify(username)}</h1>
            <h1>{JSON.stringify(components)}</h1>
            <h1>{JSON.stringify(addresses)}</h1>
        </div>
    )
}

export default Page