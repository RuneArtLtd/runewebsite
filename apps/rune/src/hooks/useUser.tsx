import { useMemo } from "react";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { type Me } from "@/pages/api/user/me";

export const useUser = () => {
  const { data, isLoading, mutate } = useSWR("/api/user/me", fetcher);

  return useMemo(() => {
    return {
      user: (data as Me)?.user,
      isLoading,
      mutate,
    };
  }, [data, isLoading, mutate]);
};
