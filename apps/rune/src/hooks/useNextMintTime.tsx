import { useAccount, useContractRead } from "wagmi";
import { RUNE_MINTER_ABI } from "../constants/abi";
import { RUNE_MINTER_CONTRACT } from "../constants/contracts";
import { useMemo } from "react";

export const useNextMintTime = () => {
  const { address } = useAccount();
  const { data, isError, isLoading, refetch } = useContractRead({
    address: address ? RUNE_MINTER_CONTRACT : undefined,
    abi: RUNE_MINTER_ABI,
    functionName: "lastMintTime",
    args: [address as `0x${string}`],
  });
  const { data: isLimitingWallets } = useContractRead({
    address: RUNE_MINTER_CONTRACT,
    abi: RUNE_MINTER_ABI,
    functionName: "limitWalletsMinting",
  });

  return useMemo(() => {
    return {
      nextMintTime: Boolean(isLimitingWallets)
        ? Math.floor(Number(data) - Date.now() / 1000)
        : 0,
      refetch: refetch,
    };
  }, [data, isError, isLoading, address, isLimitingWallets]);
};
