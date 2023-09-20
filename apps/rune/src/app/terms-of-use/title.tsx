import { type ReactNode } from "react";

export const Title = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`font-[700] text-white md:text-[40px] text-[32px] text-center ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
};
