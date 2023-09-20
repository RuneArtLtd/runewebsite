import { type ReactNode } from "react";

export const SubTitle = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`text-white font-bold md:text-[32px] text-[24px] text-center ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
};
