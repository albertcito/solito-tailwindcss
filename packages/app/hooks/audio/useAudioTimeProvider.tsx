import { createContext, useContext, FC } from 'react';

import useAudioTime from './useAudioTime';

export const AudioTimeProviderContext = createContext({} as ReturnType<typeof useAudioTime>);

export const useAudioTimeProvider = () => useContext(AudioTimeProviderContext);

export default useAudioTimeProvider;

export const AudioTimeProvider: FC = ({ children }) => {
  const values = useAudioTime();
  return (
    <AudioTimeProviderContext.Provider value={values}>
      {children}
    </AudioTimeProviderContext.Provider>
  );
};
