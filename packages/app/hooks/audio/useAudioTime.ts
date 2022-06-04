import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { useEffect, useState, useCallback } from 'react';
import { useMutation } from 'react-query';
import audioPositionPercent from './audioPositionPercent';
import loadAudio, { LoadAudioSuccess, AudioErrorResponse } from './loadAudio';

try {
  Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    staysActiveInBackground: true,
    interruptionModeIOS: InterruptionModeIOS.DuckOthers,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
    playThroughEarpieceAndroid: false,
  });
} catch (error) {
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

let currentAudio = '';
const sounds : Record<string, LoadAudioSuccess> = {};

const useAudioTime = () => {
  const {
    mutateAsync: downloadAudio, isLoading, error,
  } = useMutation<LoadAudioSuccess, AudioErrorResponse, string>(
    'useAudioMutation',
    (url) => loadAudio(url),
  );

  const [duration, setDuration] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(0);
  const [didJustFinish, setDidJustFinish] = useState<boolean>();
  const [percent, setPercent] = useState<number>(0);

  useEffect(() => {
    setPercent(audioPositionPercent(duration, position));
  }, [duration, position]);

  useEffect(() => {
    const audio = sounds[currentAudio];
    if (didJustFinish && audio) {
      audio.sound.stopAsync();
    }
  }, [didJustFinish]);

  const loadStatusSong = (newSound: LoadAudioSuccess) => {
    setDuration(newSound.status.durationMillis ?? 0);
    newSound.sound.setOnPlaybackStatusUpdate((status) => {
      if ('durationMillis' in status) {
        setPlaying(status.isPlaying);
        setPosition(status.positionMillis);
        setDidJustFinish(status.didJustFinish);
      }
    });
  };

  const removeAudio = async (audio?: LoadAudioSuccess) => {
    if (audio) {
      await audio.sound.stopAsync();
      audio.sound.unloadAsync();
    }
  };

  const play = async (newURL: string) => {
    removeAudio(sounds[currentAudio]);
    currentAudio = newURL;
    const audio = await downloadAudio(newURL);
    // download audio could take a time
    // so the new current song is other
    // because user clicks other song and it was loaded faster
    if (currentAudio === newURL) {
      await audio.sound.playAsync();
      loadStatusSong(audio);
      sounds[audio.status.uri] = audio;
    } else {
      removeAudio(audio);
    }
  };

  const isCurrentAudio = useCallback((url: string) => currentAudio === url, []);

  const getAudioStatus = useCallback(
    (url?: string) => (
      url && isCurrentAudio(url)
        ? { percent, playing }
        : { percent: 0, playing: false }),
    [isCurrentAudio, percent, playing],
  );

  return {
    play,
    error,
    isLoading,
    percent,
    getAudioStatus,
  };
};

export default useAudioTime;
