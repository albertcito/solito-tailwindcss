import { createContext, useContext, FC } from 'react';

import useAudio from './useAudio';

export const AudioProviderContext = createContext({} as ReturnType<typeof useAudio>);

export const useAudioProvider = () => useContext(AudioProviderContext);

export default useAudioProvider;

export const AudioProvider: FC = ({ children }) => {
  const values = useAudio();
  return (
    <AudioProviderContext.Provider value={values}>
      {children}
    </AudioProviderContext.Provider>
  );
};
