"use client";
import * as React from "react";
import { Button, ButtonProps } from "./button";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyButtonProps extends ButtonProps {
  text: string;
  iconClassName?: string;
  copiedIconClassName?: string;
}

/**
 * Copy button component
 * @param text - The text to copy
 * @param iconClassName - The class name for the icon
 * @param copiedIconClassName - The class name for the copied icon
 * @param props - The props for the button
 */
export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  iconClassName,
  copiedIconClassName,
  ...props
}) => {
  const [copied, setCopied] = React.useState(false);
  return (
    <Button
      {...props}
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1000);
      }}
    >
      {copied ? (
        <Check className={cn("text-green-500 w-4 h-4", copiedIconClassName)} />
      ) : (
        <Copy className={cn("w-4 h-4", iconClassName)} />
      )}
    </Button>
  );
};
