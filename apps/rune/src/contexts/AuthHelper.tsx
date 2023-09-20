import { useEffect, type ReactNode } from "react";
import { useAccount } from "wagmi";
import { useSIWE } from "connectkit";
import axios from "axios";
import { useUser } from "../hooks/useUser";

export const AuthHelper = ({ children }: { children: ReactNode }) => {
  const { signIn, isSignedIn } = useSIWE();
  useAccount({
    onConnect() {
      try {
        if (!isSignedIn) {
          void signIn();
        }
      } catch (error) {
        console.log("SIWE error", error);
      }
    },
  });
  const { user, mutate } = useUser();

  useEffect(() => {
    if (isSignedIn && !user) {
      void handleSignIn();
    }
  }, [isSignedIn, user]);

  const handleSignIn = async () => {
    try {
      await axios.post("/api/user/login");
      await mutate();
    } catch (error) {
      console.log("Signin error", error);
    }
  };

  return <>{children}</>;
};
