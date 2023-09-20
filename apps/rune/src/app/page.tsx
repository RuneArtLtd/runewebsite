"use client";
import Image from "next/image";
import monolith from "../../public/images/central-monolith.gif";
import waterfall from "../../public/images/waterfall-silver.gif";
import logo from "../../public/images/spinning-logo.gif";
import laptop from "../../public/images/ComputerRune.png";
import { FilledButton } from "../components/Buttons/FilledButton";
import { ScrollIndicator } from "../components/Icons/ScrollIndicator";
import { PromiseCard } from "../components/Cards/PromiseCard";
import { Logo } from "../components/Icons/Logo";
import { IconButton } from "../components/Buttons/IconButton";
import { Twitter } from "../components/Icons/Twitter";
import { Instragram } from "../components/Icons/Instagram";
import { Facebook } from "../components/Icons/Facebook";
import { Discord } from "../components/Icons/Discord";
import { OpenSea } from "../components/Icons/OpenSea";
import { Threads } from "../components/Icons/Threads";
import Link from "next/link";
import { useWalletContext } from "../contexts/WalletContext";
import { useEffect, useState } from "react";
import { useSIWE } from "connectkit";
import { useUser } from "../hooks/useUser";
import { useRouter, usePathname } from "next/navigation";
import { Youtube } from "../components/Icons/Youtube";
import { Commuinty } from "../components/Icons/Community";
import { Autonomy } from "../components/Icons/Autonomy";
import { Interoperability } from "../components/Icons/Interoperability";
import { useAudioContext } from "@/contexts/AudioContext";

const promises: {
  title: string;
  description: string;
  icon: JSX.Element;
}[] = [
  {
    title: "Community",
    description:
      "Rune fosters a connected and engaged community that drives a decentralized and dynamic gaming experience. Together, we're shaping the future of interactive entertainment and online gaming experiences.",
    icon: <Commuinty />,
  },
  {
    title: "Autonomy",
    description:
      "Our platform is engineered on the principle of true user empowerment. Through a decentralized structure, individuals have control over their unique digital collectibles, and the way they interact within the Rune ecosystem.",
    icon: <Autonomy />,
  },
  {
    title: "Interoperability",
    description:
      "We provide unparalleled flexibility and interoperability. You decide how to engage with blockchain technology, if at all and which rich gaming worlds to explore. The power to shape your experience lies with you.",
    icon: <Interoperability />,
  },
];

