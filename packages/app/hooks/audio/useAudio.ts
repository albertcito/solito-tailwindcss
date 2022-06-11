import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { useState, useCallback } from 'react';
import { useMutation } from 'react-query';
// eslint-disable-next-line import/no-named-as-default
import useGlobalProvider from '../global/useGlobalProvider';
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
  // if (__DEV__) {
  // eslint-disable-next-line no-console
  console.error(error);
  // }
}

let currentAudio = '';
const sounds : Record<string, LoadAudioSuccess> = {};
export interface AudioExtra {
  artist?: string;
  album?: string;
}

const useAudio = () => {
  const { setAudioLoaded } = useGlobalProvider();

  const {
    mutateAsync: downloadAudio, isLoading, error,
  } = useMutation<LoadAudioSuccess, AudioErrorResponse, string>(
    'useAudioMutation',
    (url) => loadAudio(url),
  );

  const [audio, setAudio] = useState<LoadAudioSuccess>();
  const [slug, setSlug] = useState<string>('');
  const [metaData, setMetaData] = useState<AudioExtra>({});
  const [duration, setDuration] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);

  const tooglePlay = async () => {
    const audioLoaded = sounds[currentAudio];
    if (audioLoaded) {
      if (playing) {
        await audioLoaded.sound.pauseAsync();
      } else {
        await audioLoaded.sound.playAsync();
      }
    }
  };

  const removeAudio = async (audioLoaded?: LoadAudioSuccess) => {
    if (audioLoaded) {
      await audioLoaded.sound.stopAsync();
      audioLoaded.sound.unloadAsync();
    }
  };

  const forward = useCallback((time = 3000) => {
    if (
      sounds[currentAudio]
      && sounds[currentAudio]?.sound
      && sounds[currentAudio]?.status.isLoaded) {
      sounds[currentAudio]?.sound.setPositionAsync(position + time);
    }
  }, [position]);

  const loadAndPlayNewSong = async (newURL: string, newSlug: string) => {
    removeAudio(sounds[currentAudio]);
    currentAudio = newURL;
    const audioLoaded = await downloadAudio(newURL);
    // download audio could take a time
    // so the new current song is other
    // because user clicks other song and it was loaded faster
    if (currentAudio === newURL) {
      await audioLoaded.sound.playAsync();
      setAudio(audioLoaded);
      setSlug(newSlug);
      setDuration(audioLoaded.status.durationMillis ?? 0);
      setPlaying(audioLoaded.status.isPlaying);
      setPosition(audioLoaded.status.positionMillis);
      sounds[audioLoaded.status.uri] = audioLoaded;
    } else {
      removeAudio(audio);
    }
  };

  const play = async (url: string, newSlug: string, audioExtra: AudioExtra = {}) => {
    setMetaData(audioExtra);
    setAudioLoaded(true);
    if (url !== currentAudio || !sounds[currentAudio]?.sound) {
      loadAndPlayNewSong(url, newSlug);
    } else {
      tooglePlay();
    }
  };

  const isCurrentAudio = useCallback((url: string) => currentAudio === url, []);

  return {
    play,
    slug,
    error,
    metaData,
    tooglePlay,
    isLoading,
    playing,
    isCurrentAudio,
    forward,
    setSlug,
    setMetaData,
    duration,
    audio,
  };
};

export default useAudio;
