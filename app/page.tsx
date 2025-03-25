import { ConnectWallet, ModeToggle } from "@/modules/wallet/components/ui";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {}

const Page = async (props: Props) => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-50">
        <div className="flex items-center gap-4">
          <Image src="/logo.png" width={48} height={48} alt="Logo" />
          <h1 className="text-xl font-bold">Andromeda Splitter App</h1>
        </div>
        <ModeToggle />
      </header>

      {/* Main Content */}
      <div className="flex min-h-screen items-center justify-center pt-20">
        <div className="flex flex-col items-center space-y-3 text-center">
          <ConnectWallet />
        </div>
      </div>
    </div>
  );
};

export default Page;