export default function Home() {
  const { setIsConnectModalOpen } = useWalletContext();
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const { isSignedIn } = useSIWE();
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const { handlePause } = useAudioContext();

  useEffect(() => {
    handlePause();
  }, []);

  useEffect(() => {
    if (isClicked && isSignedIn && user && pathname !== "/mint") {
      void router.push("/mint");
      setIsClicked(false);
    }
  }, [user, isSignedIn, isClicked, router, pathname]);

  const handleEnterClick = () => {
    setIsClicked(true);
    if (user && isSignedIn) {
      router.push("/mint");
      return;
    }
    setIsConnectModalOpen(true);
  };

  return (
    <main className="flex flex-col">
      <section className="flex h-[100dvh] pt-24 pb-4 min-h-[650px] flex-col gap-4 items-center text-center justify-between">
        <div className="flex flex-col items-center gap-4 -mt-4 sm:-mt-2">
          <div className="relative">
            <Image
              src={monolith.src}
              priority={true}
              loading="eager"
              alt="monolith"
              className="sm:max-w-[200px] sm:w-[200px] max-w-[140px] w-[140px]"
              draggable={false}
              width={monolith.width}
              height={monolith.height}
            />
            <Image
              src={logo.src}
              priority={true}
              loading="eager"
              className="absolute sm:bottom-[5.6rem] sm:left-[4.7rem] sm:max-w-[60px] sm:w-[60px] max-w-[40px] w-[40px] bottom-[4rem] left-[3.35rem]"
              alt="monolith"
              draggable={false}
              width={logo.width}
              height={logo.height}
            />
          </div>
          <div className="flex flex-col gap-4 -mt-8">
            <div className="font-[700] text-4xl  md:text-[60px] max-w-[450px] md:max-w-[720px]  md:leading-[72px]">
              Dive into the Future of Digital Gaming with Rune
            </div>
            <div className="text-pink text-[32px] md:text-[48px]">
              Your Portal to Endless Adventures!
            </div>
          </div>
          <div className="max-w-[200px] justify-center flex w-full">
            <FilledButton text="Enter" onClick={handleEnterClick} />
          </div>
        </div>

        <div>
          <ScrollIndicator />
        </div>
      </section>
      <section className="flex flex-col gap-4 items-center text-center py-16">
        <div className="flex items-center gap-1 text-[28px] md:text-[40px] flex-wrap justify-center">
          <div className="font-[700]">Leave Your Mark On Gaming</div>
        </div>
        <div className="flex gap-4 flex-col lg:flex-row">
          {promises.map((promise) => (
            <PromiseCard
              key={promise.title}
              title={promise.title}
              description={promise.description}
              icon={promise.icon}
            />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4 items-center text-center py-16">
        <div className="flex flex-col items-center justify-between w-full lg:flex-row gap-12">
          <div className="flex flex-col gap-4 text-center lg:text-left">
            <div className="flex flex-col">
              <div className="font-[700] text-white text-[32px] lg:text-[40px]">
                Rune Materials
              </div>
              <div className="font-[400] text-pink lg:text-[32px] text-[24px]">
                Embark on a Unique Journey with Rune&apos;s Digital Collectibles
              </div>
            </div>
            <div className="font-[400] lg:text-[24px] text-[18px]">
              Begin a captivating adventure with Rune&apos;s immersive digital
              collectibles experience. The initial series of collectibles, known
              as &quot;Materials,&quot; are minted at no cost and act as your
              key to unlocking a rich and expansive gaming universe. At Rune,
              you&apos;re not just a player; you&apos;re a vital part of a
              thriving gaming ecosystem, where your contributions shape the
              worlds we explore.
            </div>
          </div>
          <Image
            className="min-w-[30%]"
            src={waterfall.src}
            height={480}
            width={480}
            draggable={false}
            alt={`waterfall`}
          />
        </div>
      </section>

      <section className="flex flex-col gap-4 items-center text-center py-16">
        <div className="flex flex-col-reverse items-center justify-between w-full lg:flex-row gap-12">
          <Image
            className="min-w-[30%]"
            src={laptop.src}
            height={480}
            width={480}
            draggable={false}
            alt={`laptop`}
          />
          <div className="flex flex-col gap-4 text-center lg:text-left">
            <div className="flex flex-col">
              <div className="font-[700] text-white text-[32px] lg:text-[40px]">
                Launcher
              </div>
              <div className="font-[400] text-pink lg:text-[32px] text-[24px]">
                Elevate your online experience with Rune&apos;s unique gaming
                ecosystem
              </div>
            </div>
            <div className="font-[400] lg:text-[24px] text-[18px]">
              Designed to revolutionize the way you play, Rune&apos;s game
              launcher integrates interoperability, autonomy, and community
              engagement through cutting-edge technology. Experience seamless
              connections between diverse gaming worlds and immerse yourself in
              an ecosystem where your choices truly matter.
            </div>
            <div className="font-[400] lg:text-[24px] text-[18px]">
              With Rune, you have the freedom to shape your journey, explore
              vast interconnected realms, and become part of a vibrant,
              decentralized community. Whether you&apos;re a casual gamer or an
              enthusiast, Rune&apos;s game launcher provides an unparalleled
              experience that&apos;s secure, transparent, and user-centric.
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-4 items-center text-center py-16">
        <div className="flex flex-col gap-6 text-center">
          <div className="w-[80px] md:w-[110px] transition-all mx-auto">
            <Logo />
          </div>
          <div className="flex flex-col">
            <div className="font-[700] text-white text-[32px] lg:text-[40px]">
              Rune: Explore, Connect, Evolve.
            </div>
            <div className="font-[400] text-pink lg:text-[32px] text-[24px] max-w-[1050px]">
              Unlock your gaming prowess and delve into the next era of digital
              gaming. Your future in gaming begins here, at Rune.
            </div>
          </div>
          <div className="w-full max-w-[250px] mx-auto">
            <FilledButton text="Enter Rune" onClick={handleEnterClick} />
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-4 items-center text-center py-16">
        <div className="flex flex-col items-center sm:flex-row w-full justify-center gap-4 sm:gap-8">
          <div className="flex gap-8">
            <IconButton icon={<Twitter />} href="https://x.com/rune_online" />
            <IconButton
              icon={<Instragram />}
              href="https://instagram.com/rune.online"
            />
            <IconButton
              icon={<Facebook />}
              href="https://facebook.com/runeartltd"
            />
          </div>
          <div className="flex gap-8">
            <IconButton
              icon={<Discord />}
              href="https://discord.gg/rune-online"
            />
            <IconButton
              icon={<Youtube />}
              href="https://www.youtube.com/@rune_online/"
            />
            <IconButton
              icon={<OpenSea />}
              href="https://opensea.io/collection/rune-materials"
            />
            <IconButton
              icon={<Threads />}
              href="https://www.threads.net/@rune.online"
            />
          </div>
        </div>
      </section>
      <footer className="flex flex-col-reverse md:flex-row w-full self-center gap-4 justify-between items-center py-10 max-w-[1500px]">
        <div>© {new Date().getFullYear()} Rune Art Ltd</div>
        <div className="flex items-center gap-6">
          <Link href="/terms-of-use">Terms of Use</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </div>
      </footer>
    </main>
  );
}
