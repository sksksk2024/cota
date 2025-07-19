import { useEffect, useState } from 'react';

export const useSound = (src: string, volume = 1) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audioObj = new Audio(src);
    audioObj.volume = volume;
    setAudio(audioObj);

    return () => {
      if (audioObj) {
        audioObj.pause();
        audioObj.currentTime = 0;
        audioObj.autoplay = true;
      }
    };
  }, [src, volume]);

  const play = () => {
    if (audio) {
      audio.currentTime = 0; // Resetează la început dacă e deja redat
      audio.play().catch((e) => console.error('Audio playback failed:', e));
    }
  };

  return { play };
};
