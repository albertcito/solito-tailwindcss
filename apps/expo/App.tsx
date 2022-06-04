import { View, Text } from 'react-native';
import { NativeNavigation } from './navigation'
import { Provider } from 'app/provider'
import { createClient, Provider as URQL } from 'urql';
import { useFonts, PTSerif_400Regular, PTSerif_700Bold } from '@expo-google-fonts/pt-serif';

const client = createClient({
  url: 'https://noseconformen.com/index.php?graphql',
});

export default function App() {
  const [fontsLoaded] = useFonts({
    PTSerif_400Regular,
    PTSerif_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <Provider>
        <View>
          <Text>Loading font....</Text>
        </View>
      </Provider>
    );
  }
  return (
    <URQL value={client}>
      <Provider>
        <NativeNavigation />
      </Provider>
    </URQL>
  )
}
