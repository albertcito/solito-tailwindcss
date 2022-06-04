import { FC, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';

const NavigationProvider: FC = ({ children }) => (
  <NavigationContainer
    linking={useMemo(
      () => ({
        prefixes: [Linking.createURL('/')],
        config: {
          initialRouteName: 'articles',
          screens: {
            articles: '',
            article: 'articles/:slug',
            audios: 'audios',
            audio: 'audios/:slug',
          },
        },
      }),
      [],
    )}
  >
    {children}
  </NavigationContainer>
);

export default NavigationProvider;
