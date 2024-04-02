import useQueryChain from "@/lib/graphql/hooks/chain/useChainConfig";
import { disconnectAndromedaClient, useAndromedaStore } from "@/zustand/andromeda";
import { ChevronDownIcon, CloseIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Badge,
  Button,
  HStack,
  Image,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import React, { FC } from "react";

interface ConnectedProps { }
const Connected: FC<ConnectedProps> = (props) => {
  const { } = props;
  const { accounts, chainId } = useAndromedaStore();
  const account = accounts[0];
  const { data: config } = useQueryChain(chainId);
  const address = account?.address ?? "";
  const truncatedAddress = address.slice(0, 6) + "......" + address.slice(address.length - 4);
  return (
    <Popover placement="bottom-end">
      {({ isOpen }) => (
        <>
          <PopoverTrigger>
            <Button
              variant="outline"
              size="lg"
              borderColor={isOpen ? "primary.600" : "gray.300"}
            >
              <HStack mr='2'>
                <Image src={config?.iconUrls?.sm ?? ""} w="5" />
                <Text fontSize="md">{truncatedAddress}</Text>
                <Badge
                  colorScheme={
                    config?.chainType === "mainnet" ? "green" : "purple"
                  }
                  fontSize={8}
                  py="1"
                  rounded="full"
                >
                  {config?.chainType}
                </Badge>
              </HStack>
              <ChevronDownIcon boxSize={4} />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody>
              <HStack mb={3} justifyContent="start">
                <Image src={config?.iconUrls?.sm ?? ""} w="5" />
                <Text fontWeight={600} color="gray.700" flex={1}>
                  {config?.chainName ?? config?.chainId}
                </Text>
                <Badge
                  colorScheme={
                    config?.chainType === "mainnet" ? "green" : "purple"
                  }
                  fontSize={8}
                  py="1"
                  rounded="full"
                >
                  {config?.chainType}
                </Badge>
              </HStack>
              <Input
                value={account?.address ?? ""}
                mb={2}
                p={2}
                color="gray.700"
                fontSize="sm"
                readOnly
              />
              <HStack mb={2}>
                <Button
                  as="a"
                  href={config?.blockExplorerAddressPages[0]?.replaceAll(
                    "${address}",
                    account?.address ?? ""
                  )}
                  target="_blank"
                  leftIcon={<ExternalLinkIcon boxSize={4} />}
                  variant="outline"
                  fontWeight={500}
                  color="gray.700"
                  w="full"
                  size="sm"
                >
                  Explorer
                </Button>
                <Button
                  leftIcon={<CloseIcon boxSize={2} />}
                  onClick={disconnectAndromedaClient}
                  fontWeight={500}
                  colorScheme="red"
                  w="full"
                  size="sm"
                >
                  Disconnect
                </Button>
              </HStack>
            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
};
export default Connected;
