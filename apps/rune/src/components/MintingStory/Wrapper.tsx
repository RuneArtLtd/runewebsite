import { type ReactNode, useEffect } from "react";
import { FilledButton } from "../Buttons/FilledButton";
import Link from "next/link";
import { useMintStoryContext } from "@/contexts/MintStoryContext";

export const Wrapper = ({ children }: { children: ReactNode }) => {
  const { storyIndex } = useMintStoryContext();

  useEffect(() => {
    document.getElementById("mintStory")?.classList.add("fadeIn");
    setTimeout(() => {
      document.getElementById("mintStory")?.classList.remove("fadeIn");
    }, 500);
  }, [storyIndex]);

  return (
    <section
      id="mintStory"
      className="text-[12px] transition-all relative w-full flex h-[100dvh] pt-24 pb-4 flex-col gap-6 min-h-[750px] items-center text-center "
    >
      {children}
      <Link href="/">
        <FilledButton
          text="Exit"
          className="!bg-black text-off-white hover:bg-black absolute left-0 bottom-5 hover:text-white !w-fit py-3 px-6"
        />
      </Link>
    </section>
  );
};
