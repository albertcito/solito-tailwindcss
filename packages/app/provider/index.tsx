import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { TailwindProvider } from 'tailwindcss-react-native';
import NavigationProvider from './navigation';
import { AudioProvider } from '../hooks/audio/useAudioProvider';
import { GlobalProvider } from '../hooks/global/useGlobalProvider';
import SafeAreaProvider from './safe-area';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: false,
      refetchIntervalInBackground: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const Provider: FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <SafeAreaProvider>
      <GlobalProvider>
        <AudioProvider>
          <NavigationProvider>
            <TailwindProvider>
              {children}
            </TailwindProvider>
          </NavigationProvider>
        </AudioProvider>
      </GlobalProvider>
    </SafeAreaProvider>
  </QueryClientProvider>
);

export default Provider;
