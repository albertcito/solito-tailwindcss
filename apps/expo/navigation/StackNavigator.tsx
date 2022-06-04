import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from '../pages/index'
import UserDetailScreen from '../pages/[slug]'
import Audios from '../pages/podcasts';
import Audio from '../pages/podcasts/[slug]';

const Stack = createNativeStackNavigator<{
  home: undefined
  'article': {
    slug: string
  }
  audios: undefined;
  audio: { id: string };
}>()

export function NativeNavigationPosts() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="article"
        component={UserDetailScreen}
        options={{
          title: 'User',
        }}
      />
    </Stack.Navigator>
  )
}

export function NativeNavigationAudios() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="audios"
        component={Audios}
        options={{
          title: 'Audios',
        }}
      />
      <Stack.Screen
        name="audio"
        component={Audio}
        options={{
          title: 'Audio',
        }}
      />
    </Stack.Navigator>
  );
}
