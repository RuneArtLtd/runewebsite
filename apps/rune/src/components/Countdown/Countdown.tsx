import { formatTime } from "@/utils/time";
import { useEffect } from "react";
import { useCountdown } from "usehooks-ts";
import { FilledButton } from "../Buttons/FilledButton";
import Link from "next/link";
import { useNextMintTime } from "../../hooks/useNextMintTime";

export const CountDown = ({ className }: { className?: string }) => {
  const { nextMintTime } = useNextMintTime();
  const [count, { startCountdown, resetCountdown }] = useCountdown({
    countStart: nextMintTime,
    intervalMs: 1000,
  });

  useEffect(() => {
    startCountdown();
  }, [nextMintTime]);

  useEffect(() => {
    if (count < 0) {
      resetCountdown();
      startCountdown();
    }
  }, [count]);

  if (count <= 0 || nextMintTime <= 0) {
    return (
      <Link href="/mint">
        <FilledButton text="Go On Quest" />
      </Link>
    );
  }

  return (
    <div
      className={`transition-all min-h-full w-fit gap-2 rounded-full bg-card-bg  px-6 py-2 flex items-center flex-wrap text-[18px] md:text-[28px] ${
        className || ""
      }`}
    >
      <div className="text-[#FFFFFF80]">Time remaining till quest:</div>
      <div>{formatTime(count)}</div>
    </div>
  );
};
