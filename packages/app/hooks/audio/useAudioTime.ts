import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { useEffect, useState, useCallback } from 'react';

import audioPositionPercent from './audioPositionPercent';
import { useGlobalProvider } from '../global/useGlobalProvider';
import useAudioGlobal from './useAudioProvider';
import { LoadAudioSuccess } from './loadAudio';
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

let audioURL = '';
const audios : Record<string, LoadAudioSuccess> = {};

const removeWhenDidJustFinish = async (didJustFinish?: boolean) => {
  const audio = audios[audioURL];
  if (audio && didJustFinish) {
    await audio.sound.stopAsync();
    audio.sound.unloadAsync();
  }
};

const tooglePlay = async (playing: boolean) => {
  const audioLoaded = audios[audioURL];
  if (audioLoaded) {
    if (playing) {
      await audioLoaded.sound.pauseAsync();
    } else {
      await audioLoaded.sound.playAsync();
    }
  }
};

const setAudioPosition = (position: number, time = 3000) => {
  const audio = audios[audioURL];
  if (
    audio
    && audio.sound
    && audio.status.isLoaded
  ) {
    audio.sound.setPositionAsync(position + time);
  }
};

const stopAudio = async (audioLoaded?: LoadAudioSuccess) => {
  if (audioLoaded) {
    await audioLoaded.sound.stopAsync();
  }
};

const isCurrentAudio = (url: string) => audioURL === url;

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

  useEffect(() => { removeWhenDidJustFinish(didJustFinish); }, [didJustFinish]);

  const forward = useCallback((time = 3000) => setAudioPosition(position, time), [position]);

  const loadAndPlayNewSong = useCallback(async (URL: string) => {
    setData({
      artist: 'albert',
      album: 'jamon',
      image: 'https://noseconformen.com/wp-content/uploads/2022/03/support-ucrania-stop-putin-768x576.jpg',
      slug: audioURL,
      audioURL,
      duration: 4500,
    });
    stopAudio(audios[audioURL]);
    audioURL = URL;
    const audioLoaded = await downloadAudio(audioURL);
    // download audio could take a time
    // so the new current song is other
    // because user clicks other song and it was loaded faster
    if (audioURL === URL) {
      await audioLoaded.sound.playAsync();
      setDuration(audioLoaded.status.durationMillis ?? 0);
      setPlaying(audioLoaded.status.isPlaying);
      setPosition(audioLoaded.status.positionMillis);
      audios[audioLoaded.status.uri] = audioLoaded;
      audioLoaded.sound.setOnPlaybackStatusUpdate((status) => {
        if ('durationMillis' in status) {
          setPlaying(status.isPlaying);
          setPosition(status.positionMillis);
          setDidJustFinish(status.didJustFinish);
        }
      });
    } else {
      stopAudio(audios[audioURL]);
    }
  }, [downloadAudio, setData]);

  const play = useCallback(async (url: string) => {
    setAudioLoaded(true);
    if (url !== audioURL || !audios[audioURL]?.status.isLoaded) {
      loadAndPlayNewSong(url);
    } else {
      tooglePlay(playing);
    }
  }, [loadAndPlayNewSong, playing, setAudioLoaded]);

  const getAudioStatus = useCallback(
    (url?: string) => (
      url && isCurrentAudio(url)
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
