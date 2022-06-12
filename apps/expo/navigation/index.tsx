import { View, Text } from 'react-native';

import useGlobalProvider from 'app/hooks/global/useGlobalProvider';
import useSafeArea from 'app/provider/safe-area/use-safe-area';
import AudioWidgetLocal from '../components/AudioWidgetLocal';
import TabNavigator from './TabNavigator';

const GlobalComponent = () => {
  const { audioLoaded } = useGlobalProvider();
  const insets = useSafeArea();
  return (
    <>
      {(insets.top > 0) && (
        <View className=" bg-black/50 h-12 absolute w-full top-0 z-10" />
      )}
      <Text className=" bg-black/50 h-12 absolute w-full bottom-20 z-10">
        {audioLoaded ? 'true' : 'false '}
      </Text>
      {audioLoaded && (
        <AudioWidgetLocal />
      )}
    </>
  );
};

export default function MyTabs() {
  return (
    <View className="flex-1 h-full flex-direction-column">
      <GlobalComponent />
      <TabNavigator />
    </View>
  );
}
