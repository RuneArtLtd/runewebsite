import { useWalletContext } from "@/contexts/WalletContext";
import { GenericModal } from "../Modals/GenericModal";
import { FilledButton } from "../Buttons/FilledButton";
import { useModal } from "connectkit";
import { SocialButton } from "../Buttons/SocialButton";
import { Twitter } from "../Icons/Twitter";
import { Discord } from "../Icons/Discord";
import { Google } from "../Icons/Google";
import { Apple } from "../Icons/Apple";
import { Email } from "../Icons/Email";
import { type FormEvent, useEffect, useState, Fragment } from "react";
import { OutlineButton } from "../Buttons/OutlineButton";
import { Phone } from "../Icons/Phone";
import { countries } from "@/constants/countries";
import { Listbox, Transition } from "@headlessui/react";
import { type LOGIN_PROVIDER_TYPE } from "@web3auth/openlogin-adapter";
import { WALLET_ADAPTERS } from "@web3auth/base";
import { useAccount, useDisconnect } from "wagmi";
import { MetaMask } from "../Icons/MetaMask";
import { Coinbase } from "../Icons/Coinbase";
import { WalletConnect } from "../Icons/WalletConnect";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const icons = [
  <MetaMask key={0} />,
  <Coinbase key={1} />,
  <WalletConnect key={2} />,
];

