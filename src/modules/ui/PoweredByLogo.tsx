import Image from "next/image";
import Link from "next/link";
import React from "react";

const PoweredByLogo: React.FC = () => {
  return (
    <Link
      href="https://www.andromedaprotocol.io/"
      target="_blank"
      className="fixed left-2 bottom-2 flex items-center space-x-1 bg-gray-900 px-3 py-1.5 rounded-lg"
    >
      <Image src="/logo.png" alt="Andromeda Logo" width={24} height={24} />
      <span className="text-sm text-white">Powered by Andromeda</span>
    </Link>
  );
};

export default PoweredByLogo;
