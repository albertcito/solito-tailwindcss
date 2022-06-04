import { useState } from 'react';

const useGlobal = () => {
  const [audioLoaded, setAudioLoaded] = useState(false);
  return {
    audioLoaded,
    setAudioLoaded,
  };
};

export default useGlobal;
