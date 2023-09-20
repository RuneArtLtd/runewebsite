"use client";
import Link from "next/link";
import { OutlineButton } from "../Buttons/OutlineButton";
import { Logo } from "../Icons/Logo";
import { useWalletContext } from "@/contexts/WalletContext";
import { ConnectedButton } from "../WalletConnection/ConnectedButton";
import { useSIWE } from "connectkit";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Audio } from "./Audio";

export const Navbar = () => {
  const { setIsConnectModalOpen } = useWalletContext();
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const { isSignedIn } = useSIWE();
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isClicked && isSignedIn && user && pathname !== "/mint") {
      void router.push("/mint");
      setIsClicked(false);
    }
  }, [user, isSignedIn, isClicked, router, pathname]);

  return (
    <div className="flex fixed z-40 w-full self-center backdrop-blur-sm justify-between items-center px-3 md:px-6 py-6 max-w-[1500px]">
      <Link
        href="/"
        className="w-[50px] md:w-[65px] transition-all cursor-pointer"
      >
        <Logo />
      </Link>
      <div className="flex items-center gap-2">
        {pathname !== "/" ? <Audio /> : null}

        {isSignedIn && user ? (
          <ConnectedButton />
        ) : (
          <div className="flex items-center gap-2">
            <OutlineButton
              onClick={() => {
                setIsConnectModalOpen(true);
                setIsClicked(true);
              }}
              text="Enter"
              className="uppercase"
            />
          </div>
        )}
      </div>
    </div>
  );
};
