import type { ButtonHTMLAttributes, ReactNode } from "react";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string | ReactNode;
  className?: string;
}

export const FilledButton = ({ text, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={`justify-center text-center px-10 flex w-full uppercase font-[600] transition-all hover:bg-magenta-hover bg-magenta rounded-full h-fit py-2 ${
        className || ""
      }`}
      {...rest}
    >
      {text}
    </button>
  );
};
