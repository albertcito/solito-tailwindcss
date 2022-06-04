import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { useEffect, useState, useCallback } from 'react';
import { useMutation } from 'react-query';
import useGlobalProvider from '../global/useGlobalProvider';
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
  console.log(error);
}

let currentAudio = '';
const sounds : Record<string, LoadAudioSuccess> = {};
interface AudioExtra {
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

  const [slug, setSlug] = useState<string>('');
  const [metaData, setMetaData] = useState<AudioExtra>({});
  const [duration, setDuration] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);
  const [didJustFinish, setDidJustFinish] = useState<boolean>();
  const [percent, setPercent] = useState<number>(0);

  useEffect(() => {
    setPercent(audioPositionPercent(duration, position));
  }, [duration, position]);

  const tooglePlay = async () => {
    const audio = sounds[currentAudio];
    if (audio) {
      if (playing) {
        await audio.sound.pauseAsync();
      } else {
        await audio.sound.playAsync();
      }
    }
  };

  useEffect(() => {
    const audio = sounds[currentAudio];
    if (didJustFinish && audio) {
      audio.sound.stopAsync();
    }
  }, [didJustFinish]);

  const loadStatusSong = (newSound: LoadAudioSuccess) => {
    setDuration(newSound.status.durationMillis ?? 0);
    setPlaying(newSound.status.isPlaying);
    setPosition(newSound.status.positionMillis);
    setDidJustFinish(newSound.status.didJustFinish);

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

  const forward = (time = 3000) => {
    if (
      sounds[currentAudio]
      && sounds[currentAudio]?.sound
      && sounds[currentAudio]?.status.isLoaded) {
      sounds[currentAudio]?.sound.setPositionAsync(position + time);
    }
  };

  const loadAndPlayNewSong = async (newURL: string, newSlug: string) => {
    removeAudio(sounds[currentAudio]);
    currentAudio = newURL;
    const audio = await downloadAudio(newURL);
    // download audio could take a time
    // so the new current song is other
    // because user clicks other song and it was loaded faster
    if (currentAudio === newURL) {
      await audio.sound.playAsync();
      loadStatusSong(audio);
      setSlug(newSlug);
      sounds[audio.status.uri] = audio;
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

  const getAudioStatus = useCallback(
    (url?: string) => (
      url && isCurrentAudio(url)
        ? { percent, playing }
        : { percent: 0, playing: false }),
    [isCurrentAudio, percent, playing],
  );

  return {
    play,
    slug,
    error,
    metaData,
    tooglePlay,
    isLoading,
    percent,
    playing,
    getAudioStatus,
    isCurrentAudio,
    forward,
  };
};

export default useAudio;
