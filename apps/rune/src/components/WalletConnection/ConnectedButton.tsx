import { useWalletContext } from "@/contexts/WalletContext";
import { useUser } from "@/hooks/useUser";
import { Menu, Transition } from "@headlessui/react";
import { useModal, useSIWE } from "connectkit";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";
import { useDisconnect } from "wagmi";

const defaultImage = "/images/default-profile-picture.png";

export const ConnectedButton = () => {
  const { web3Auth } = useWalletContext();
  const { disconnect } = useDisconnect();
  const { setOpen } = useModal();
  const { signOut } = useSIWE();
  const { user } = useUser();

  const logout = async () => {
    disconnect();
    signOut();
    if (web3Auth?.connectedAdapterName === "openlogin") {
      await web3Auth?.logout();
    }
  };

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button>
            <Image
              src={user?.profile_picture || defaultImage}
              width={48}
              height={48}
              alt="profile picture"
              className={`w-[32px] h-[32px] md:w-[48px] md:h-[48px] rounded-full shadow-profile-picture object-center p-[3px] ${
                user?.profile_picture === defaultImage
                  ? "object-contain"
                  : "object-cover"
              }`}
              style={{
                background: "linear-gradient(135deg, #F7EAFF 0%, #624276 100%)",
              }}
              priority
              loading="eager"
              draggable={false}
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                <Link href="/profile">
                  <button
                    className={`group hover:bg-purple hover:text-white font-semibold transition flex w-full items-center rounded-md px-2 text-black py-2 text-sm`}
                  >
                    Profile
                  </button>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <button
                  onClick={() => void setOpen(true)}
                  className={`group hover:bg-purple hover:text-white font-semibold transition flex w-full items-center rounded-md px-2 text-black py-2 text-sm`}
                >
                  Wallet
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  onClick={() => void logout()}
                  className={`group hover:bg-purple hover:text-white font-semibold transition flex w-full items-center rounded-md px-2 text-black py-2 text-sm`}
                >
                  Logout
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};
