"use client";
import { Press_Start_2P } from "next/font/google";
import { Seed } from "../../components/MintingStory/Seed";
import { Tree } from "../../components/MintingStory/Tree";
import { Allfather } from "../../components/MintingStory/Allfather";
import { AllfatherSpeaks } from "../../components/MintingStory/AllfatherSpeaks";
import { Mint } from "../../components/MintingStory/Mint";
import { Success } from "../../components/MintingStory/Success";
import { useMintStoryContext } from "../../contexts/MintStoryContext";
import { useEffect, useState } from "react";
import { useSIWE } from "connectkit";
import { useRouter } from "next/navigation";
import { useNextMintTime } from "../../hooks/useNextMintTime";
import { CountDown } from "../../components/Countdown/Countdown";
import { useAudioContext } from "@/contexts/AudioContext";

const pressStart2P = Press_Start_2P({ weight: ["400"], subsets: ["latin"] });

const Story = [
  <Seed key={0} />,
  <Tree key={1} />,
  <Allfather key={2} />,
  <AllfatherSpeaks key={3} />,
  <Mint key={4} />,
  <Success key={5} />,
];

export default function MintPage() {
  const { storyIndex } = useMintStoryContext();
  const [showStory, setShowStory] = useState<boolean>(false);
  const { isSignedIn } = useSIWE();
  const router = useRouter();
  const { nextMintTime } = useNextMintTime();
  const { handlePlay } = useAudioContext();

  useEffect(() => {
    handlePlay();
  }, []);

  useEffect(() => {
    if (!isSignedIn) {
      void router.push("/");
    }
  }, [isSignedIn]);

  useEffect(() => {
    if (storyIndex > 0) {
      setShowStory(true);
      return;
    }
    const timeout = setTimeout(() => {
      setShowStory(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, [storyIndex]);

  return (
    <main className={`${pressStart2P.className} relative flex flex-col`}>
      <div
        className={`bg-black ${showStory ? "opacity-0" : "opacity-100"} 
          transition-all
          duration-1000
        w-[100vw] mx-auto h-[100dvh] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
          showStory ? "z-[-1]" : "z-50"
        }`}
      />
      {nextMintTime > 0 ? (
        <div className="flex h-screen w-full items-center justify-center text-center">
          <div>
            <CountDown className="!text-sm !justify-center" />
          </div>
        </div>
      ) : (
        Story[storyIndex]
      )}
    </main>
  );
}
