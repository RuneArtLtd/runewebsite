"use client";
import { OutlineButton } from "../../components/Buttons/OutlineButton";
import { GenericCard } from "../../components/Cards/GenericCard";
import { NFTCard } from "../../components/Cards/NFTCard";
import { useAccount } from "wagmi";
import { useSIWE } from "connectkit";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useUser } from "../../hooks/useUser";
import Image from "next/image";
import { Spinner } from "../../components/Loaders/Spinner";
import axios from "axios";
import { Edit } from "../../components/Icons/Edit";
import { Reset } from "../../components/Icons/Reset";
import { CountDown } from "../../components/Countdown/Countdown";
import { useTokenHoldings } from "../../hooks/useTokenHoldings";
import Link from "next/link";
import { FilledButton } from "../../components/Buttons/FilledButton";

const defaultImage = "/images/default-profile-picture.png";

export default function ProfilePage() {
  const { address } = useAccount();
  const { isSignedIn } = useSIWE();
  const router = useRouter();
  const { user, isLoading, mutate } = useUser();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [newUsername, setNewUsername] = useState<string>("");
  const [newProfilePicture, setNewProfilePicture] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { tokenHoldings } = useTokenHoldings();

  const filteredHoldings = useMemo(() => {
    return tokenHoldings?.filter((x) => x.amount > 0);
  }, [tokenHoldings]);

  useEffect(() => {
    if (!isSignedIn) {
      void router.push("/");
    }
  }, [isSignedIn]);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleEditProfile = async () => {
    if (!isEditMode) {
      toggleEditMode();
    } else {
      if (newUsername.trim() !== user?.username || newProfilePicture) {
        await updateProfilePicture();
      }
      toggleEditMode();
    }
  };

  const updateProfilePicture = async () => {
    try {
      setIsSaving(true);
      await saveData();
      await mutate();
      setNewProfilePicture("");
      setNewUsername("");
      setIsSaving(false);
    } catch (error) {
      setIsSaving(false);
    }
  };

  const saveData = async () => {
    try {
      await axios.post("/api/user/update", {
        username: newUsername.trim(),
        profile_picture: newProfilePicture,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChooseProfileImage = () => {
    if (isEditMode) {
      inputRef.current?.click();
    }
  };

  const handleFileSelected = async (file?: File) => {
    if (!file) return;
    if (file.size > 1000000) {
      alert("File size must be less than 1MB");
      return;
    }
    try {
      setIsUploading(true);
      const res = await axios.get(`/api/upload-url?fileName=${file.name}`);

      const { uploadUrl, uniqueFileName } = res?.data;
      const { fields, url } = uploadUrl;
      const formData = new FormData();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      Object.entries({ ...fields, file }).forEach(([key, value]) => {
        formData.append(key, value as string | Blob);
      });

      await axios.post(url as string, formData, {
        headers: {
          Accept: "multipart/form-data",
          "Content-Type": "multipart/form-data",
        },
      });

      setNewProfilePicture(
        `https://d200w6x3hyri2y.cloudfront.net/${uniqueFileName as string}`
      );
      setIsUploading(false);
    } catch (error) {
      setIsUploading(true);
      console.log(error);
      setNewProfilePicture("");
    }
  };

  const resetProfileImage = () => {
    setNewProfilePicture(defaultImage);
  };

  if (!isSignedIn) return null;
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <Spinner />
      </div>
    );
  return (
    <div className="flex flex-col gap-16 pb-10">
      <section className="flex sm:mt-8 pt-24 pb-4 flex-col gap-4 items-center text-center justify-between">
        <div className="relative">
          <Image
            src={newProfilePicture || user?.profile_picture}
            width={200}
            height={200}
            alt="profile picture"
            className={`w-[200px] h-[200px] rounded-full shadow-profile-picture object-center p-2 ${
              newProfilePicture === defaultImage ||
              user?.profile_picture === defaultImage
                ? "object-contain"
                : "object-cover"
            } ${isEditMode ? "cursor-pointer" : "cursor-default"}
            ${isUploading ? "animate-pulse-fast" : ""}
            `}
            style={{
              background: "linear-gradient(135deg, #F7EAFF 0%, #624276 100%)",
            }}
            priority
            loading="eager"
            draggable={false}
            onClick={handleChooseProfileImage}
          />
          {isEditMode && (
            <>
              <input
                ref={inputRef}
                type="file"
                onChange={(event) => {
                  void handleFileSelected(event.target.files?.[0]);
                }}
                accept="image/png, image/jpeg, image/jpg"
                className="hidden"
              />

              <div className="absolute flex items-center gap-2 bottom-0 -right-10 cursor-pointer">
                <div
                  onClick={handleChooseProfileImage}
                  className="bg-magenta rounded-full flex items-center justify-center p-2 hover:opacity-80"
                >
                  <Edit />
                </div>
                <div
                  onClick={resetProfileImage}
                  className="bg-purple rounded-full flex items-center justify-center p-2 hover:opacity-80"
                >
                  <Reset />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex flex-col">
          {!isEditMode ? (
            <div className="text-[28px] font-[700] md:text-[60px]">
              {user?.username}
            </div>
          ) : (
            <input
              className="text-[28px] font-[700] md:text-[60px] bg-[#00000000] text-center border border-3 backdrop-blur-md rounded-md border-[#624276]"
              value={newUsername || user?.username}
              onChange={(e) => setNewUsername(e.target.value)}
              maxLength={15}
            />
          )}
          <div className="text-[16px] font-[400] md:text-[32px]">
            {address && address.slice(0, 6) + "..." + address.slice(-4)}
          </div>
        </div>
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <OutlineButton
            text={
              isEditMode && isSaving
                ? "Saving..."
                : isEditMode
                ? "Save"
                : "Edit Profile"
            }
            className={`uppercase ${isSaving ? "opacity-50" : "opacity-100"} `}
            disabled={isSaving}
            onClick={() => void handleEditProfile()}
          />
          <Link href="/">
            <FilledButton text="Home" />
          </Link>
        </div>
        <div className="pt-4">
          <CountDown />
        </div>
      </section>

      <section className="flex flex-col lg:flex-row gap-8 text-center justify-center mx-auto">
        <GenericCard title="Inventory">
          <div className="flex flex-wrap gap-8 justify-center px-6 sm:px-12">
            {filteredHoldings?.length > 0 ? (
              filteredHoldings?.map((token, index) => (
                <NFTCard
                  key={index}
                  imageUrl={token.imageAsset}
                  count={token.amount}
                />
              ))
            ) : (
              <div className="sm:min-w-[300px] text-off-white text-lg">
                Inventory Empty
              </div>
            )}
          </div>
        </GenericCard>
      </section>
    </div>
  );
}
