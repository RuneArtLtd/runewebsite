"use client";
import { OutlineButton } from "../Buttons/OutlineButton";
import { Wrapper } from "./Wrapper";
import seedImage from "../../../public/images/seed-still.png";
import seedGif from "../../../public/images/seed.gif";
import { useState } from "react";
import Image from "next/image";
import { useMintStoryContext } from "@/contexts/MintStoryContext";

export const Seed = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const { incrementStoryIndex } = useMintStoryContext();

  const next = () => {
    setIsClicked(true);
    setTimeout(() => {
      incrementStoryIndex();
    }, 3000);
  };

  return (
    <Wrapper>
      <div className="flex flex-col items-center relative">
        <Image
          src={isClicked ? seedGif.src : seedImage.src}
          alt="seed"
          placeholder="blur"
          blurDataURL={seedImage.blurDataURL}
          draggable={false}
          className="cursor-pointer transition-all"
          width={seedImage.width / 2}
          height={seedImage.height / 2}
          onClick={() => setIsClicked(!isClicked)}
          priority
          loading="eager"
        />
      </div>
      <div>
        In the silent void of cosmos, a single seed floats, seemingly
        insignificant yet destined for greatness.
      </div>
      <OutlineButton
        onClick={next}
        text="Observe the Seed"
        className="rounded-xl text-off-white  py-3 hover:text-white"
      />
    </Wrapper>
  );
};
