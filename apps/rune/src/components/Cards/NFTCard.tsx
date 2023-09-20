import Image from "next/image";
import { Press_Start_2P } from "next/font/google";

const pressStart2P = Press_Start_2P({ weight: ["400"], subsets: ["latin"] });

export const NFTCard = ({
  imageUrl,
  count,
}: {
  imageUrl: string;
  count: number;
}) => {
  return (
    <div>
      {count > 1 ? (
        <div className="relative min-w-[150px] min-h-[150px]">
          <Image
            className="absolute -right-2 -top-3 z-[1]"
            src={imageUrl}
            height={148}
            width={148}
            draggable={false}
            alt={`nft`}
            priority
            loading="eager"
          />
          <Image
            className="absolute top-0 left-0 z-[2]"
            src={imageUrl}
            height={148}
            width={148}
            draggable={false}
            alt={`nft`}
            priority
            loading="eager"
          />
          <div
            className={`${pressStart2P.className} z-[2] absolute -left-4 -bottom-4 text-[11px] bg-black rounded-full border flex items-center justify-center shadow-lg w-[38px] h-[38px]`}
          >
            x{count}
          </div>
        </div>
      ) : (
        <Image
          src={imageUrl}
          height={148}
          width={148}
          draggable={false}
          priority
          loading="eager"
          alt={`nft`}
          className="min-w-[150px]"
        />
      )}
    </div>
  );
};
