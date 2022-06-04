import { createContext, useContext, FC } from 'react';

import useGlobal from './useGlobal';

export const GlobalProviderContext = createContext({} as ReturnType<typeof useGlobal>);

export const useGlobalProvider = () => useContext(GlobalProviderContext);

export default useGlobalProvider;

export const GlobalProvider: FC = ({ children }) => {
  const values = useGlobal();
  return (
    <GlobalProviderContext.Provider value={values}>
      {children}
    </GlobalProviderContext.Provider>
  );
};
