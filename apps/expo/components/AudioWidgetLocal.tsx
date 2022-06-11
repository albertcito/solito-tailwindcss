import { View } from 'react-native';

import AudioWidget from 'app/components/AudioWidget';
import useAudioProvider from 'app/hooks/audio/useAudioProvider';
import useAudioTime from 'app/hooks/audio/useAudioTimeProvider';

function AudioWidgetLocal() {
  const {
    tooglePlay, playing, metaData, slug,
  } = useAudioProvider();

  const { percent } = useAudioTime();

  return (
    <View className="bg-red-50 h-16 absolute bottom-20 z-10 w-full">
      <AudioWidget
        slug={slug}
        percent={percent}
        onPress={tooglePlay}
        playing={playing}
        image="https://noseconformen.com/wp-content/uploads/2022/03/support-ucrania-stop-putin-768x576.jpg"
        title={metaData.artist ?? 'unknown'}
        subTitle={metaData.album ?? 'unknown'}
      />
    </View>
  );
}

export default AudioWidgetLocal;
