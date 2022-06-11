import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { useEffect, useState, useCallback } from 'react';

import audioPositionPercent from './audioPositionPercent';
import { useGlobalProvider } from '../global/useGlobalProvider';
import useAudioGlobal from './useAudioProvider';
import AudioList from './AudioList';

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
    setData, downloadAudio, isLoading, error,
  } = useAudioGlobal();

  const [playing, setPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
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

  const loadAndPlayNewSong = useCallback(async (url: string) => {
    setData({
      artist: 'albert',
      album: 'jamon',
      image: 'https://noseconformen.com/wp-content/uploads/2022/03/support-ucrania-stop-putin-768x576.jpg',
      slug: url,
      audioURL: url,
      duration: 4500,
    });
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
      list.stopAudio();
    }
  }, [downloadAudio, setData]);

  const play = useCallback(async (url: string) => {
    setAudioLoaded(true);
    if (!list.isCurrentAudio(url) || !list.getCurrentAudio()?.status.isLoaded) {
      loadAndPlayNewSong(url);
    } else {
      list.tooglePlay(playing);
    }
  }, [loadAndPlayNewSong, playing, setAudioLoaded]);

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
