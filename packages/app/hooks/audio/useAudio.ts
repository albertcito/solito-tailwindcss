import { useState, useCallback } from 'react';
import { useMutation } from 'react-query';

import loadAudio, { AudioErrorResponse, LoadAudioSuccess } from './loadAudio';

export interface AudioData {
  album: string;
  artist?: string;
  slug: string;
  image: string;
  audioURL: string;
  duration: number;
}

const useAudio = () => {
  const {
    mutateAsync: downloadAudio, isLoading, error,
  } = useMutation<LoadAudioSuccess, AudioErrorResponse, string>(
    'useAudioMutation',
    (url) => loadAudio(url),
  );
  const [data, setData] = useState<AudioData>();
  const isCurrentAudio = useCallback((url: string) => data?.slug === url, [data?.slug]);

  return {
    isCurrentAudio,
    setData,
    downloadAudio,
    isLoading,
    error,
    data,
  };
};

export default useAudio;
