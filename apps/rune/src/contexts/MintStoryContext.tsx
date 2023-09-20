"use client";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { usePathname } from "next/navigation";
import { useContractRead } from "wagmi";
import { RUNE_MINTER_CONTRACT } from "@/constants/contracts";
import { RUNE_MINTER_ABI } from "@/constants/abi";

interface MintStoryContextType {
  storyIndex: number;
  incrementStoryIndex: () => void;
  decrementStoryIndex: () => void;
  exitStory: () => void;
  newlyMinted: undefined | { tokenIds: number[]; amountMinted: number[] };
  setNewlyMinted: Dispatch<
    SetStateAction<undefined | { tokenIds: number[]; amountMinted: number[] }>
  >;
  isPresale: boolean | unknown;
}

const MintStoryContext = createContext<MintStoryContextType>({
  storyIndex: 0,
  incrementStoryIndex: () => undefined,
  decrementStoryIndex: () => undefined,
  exitStory: () => undefined,
  newlyMinted: undefined,
  setNewlyMinted: () => undefined,
  isPresale: false,
});

export const MintStoryWrapper = ({ children }: { children: ReactNode }) => {
  const [storyIndex, setStoryIndex] = useState<number>(0);
  const pathname = usePathname();
  const [newlyMinted, setNewlyMinted] = useState<
    undefined | { tokenIds: number[]; amountMinted: number[] }
  >(undefined);
  const { data: isPresale } = useContractRead({
    address: RUNE_MINTER_CONTRACT,
    abi: RUNE_MINTER_ABI,
    functionName: "presale",
  });

  useEffect(() => {
    if (!pathname?.startsWith("/mint")) {
      exitStory();
    }
  }, [pathname]);

  const incrementStoryIndex = (): void => {
    setStoryIndex(storyIndex + 1);
  };

  const decrementStoryIndex = (): void => {
    if (storyIndex === 0) return;
    setStoryIndex(storyIndex - 1);
  };

  const exitStory = (): void => {
    setStoryIndex(0);
  };

  const settings = {
    storyIndex,
    incrementStoryIndex,
    decrementStoryIndex,
    exitStory,
    newlyMinted,
    setNewlyMinted,
    isPresale,
  };

  return (
    <MintStoryContext.Provider value={settings}>
      {children}
    </MintStoryContext.Provider>
  );
};

export const useMintStoryContext = () => {
  return useContext(MintStoryContext);
};
