import type { ButtonHTMLAttributes, ReactNode } from "react";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  className?: string;
}
export const SocialButton = ({ icon, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={`hover:opacity-80 shadow-lg transition p-2.5 w-fit rounded-full ${
        className || ""
      }`}
      {...rest}
    >
      <div className="h-[24px] w-[24px] flex items-center justify-center">
        {icon}
      </div>
    </button>
  );
};
