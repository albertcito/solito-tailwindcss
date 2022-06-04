import { initUrqlClient, withUrqlClient as withUrqlClientBase } from 'next-urql';
import {
  ssrExchange, dedupExchange, cacheExchange, fetchExchange, Client,
} from 'urql';

import vars from './env';

const ssrCache = ssrExchange({ isClient: false });
const ssrClient = initUrqlClient({
  url: vars.graphqlURL,
  exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
}, false) as Client;

export default ssrClient;

export const withUrqlClient = withUrqlClientBase(
  () => ({ url: vars.graphqlURL }),
  { ssr: false }, // Important so we don't wrap our component in getInitialProps
);
