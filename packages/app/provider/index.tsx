import { QueryClient, QueryClientProvider } from 'react-query';
import { Dripsy } from './dripsy'
import { NavigationProvider } from './navigation'
import { TailwindProvider } from "tailwindcss-react-native";
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

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <GlobalProvider>
          <AudioProvider>
            <NavigationProvider>
              <TailwindProvider>
              <Dripsy>{children}</Dripsy>
              </TailwindProvider>
            </NavigationProvider>
          </AudioProvider>
        </GlobalProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

