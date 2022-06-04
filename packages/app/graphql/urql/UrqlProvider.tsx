import { FC, useMemo } from 'react';
import {
  createClient,
  dedupExchange,
  debugExchange,
  cacheExchange,
  Provider,
} from 'urql';

// import cacheExchange from './cacheExchange/cacheExchange';

type UrqlProviderProps = {
  url: string;
};

const UrqlProvider: FC<UrqlProviderProps> = ({ children, url }) => {
  const client = createClient({
    url,
    exchanges: [
      // devtoolsExchange,
      debugExchange,
      dedupExchange,
      cacheExchange,
      // multipartFetchExchange,
    ],
  });
  console.log(client);

  return (
    <Provider value={client}>
      {children}
    </Provider>
  );
};

export default UrqlProvider;
