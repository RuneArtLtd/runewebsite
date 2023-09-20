import { OutlineButton } from "../Buttons/OutlineButton";
import { Wrapper } from "./Wrapper";
import Link from "next/link";
import { useMintStoryContext } from "@/contexts/MintStoryContext";
import { useMemo } from "react";
import { ASSETS } from "@/hooks/useTokenHoldings";
import { NFTCard } from "../Cards/NFTCard";

export const Success = () => {
  const { newlyMinted } = useMintStoryContext();

  const newItems = useMemo(() => {
    if (!newlyMinted) return [];
    return newlyMinted.tokenIds.map((id, index) => {
      return {
        amount: newlyMinted.amountMinted[index],
        imageAsset: ASSETS[id],
      };
    });
  }, [newlyMinted]);

  return (
    <Wrapper>
      <div className="flex flex-col items-center justify-center gap-8 relative sm:pt-28">
        <div>You collected these materials on your quest</div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-10">
          {newItems?.map((item, index) => (
            <NFTCard
              key={index}
              imageUrl={item.imageAsset}
              count={item.amount}
            />
          ))}
        </div>

        <Link href="/profile">
          <OutlineButton
            text="Go to your Inventory"
            className="rounded-xl text-off-white hover:text-white py-3 "
          />
        </Link>
      </div>
    </Wrapper>
  );
};
