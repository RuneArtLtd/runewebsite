import { Play } from "../Icons/Play";
import { Pause } from "../Icons/Pause";
import { useAudioContext } from "@/contexts/AudioContext";

export const Audio = () => {
  const { isPlaying, handlePause, handlePlay } = useAudioContext();
  return (
    <div>
      {isPlaying ? (
        <button onClick={handlePause}>
          <Pause />
        </button>
      ) : (
        <button onClick={handlePlay}>
          <Play />
        </button>
      )}
    </div>
  );
};
