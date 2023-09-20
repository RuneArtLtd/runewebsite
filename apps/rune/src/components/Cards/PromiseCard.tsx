import { type ReactNode } from "react";

export const PromiseCard = ({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="transition-all min-h-full justify-between cursor-default flex flex-col w-full gap-6 rounded-[40px] bg-card-bg items-center px-4 py-10 hover:bg-card-bg-hover hover:scale-[101%]">
      <div className="flex items-center justify-center h-full w-[100px]">
        {icon}
      </div>
      <div className="flex flex-col gap-4 items-center text-center">
        <div className="font-[700] text-pink text-[24px]">{title}</div>
        <div className="font-[400] text-white text-[20px]">{description}</div>
      </div>
    </div>
  );
};
