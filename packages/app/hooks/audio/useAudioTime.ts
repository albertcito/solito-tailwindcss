import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { useEffect, useState, useCallback } from 'react';

import audioPositionPercent from './audioPositionPercent';
import { useGlobalProvider } from '../global/useGlobalProvider';
import useAudioGlobal from './useAudioProvider';
import AudioList from './AudioList';
import { AudioData } from './useAudio';

const list = new AudioList();

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

const useAudioTime = () => {
  const { setAudioLoaded } = useGlobalProvider();
  const {
    downloadAudio, isLoading, error, setData,
  } = useAudioGlobal();

  const [duration, setDuration] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(0);
  const [didJustFinish, setDidJustFinish] = useState<boolean>();
  const [percent, setPercent] = useState<number>(0);

  useEffect(() => {
    setPercent(audioPositionPercent(duration, position));
  }, [duration, position]);

  useEffect(() => {
    list.removeWhenDidJustFinish(didJustFinish);
  }, [didJustFinish]);

  const forward = useCallback(
    (time = 3000) => list.setAudioPosition(position, time),
    [position],
  );

  const playSong = useCallback(async (url: string) => {
    const audioLoaded = await list.loadAudio(url, () => downloadAudio(url));
    // download audio could take a time
    // so the new current song is other
    // because user clicks other song and it was loaded faster
    if (list.isCurrentAudio(url)) {
      await audioLoaded.sound.playAsync();
      setDuration(audioLoaded.status.durationMillis ?? 0);
      setPlaying(audioLoaded.status.isPlaying);
      setPosition(audioLoaded.status.positionMillis);
      audioLoaded.sound.setOnPlaybackStatusUpdate((status) => {
        if ('durationMillis' in status) {
          setPlaying(status.isPlaying);
          setPosition(status.positionMillis);
          setDidJustFinish(status.didJustFinish);
        }
      });
    } else {
      list.pauseAudio();
    }
  }, [downloadAudio]);

  const play = useCallback(async (url: string, data: AudioData) => {
    setAudioLoaded(true);
    if (list.isCurrentAudio(url)) {
      list.tooglePlay(playing);
    } else {
      setData(data);
      playSong(url);
    }
  }, [playSong, playing, setAudioLoaded, setData]);

  const getAudioStatus = useCallback(
    (url?: string) => (
      url && list.isCurrentAudio(url)
        ? { percent, playing, error }
        : { percent: 0, playing: false, error: undefined }),
    [percent, playing, error],
  );

  return {
    play,
    playing,
    forward,
    percent,
    getAudioStatus,
    isLoading,
  };
};

export default useAudioTime;
