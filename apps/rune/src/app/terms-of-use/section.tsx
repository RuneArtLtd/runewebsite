import { type ReactNode } from "react";

export const Section = ({
  children,
  className,
  isListItem,
}: {
  children: ReactNode;
  isListItem?: boolean;
  className?: string;
}) => {
  return (
    <>
      {isListItem ? (
        <li className={`opacity-80 text-white ${className ?? ""}`}>
          {children}
        </li>
      ) : (
        <div className={`opacity-80 text-white ${className ?? ""}`}>
          {children}
        </div>
      )}
    </>
  );
};
