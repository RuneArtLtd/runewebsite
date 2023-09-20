import { OutlineButton } from "../Buttons/OutlineButton";
import { Wrapper } from "./Wrapper";
import odin from "../../../public/images/odin.gif";
import odinEye from "../../../public/images/odin-eye.gif";
import odinShine from "../../../public/images/odin-shine.gif";
import odinSpearShine from "../../../public/images/odin-spear-shine.gif";
import Image from "next/image";
import { useMintStoryContext } from "@/contexts/MintStoryContext";

export const Allfather = () => {
  const { incrementStoryIndex } = useMintStoryContext();

  return (
    <Wrapper>
      <div className="flex flex-col items-center relative  max-w-[250px] sm:max-w-fit">
        <div className="relative">
          <Image
            priority
            loading="eager"
            src={odin.src}
            alt="allfather"
            draggable={false}
            width={odin.width / 5}
            height={odin.height / 5}
          />
          <Image
            priority
            loading="eager"
            src={odinEye.src}
            alt="eye"
            className="absolute top-[4.1rem] left-[3.15rem]"
            draggable={false}
            width={odinEye.width / 5}
            height={odinEye.height / 5}
          />
          <Image
            priority
            loading="eager"
            src={odinShine.src}
            alt="eye"
            className="absolute top-[6.1rem] left-[2.35rem]"
            draggable={false}
            width={odinShine.width / 5}
            height={odinShine.height / 5}
          />
          <Image
            priority
            loading="eager"
            src={odinSpearShine.src}
            alt="eye"
            className="absolute top-[0rem] left-[.35rem]"
            draggable={false}
            width={odinSpearShine.width / 5}
            height={odinSpearShine.height / 5}
          />
        </div>
      </div>
      <div className="flex flex-col pt-2">
        <div>
          A figure veiled in a cloak emerges on the path, spear as his staff.
        </div>
        <div>
          His eye radiates a fiery blaze; it&apos;s Odin, the Allfather, his
          presence emanating power and mystery.
        </div>
      </div>
      <OutlineButton
        onClick={incrementStoryIndex}
        text="Approach the Allfather"
        className="rounded-xl text-off-white  py-3 hover:text-white"
      />
    </Wrapper>
  );
};