export const WalletConnectModal = () => {
  const { isConnectModalOpen, setIsConnectModalOpen, web3Auth, init } =
    useWalletContext();
  const { setOpen } = useModal();
  const [showInput, setShowInput] = useState<boolean>(false);
  const [emailOrPhone, setEmailOrPhone] = useState<string>("");
  const [type, setType] = useState<"Email" | "Phone">("Email");
  const [isInputInvalid, setIsInputInvalid] = useState<boolean>(false);
  const [countryCode, setCountryCode] = useState<string>("+1");
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const openConneckitModal = () => {
    setIsConnectModalOpen(false);
    setOpen(true);
  };

  useEffect(() => {
    if (!isConnectModalOpen) {
      setShowInput(false);
    }
  }, [isConnectModalOpen]);

  useEffect(() => {
    if (!showInput) {
      setCountryCode("+1");
      setEmailOrPhone("");
      setIsInputInvalid(false);
    }
  }, [showInput]);

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let cleanedInput = emailOrPhone;
    if (type === "Phone") {
      cleanedInput = cleanedInput.replace(/\D/g, ""); //replace all non-digits with empy string
      cleanedInput = countryCode + "-" + cleanedInput;
    }
    if (type === "Email") {
      if (!emailRegex.test(cleanedInput)) {
        setIsInputInvalid(true);
        return;
      }
    }

    void socialLogin(
      type === "Email" ? "email_passwordless" : "sms_passwordless",
      cleanedInput
    );
    setTimeout(() => {
      setShowInput(false);
    }, 2000);
  };

  useEffect(() => {
    if (isInputInvalid) {
      setTimeout(() => {
        setIsInputInvalid(false);
      }, 2000);
    }
  }, [emailOrPhone, isInputInvalid]);

  const handleCountryCode = (value: string) => {
    setCountryCode(value);
  };

  const socialLogin = async (
    loginProvider: LOGIN_PROVIDER_TYPE,
    emailOrPhone?: string
  ) => {
    try {
      if (!web3Auth) {
        init();
      }
      if (isConnected) {
        disconnect();
      }
      if (emailOrPhone) {
        await web3Auth?.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
          loginProvider: loginProvider,
          extraLoginOptions: {
            login_hint: emailOrPhone,
          },
        });
        return;
      }
      await web3Auth?.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
        loginProvider: loginProvider,
      });
    } catch (error: any) {
      if (
        error instanceof Error &&
        error?.message ===
          "Wallet is not found, Please add wallet adapter for openlogin wallet, before connecting"
      ) {
        init();
      }
    }
  };

  return (
    <GenericModal
      isOpen={isConnectModalOpen}
      onClose={() => setIsConnectModalOpen(false)}
    >
      <div className="flex flex-col gap-6">
        {!showInput ? (
          <div className="flex flex-col items-center gap-2 fadeIn">
            <div className="text-off-white text-center">Continue with</div>
            <div className="flex items-center justify-evenly flex-wrap gap-2 w-full">
              <SocialButton
                icon={<Twitter />}
                className="bg-[#26a7de]"
                onClick={() => void socialLogin("twitter")}
              />
              <SocialButton
                icon={<Discord />}
                className="bg-[#5a65ea]"
                onClick={() => void socialLogin("discord")}
              />
              <SocialButton
                icon={<Google />}
                className="bg-white"
                onClick={() => void socialLogin("google")}
              />
              <SocialButton
                icon={
                  <div className="h-[18px] w-[18px] flex items-center justify-center">
                    <Apple />
                  </div>
                }
                className="bg-black"
                onClick={() => void socialLogin("apple")}
              />
              <SocialButton
                icon={<Email />}
                className="bg-gradient-to-r from-[rgb(82,179,208)] to-[rgb(78,128,238)]"
                onClick={() => {
                  setShowInput(true);
                  setType("Email");
                }}
              />
              <SocialButton
                icon={<Phone />}
                className="bg-[#790cf5]"
                onClick={() => {
                  setShowInput(true);
                  setType("Phone");
                }}
              />
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowInput(false)}
            className="font-bold text-left"
          >
            Back
          </button>
        )}
        {showInput ? (
          <div className="flex flex-col gap-4 fadeIn">
            <div className="text-off-white text-center">
              Enter your {type} to Continue
            </div>
            <form className="flex flex-col gap-4">
              <div className="flex items-center gap-2 w-full">
                {type === "Phone" && (
                  <div className="relative">
                    <Listbox value={countryCode} onChange={handleCountryCode}>
                      <Listbox.Button className=" py-3 border bg-[#00000070] rounded-xl px-4 text-white text-lg">
                        <span className="block truncate">{countryCode}</span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-fit overflow-auto py-3 border bg-purple rounded-lg px-4 text-white text-lg">
                          {countries.map((country, idx) => (
                            <Listbox.Option
                              key={idx}
                              className={`whitespace-nowrap cursor-pointer w-full select-none p-2 rounded-lg hover:bg-off-white hover:text-black`}
                              value={country.dial_code}
                            >
                              {country.code} - {country.dial_code}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </Listbox>
                  </div>
                )}
                <div className="flex flex-col w-full">
                  <input
                    placeholder={`Enter your ${type}`}
                    className="py-3 border bg-[#00000070] rounded-full w-full px-4 text-white text-lg"
                    value={emailOrPhone}
                    onChange={(e) => {
                      setEmailOrPhone(e.target.value);
                    }}
                    type={type === "Email" ? "email" : "tel"}
                  />
                  {isInputInvalid && (
                    <div className="pl-4 text-pink">Invalid email address</div>
                  )}
                </div>
              </div>
              <OutlineButton
                type="submit"
                onClick={(e) => {
                  void handleSubmit(e);
                }}
                text="Continue"
                className="py-3"
              />
            </form>
          </div>
        ) : (
          <div className="flex flex-col gap-2 ">
            <div className="text-off-white text-center">External Wallet</div>
            <FilledButton
              onClick={openConneckitModal}
              text={
                <div className="flex items-center gap-4 justify-center flex-wrap-reverse">
                  <WalletLogos />
                  <div>Continue with Wallet</div>
                </div>
              }
              className="py-3"
            />
          </div>
        )}
      </div>
    </GenericModal>
  );
};

const WalletLogos: React.FC = () => {
  const [currentIconIndex, setCurrentIconIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prevIndex) =>
        prevIndex === icons.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);
    return () => clearInterval(interval);
  }, [icons.length]);

  return (
    <div className="relative h-[32px] w-[32px] overflow-hidden">
      {icons.map((Icon, index) => (
        <div
          key={index}
          style={{
            opacity: currentIconIndex === index ? 1 : 0,
            position: "absolute",
            top: currentIconIndex === index ? 0 : "10px",
            transition: "all 1s",
          }}
        >
          {Icon}
        </div>
      ))}
    </div>
  );
};
