import { useEffect, useState, useCallback } from 'react';
import audioPositionPercent from './audioPositionPercent';

import useAudioGlobal from './useAudioProvider';

const useAudioTime = () => {
  const { audio, duration, error } = useAudioGlobal();

  const [playing, setPlaying] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(0);
  const [didJustFinish, setDidJustFinish] = useState<boolean>();
  const [percent, setPercent] = useState<number>(0);

  useEffect(() => {
    setPercent(audioPositionPercent(duration, position));
  }, [duration, position]);

  useEffect(() => {
    if (didJustFinish && audio) {
      audio.sound.stopAsync();
    }
  }, [didJustFinish, audio]);

  useEffect(() => {
    audio?.sound.setOnPlaybackStatusUpdate((status) => {
      if ('durationMillis' in status) {
        setPlaying(status.isPlaying);
        setPosition(status.positionMillis);
        setDidJustFinish(status.didJustFinish);
      }
    });
  }, [audio]);

  const forward = useCallback((time = 3000) => {
    if (
      audio
      && audio?.sound
      && audio?.status.isLoaded) {
      audio?.sound.setPositionAsync(position + time);
    }
  }, [audio, position]);

  const isCurrentAudio = useCallback((url: string) => audio?.status.uri === url, [audio]);

  const getAudioStatus = useCallback(
    (url?: string) => (
      url && isCurrentAudio(url)
        ? { percent, playing, error }
        : { percent: 0, playing: false, error: undefined }),
    [isCurrentAudio, percent, playing, error],
  );

  return {
    forward,
    percent,
    getAudioStatus,
  };
};

export default useAudioTime;
