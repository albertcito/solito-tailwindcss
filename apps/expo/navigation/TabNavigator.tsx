import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { NativeNavigationPosts, NativeNavigationAudios } from './StackNavigator';

const Tab = createBottomTabNavigator<{
  posts: undefined
  podcasts: undefined
}>();

const HomeIcon = ({ focused, color, size }) => (
  <MaterialCommunityIcons
    name="post-outline"
    size={size}
    color={focused ? color : 'gray'}
  />
);

interface TabNavigatorProps {
  paddingBottom?: number
}

export default function TabNavigator({ paddingBottom }: TabNavigatorProps) {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
      sceneContainerStyle={{ paddingBottom }}
    >
      <Tab.Screen
        name="posts"
        component={NativeNavigationPosts}
        options={{ tabBarIcon: HomeIcon }}
      />
      <Tab.Screen
        name="podcasts"
        component={NativeNavigationAudios}
        options={{ tabBarIcon: HomeIcon }}
      />
    </Tab.Navigator>
  );
}
