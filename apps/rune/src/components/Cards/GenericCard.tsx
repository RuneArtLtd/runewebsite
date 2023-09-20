import { type ReactNode } from "react";

export const GenericCard = ({
  title,
  children,
  className,
}: {
  children: ReactNode;
  title: string;
  className?: string;
}) => {
  return (
    <div
      className={`transition-all min-h-full flex flex-col w-full gap-6 rounded-[40px] bg-card-bg  px-4 py-10 ${
        className || ""
      }`}
    >
      <div className="font-[700] text-pink text-[24px] uppercase">{title}</div>
      {children}
    </div>
  );
};
