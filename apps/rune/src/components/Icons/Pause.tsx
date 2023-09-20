import { type ComponentProps } from "react";

export const Pause = (props: ComponentProps<"svg">) => (
  <svg
    stroke="white"
    fill="white"
    strokeWidth="0"
    viewBox="0 0 16 16"
    height="2em"
    width="2em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
  </svg>
);
