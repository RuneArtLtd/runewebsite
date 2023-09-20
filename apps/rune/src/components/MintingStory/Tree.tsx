import { OutlineButton } from "../Buttons/OutlineButton";
import { Wrapper } from "./Wrapper";
import tree from "../../../public/images/tree.png";
import monolith1 from "../../../public/images/monolith-1.png";
import monolith2 from "../../../public/images/monolith-2.png";
import monolith3 from "../../../public/images/monolith-3.png";
import monolith4 from "../../../public/images/monolith-4.png";
import leaves from "../../../public/images/leaf-animations.gif";
import particles from "../../../public/images/tree-particles.gif";

import Image from "next/image";
import { useMintStoryContext } from "@/contexts/MintStoryContext";

export const Tree = () => {
  const { incrementStoryIndex } = useMintStoryContext();

  return (
    <Wrapper>
      <div className="flex flex-col items-center relative sm:max-w-fit sm:pt-4">
        <div className="relative">
          <Image
            src={tree.src}
            alt="tree"
            draggable={false}
            width={tree.width / 3.5}
            height={tree.height / 3.5}
            priority
            loading="eager"
            placeholder="blur"
            blurDataURL={tree.blurDataURL}
          />
          <Image
            src={leaves.src}
            alt="leaves"
            draggable={false}
            width={leaves.width / 3.5}
            height={leaves.height / 3.5}
            priority
            className="absolute top-0 left-0"
            loading="eager"
          />
          <Image
            src={particles.src}
            alt="leaves"
            draggable={false}
            width={particles.width}
            height={particles.height}
            priority
            className="absolute top-0 left-0"
            loading="eager"
          />
          <Image
            src={monolith1.src}
            priority
            loading="eager"
            alt="tree"
            draggable={false}
            className="absolute top-[9rem] -left-[3rem] floating-1"
            width={monolith1.width / 3}
            height={monolith1.height / 3}
            placeholder="blur"
            blurDataURL={monolith1.blurDataURL}
          />
          <Image
            src={monolith2.src}
            priority
            loading="eager"
            alt="tree"
            draggable={false}
            className="absolute top-[6.5rem] left-0 floating-2"
            width={monolith2.width / 3.5}
            height={monolith2.height / 3.5}
            placeholder="blur"
            blurDataURL={monolith2.blurDataURL}
          />
          <Image
            src={monolith3.src}
            priority
            loading="eager"
            alt="tree"
            draggable={false}
            className="absolute top-[7rem] right-[1rem] floating-3"
            width={monolith3.width / 3.5}
            height={monolith3.height / 3.5}
            placeholder="blur"
            blurDataURL={monolith3.blurDataURL}
          />
          <Image
            src={monolith4.src}
            priority
            loading="eager"
            alt="tree"
            draggable={false}
            className="absolute top-[9rem] -right-[3rem] floating-4"
            width={monolith4.width / 3}
            height={monolith4.height / 3}
            placeholder="blur"
            blurDataURL={monolith4.blurDataURL}
          />
        </div>
      </div>
      <div className="pt-14 sm:pt-16">
        The seed evolves, blossoming into the mythical Yggdrasil, an ash tree of
        immense proportions, its branches forming pathways, a bridge between the
        nine realms.
      </div>
      <OutlineButton
        onClick={incrementStoryIndex}
        text="Venture Onto the Tree's Path"
        className="rounded-xl text-off-white  py-3 hover:text-white"
      />
    </Wrapper>
  );
};
