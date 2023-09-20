import { OutlineButton } from "../Buttons/OutlineButton";
import { Wrapper } from "./Wrapper";
import odin from "../../../public/images/odin_cu.png";
import odinEye from "../../../public/images/odin-flame-eye.gif";
import odinBlink from "../../../public/images/odin-blink.gif";
import Image from "next/image";
import { useMintStoryContext } from "@/contexts/MintStoryContext";

export const AllfatherSpeaks = () => {
  const { incrementStoryIndex } = useMintStoryContext();

  return (
    <Wrapper>
      <div className="flex flex-col items-center relative pt-14 sm:max-w-fit">
        <div className="relative -mt-8">
          <Image
            src={odin.src}
            alt="allfather"
            priority
            loading="eager"
            placeholder="blur"
            blurDataURL={odin.blurDataURL}
            draggable={false}
            width={odin.width / 2.5}
            height={odin.height / 2.5}
          />
          <Image
            priority
            loading="eager"
            src={odinEye.src}
            alt="eye"
            className="absolute top-[2.8rem] left-[5.15rem]"
            draggable={false}
            width={odinEye.width / 2.5}
            height={odinEye.height / 2.5}
          />
          <Image
            priority
            loading="eager"
            src={odinBlink.src}
            alt="blink"
            className="absolute top-[6.6rem] right-[7.25rem]"
            draggable={false}
            width={odinBlink.width / 2.5}
            height={odinBlink.height / 2.5}
          />
        </div>
      </div>
      <div className="flex flex-col pt-2">
        <div>
          Odin speaks, his voice a whisper in the cosmic winds, &quot;In you, I
          see potential. An epoch of destiny awaits, but only if you dare to
          tread the path unknown.&quot;
        </div>
      </div>
      <OutlineButton
        onClick={incrementStoryIndex}
        text="Consider his Words"
        className="rounded-xl  py-3 text-off-white hover:text-white"
      />
    </Wrapper>
  );
};
