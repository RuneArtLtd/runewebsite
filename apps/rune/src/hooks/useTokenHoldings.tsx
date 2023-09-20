import { useAccount, useContractRead } from "wagmi";
import { RUNE_MINTER_ABI } from "../constants/abi";
import { RUNE_MINTER_CONTRACT } from "../constants/contracts";
import { useMemo } from "react";

export const ASSETS: string[] = [
  "/assets/wood.gif",
  "/assets/copper.gif",
  "/assets/gold.gif",
  "/assets/silver.gif",
  "/assets/unknown.gif",
];

export const useTokenHoldings = () => {
  const { address } = useAccount();
  const { data, isError, isLoading } = useContractRead({
    address: address ? RUNE_MINTER_CONTRACT : undefined,
    abi: RUNE_MINTER_ABI,
    functionName: "walletOf",
    args: [address as `0x${string}`],
  });

  return useMemo(() => {
    return {
      tokenHoldings: (data as bigint[])?.map((i: bigint, index: number) => {
        return {
          amount: Number(i),
          imageAsset: ASSETS[index],
        };
      }),
    };
  }, [data, isError, isLoading, address]);
};
