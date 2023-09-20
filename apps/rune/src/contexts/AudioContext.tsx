"use client";
import {
  type ReactNode,
  createContext,
  useContext,
  useState,
  useRef,
} from "react";

interface AudioContextType {
  isPlaying: boolean;
  handlePlay: () => void;
  handlePause: () => void;
}

const AudioContext = createContext<AudioContextType>({
  isPlaying: false,
  handlePlay: () => undefined,
  handlePause: () => undefined,
});

export const AudioWrapper = ({ children }: { children: ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    void audioRef?.current?.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    void audioRef?.current?.pause();
    setIsPlaying(false);
  };

  const settings = {
    isPlaying,
    handlePlay,
    handlePause,
  };

  return (
    <AudioContext.Provider value={settings}>
      {children}
      <audio
        ref={audioRef}
        id="audio-player"
        src={"/audio/theme-song.mp3"}
        autoPlay={false}
        hidden={true}
      />
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => {
  return useContext(AudioContext);
};
