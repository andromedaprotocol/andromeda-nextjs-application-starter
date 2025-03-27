import React, { ReactNode } from "react";
import { Metadata } from "next";
import PoweredByLogo from "@/modules/ui/PoweredByLogo";
import Providers from "./providers";
import { ThemeProvider } from "@/components/ThemeProvider";
import "../src/styles/globals.css";
import SplitFunds from "@/components/ui/SplitFunds";

export const metadata: Metadata = {
  title: {
    default: "Andromeda Nextjs Starter",
    template: "%s | App Name",
  },
};

interface Props {
  children?: ReactNode;
}

const RootLayout = async ({ children }: Props) => {
  return (
    <html lang="en">
      <body className="bg-background text-foreground min-h-screen flex flex-col">
        <ThemeProvider>
          <Providers>
            <main className="flex-grow">{children}</main>
            <PoweredByLogo />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
