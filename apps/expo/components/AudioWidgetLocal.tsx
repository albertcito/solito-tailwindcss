import { View } from 'react-native';

import AudioWidget from 'app/components/AudioWidget';
import useAudioProvider from 'app/hooks/audio/useAudioProvider';

function AudioWidgetLocal() {
  const {
    data,
  } = useAudioProvider();

  return (
    <View className="bg-red-50 h-16 absolute bottom-20 z-10 w-full">
      {data && (
        <AudioWidget {...data} />
      )}
    </View>
  );
}

export default AudioWidgetLocal;
