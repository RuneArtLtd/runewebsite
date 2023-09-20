import Image from "next/image";
import { type StaticImageData } from "next/image";

import image from "../../../../public/images/unity.svg";
const iconImage = image as StaticImageData;

export const Unity = () => (
  <Image
    src={iconImage.src}
    width={iconImage.width}
    height={iconImage.height}
    alt="unity"
  />
);
