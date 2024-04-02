import { ConnectWallet } from "@/modules/wallet";
import { Center, Image, Text, VStack } from "@chakra-ui/react";
import React from "react"


interface Props {
}

const Page = async (props: Props) => {
    const { } = props;
    return (
        <Center minH="100vh">
            <VStack spacing={3}>
                <Image
                    src="/logo.png"
                    w='6rem'
                />
                <Text fontSize="3xl" fontWeight='bold'>
                    Andromeda Nextjs Starter Template
                </Text>
                <Text fontWeight='light' mb='6'>
                    Click button to connect <b>Andromeda Devnet</b>
                </Text>
                <ConnectWallet />
            </VStack>
        </Center>
    )
}

export default Page