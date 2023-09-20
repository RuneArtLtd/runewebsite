import Link from "next/link";
import { type ReactNode } from "react";

export const IconButton = ({
  icon,
  href,
  className,
}: {
  icon: ReactNode;
  href: string;
  className?: string;
}) => (
  <Link href={href} rel="noopenner noreferrer" target="_blank">
    <div
      className={`flex items-center justify-center rounded-full w-[32px] h-[32px] md:w-[40px] md:h-[40px] transition-all cursor-pointer ${
        className || ""
      }`}
    >
      {icon}
    </div>
  </Link>
);
