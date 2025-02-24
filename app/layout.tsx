import React, { ReactNode } from "react"
import { Metadata } from "next";
import PoweredByLogo from "@/modules/ui/PoweredByLogo";
import { ThemeProvider } from "@/modules/wallet";
// import "../modules/globals.css";

export const metadata: Metadata = {
    title: {
        default: "Andromeda Nextjs Starter",
        template: "%s | App Name"
    },
}

interface Props {
    children?: ReactNode;
}

const RootLayout = async (props: Props) => {
    const { children } = props;

    return (
        <html lang="en">
            <body>
                <ThemeProvider
                
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                    <PoweredByLogo />
                    {/* <Popover>
                        <PopoverTrigger>Open</PopoverTrigger>
                        <PopoverContent>Place content for the popover here.</PopoverContent>
                    </Popover> */}
                </ThemeProvider>
            </body>
        </html>
    )
}

export default RootLayout
