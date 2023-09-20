import Image from "next/image";
import { type StaticImageData } from "next/image";

import image from "../../../../public/images/progress.svg";
const iconImage = image as StaticImageData;

export const Progress = () => (
  <Image
    src={iconImage.src}
    width={iconImage.width}
    height={iconImage.height}
    alt="progress"
  />
);
