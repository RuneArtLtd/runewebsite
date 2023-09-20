import type { ButtonHTMLAttributes, ReactNode } from "react";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string | ReactNode;
  className?: string;
}

export const OutlineButton = ({ text, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={`border px-10 font-[600] transition-all hover:bg-card-bg-hover bg-card-bg rounded-full h-fit py-2 ${
        className || ""
      }`}
      {...rest}
    >
      {text}
    </button>
  );
};
