import "./globals.css";
import type { Metadata } from "next";
import { Jost } from "next/font/google";
import background from "../../public/images/background.svg";
import Image, { type StaticImageData } from "next/image";
import { Navbar } from "../components/Navbar/Navbar";
import { WalletWrapper } from "../contexts/WalletContext";
import { MintStoryWrapper } from "../contexts/MintStoryContext";
import { Star } from "../components/Star/Star";
import { AudioWrapper } from "@/contexts/AudioContext";
const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://rune-nft.vercel.app/"),
  title: "Rune",
  description: "Dive into the Future of Digital Gaming with Rune",

  keywords:
    "Rune, NFT, Gaming, Metaverse, Blockchain, Ethereum, viem,ethers, Solidityio",
  openGraph: {
    type: "website",
    url: "https://rune-nft.vercel.app/",
    title: "Rune",
    description: "Dive into the Future of Digital Gaming with Rune",
    siteName: "Rune",
    images: [
      {
        url: "/images/og.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@site",
    creator: "@creator",
    images: "/images/og.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${jost.className} relative`}>
        <WalletWrapper>
          <MintStoryWrapper>
            <AudioWrapper>
              <div className="relative h-[100dvh] select-none">
                <Image
                  src={(background as StaticImageData).src}
                  className="fixed h-[100dvh] top-0 z-10 object-cover object-center w-full"
                  alt="background"
                  draggable={false}
                  height={(background as StaticImageData).height}
                  width={(background as StaticImageData).width}
                  priority
                  loading="eager"
                />
                <div className="absolute top-[33%] left-[85%] opacity-70 scale-[80%] z-10 ">
                  <Star />
                </div>
                <div className="absolute top-[53%] left-[15%] opacity-50 scale-[50%] z-10 ">
                  <Star animationDelay="delay-500" />
                </div>
                <div className="absolute top-[53%] left-[50%] opacity-100 scale-[50%] z-10 ">
                  <Star animationDelay="delay-300" />
                </div>
                <div className="absolute top-[23%] left-[20%] opacity-100  scale-[30%] z-10 ">
                  <Star animationDelay="delay-500" />
                </div>
                <div className="absolute top-[73%] left-[80%] opacity-100  scale-[30%] z-10 ">
                  <Star animationDelay="delay-1000" />
                </div>
              </div>

              <div className="absolute top-0 z-30 flex flex-col w-full h-[100dvh] overflow-y-auto overflow-x-hidden">
                <Navbar />
                <div className="px-4 md:px-6 self-center w-full mx-auto max-w-[1200px]">
                  {children}
                </div>
              </div>
            </AudioWrapper>
          </MintStoryWrapper>
        </WalletWrapper>
      </body>
    </html>
  );
}
