import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GridBackgroundProps {
  children: ReactNode;
}

export default function GridBackground({ children }: GridBackgroundProps) {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-white dark:bg-black">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_0.3px,transparent_0.3px),linear-gradient(to_bottom,#e4e4e7_0.3px,transparent_0.3px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_0.3px,transparent_0.3px),linear-gradient(to_bottom,#262626_0.3px,transparent_0.3px)]",
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <div className="relative z-50 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text">
        {children}
      </div>
    </div>
  );
}
