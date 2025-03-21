import { ConnectWallet, ModeToggle } from "@/modules/wallet/components/ui";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {}

const Page = async (props: Props) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center space-y-3 text-center">
        <Image src="/logo.png" width={96} height={96} alt="Logo" />
        <h1 className="text-3xl font-bold">
          Andromeda Next.js Starter Template
        </h1>
        <p>
          Click the button to connect <b>Andromeda Devnet</b>.
        </p>
        <p className="font-light mb-6">
          Learn more about Andromeda&nbsp;
          <Link
            href="https://docs.andromedaprotocol.io"
            target="_blank"
            className="text-blue-500 underline"
          >
            here
          </Link>
        </p>
        <ConnectWallet />
        <div className="flex flex-col items-center space-y-3 text-center">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Page;
