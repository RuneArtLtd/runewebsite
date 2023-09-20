import { type SVGProps } from "react";

export const Star = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width="50"
    height="50"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="25" cy="25" r="25" fill="url(#paint0_radial_116_287)" />
    <defs>
      <radialGradient
        id="paint0_radial_116_287"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(25 25) rotate(90) scale(25)"
      >
        <stop stopColor="white" />
        <stop offset="0.526042" stopColor="white" stopOpacity="0.16" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);
