import Provider from 'app/provider';
import { createClient, Provider as URQL } from 'urql';
// eslint-disable-next-line camelcase
import { useFonts, PTSerif_400Regular, PTSerif_700Bold } from '@expo-google-fonts/pt-serif';
import { View, Text } from 'react-native';
import NavigationMenu from './navigation';

const client = createClient({
  url: 'https://noseconformen.com/index.php?graphql',
});

export default function App() {
  const [fontsLoaded] = useFonts({
    // eslint-disable-next-line camelcase
    PTSerif_400Regular, PTSerif_700Bold,
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
        <NavigationMenu />
      </Provider>
    </URQL>
  );
}
