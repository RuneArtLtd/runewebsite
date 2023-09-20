import { OutlineButton } from "../Buttons/OutlineButton";
import { Wrapper } from "./Wrapper";
import central from "../../../public/images/mint-central-monolith.gif";
import monolith1Glow from "../../../public/images/mint-monolith-glow-1.gif";
import monolith2Glow from "../../../public/images/mint-monolith-glow-2.gif";
import monolith3Glow from "../../../public/images/mint-monolith-glow-3.gif";
import monolith4Glow from "../../../public/images/mint-monolith-glow-4.gif";
import monolith1 from "../../../public/images/mint-monolith-1.png";
import monolith2 from "../../../public/images/mint-monolith-2.png";
import monolith3 from "../../../public/images/mint-monolith-3.png";
import monolith4 from "../../../public/images/mint-monolith-4.png";
import Image from "next/image";
import { useMintStoryContext } from "@/contexts/MintStoryContext";
import { useAccount, useWalletClient } from "wagmi";
import { useMemo, useState } from "react";
import { RUNE_MINTER_CONTRACT } from "@/constants/contracts";
import { RUNE_MINTER_ABI, RUNE_TOKEN_ABI } from "@/constants/abi";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { MINT_LIST } from "@/constants/mintList";
import { toast } from "react-toastify";
import { decodeEventLog, type BaseError } from "viem";
import { waitForTransaction, prepareWriteContract } from "@wagmi/core";

interface TransferBatch {
  from: string | `0x${string}`;
  ids: bigint[];
  operator: string | `0x${string}`;
  to: string | `0x${string}`;
  values: bigint[];
}

const NON_PRESALE_PROOF: `0x${string}`[] = [
  "0x0000000000000000000000000000000000000000000000000000000000000000",
  "0x0000000000000000000000000000000000000000000000000000000000000000",
  "0x0000000000000000000000000000000000000000000000000000000000000000",
];

export const Mint = () => {
  const { incrementStoryIndex, setNewlyMinted, isPresale } =
    useMintStoryContext();
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();
  const [isMinting, setIsMinting] = useState<boolean>(false);

  const isOnList = useMemo(() => {
    for (const i of MINT_LIST) {
      if (i[0]?.toLowerCase() === address?.toLowerCase()) {
        return true;
      }
    }
    return false;
  }, [address]);

  const mint = async () => {
    if (isPresale) {
      if (!isOnList) {
        toast.info("Current wallet is not on the list of allowed minters.");
        return;
      }
    }
    try {
      setIsMinting(true);
      const tree = StandardMerkleTree.of(MINT_LIST, ["address", "uint256"]);
      let proof: `0x${string}`[];
      if (isPresale) {
        proof = tree.getProof([address as string, 1]) as `0x${string}`[];
      } else {
        proof = NON_PRESALE_PROOF;
      }

      const { request } = await prepareWriteContract({
        account: address,
        address: RUNE_MINTER_CONTRACT,
        abi: RUNE_MINTER_ABI,
        functionName: "mint",
        args: [proof],
      });

      const hash = await walletClient?.writeContract(request);
      if (hash) {
        toast.info("Deciphering in progress...");
        const transaction = await waitForTransaction({
          hash: hash,
        });

        if (transaction.status === "success") {
          const topics = decodeEventLog({
            abi: RUNE_TOKEN_ABI,
            data: transaction.logs[0].data,
            topics: transaction.logs[0].topics,
          });
          const tokenIds = (topics?.args as TransferBatch)?.ids?.map(
            (i: bigint) => Number(i)
          );
          const amountMinted = (topics?.args as TransferBatch)?.values?.map(
            (i: bigint) => Number(i)
          );
          setNewlyMinted({ tokenIds, amountMinted });
          toast.success("Material successfully minted!");
          setIsMinting(false);
          incrementStoryIndex();
          return;
        }
        if (transaction.status === "reverted") {
          setIsMinting(false);
          toast.error("Transaction reverted, please try again.");
          return;
        }
      }
    } catch (error: any) {
      setIsMinting(false);
      toast.error(
        (error as BaseError).walk().message.split(":")[1].split("Version")[0]
      );

      console.log(error);
    }
  };

  return (
    <Wrapper>
      <div className="flex flex-col items-center relative scale-90 sm:scale-100 sm:max-h-fit -mt-6 sm:mt-0">
        <Image
          src={central.src}
          alt="central monolith"
          draggable={false}
          width={central.width / 3}
          height={central.height / 3}
          priority
          loading="eager"
        />
        <Image
          src={monolith1.src}
          alt="monolith 1"
          draggable={false}
          width={monolith1.width / 3}
          height={monolith1.height / 3}
          className="absolute -left-[5rem] top-[17rem]"
          priority
          loading="eager"
        />
        <Image
          src={monolith1Glow.src}
          alt="monolith 1"
          draggable={false}
          width={monolith1Glow.width / 3}
          height={monolith1Glow.height / 3}
          className="absolute -left-[5.7rem] top-[15.5rem]"
          priority
          loading="eager"
        />
        <Image
          src={monolith2.src}
          alt="monolith 2"
          draggable={false}
          width={monolith2.width / 3}
          height={monolith2.height / 3}
          className="absolute -left-[2.75rem] top-[12.5rem]"
          priority
          loading="eager"
        />
        <Image
          src={monolith2Glow.src}
          alt="monolith 1"
          draggable={false}
          width={monolith2Glow.width / 3}
          height={monolith2Glow.height / 3}
          className="absolute -left-[1.1rem] top-[11.1rem]"
          priority
          loading="eager"
        />

        <Image
          src={monolith3.src}
          alt="monolith 3"
          draggable={false}
          width={monolith3.width / 3}
          height={monolith3.height / 3}
          className="absolute -right-[2.75rem] top-[11.75rem]"
          priority
          loading="eager"
        />
        <Image
          src={monolith3Glow.src}
          alt="monolith 3"
          draggable={false}
          width={monolith3Glow.width / 3}
          height={monolith3Glow.height / 3}
          className="absolute -right-[2.75rem] top-[10.5rem]"
          priority
          loading="eager"
        />
        <Image
          src={monolith4.src}
          alt="monolith 4"
          draggable={false}
          width={monolith4.width / 3}
          height={monolith4.height / 3}
          className="absolute -right-[6rem] top-[17rem]"
          priority
          loading="eager"
        />
        <Image
          src={monolith4Glow.src}
          alt="monolith 4"
          draggable={false}
          width={monolith4Glow.width / 3}
          height={monolith4Glow.height / 3}
          className="absolute -right-[5.6rem] top-[16.5rem]"
          priority
          loading="eager"
        />
      </div>
      <div className="flex flex-col -mt-4">
        <div>
          A bright flash emanates from Odin&apos;s fiery eye, your vision
          blurred by the light. As your sight returns, a Rune symbol appears, a
          cryptic hint at the adventure that awaits.
        </div>
      </div>
      <div className="flex flex-col gap-6 pt-2 sm:pt-6 pb-6">
        <OutlineButton
          onClick={() => void mint()}
          text={isMinting ? "Deciphering..." : "Decipher the Rune"}
          disabled={isMinting}
          className={`rounded-xl text-off-white hover:text-white py-3 ${
            isMinting ? "opacity-70 animate-pulse-med" : "opacity-100"
          }`}
        />
      </div>
    </Wrapper>
  );
};
