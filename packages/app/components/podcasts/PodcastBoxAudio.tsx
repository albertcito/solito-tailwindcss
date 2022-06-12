import { View, Text } from 'react-native';
import { useMemo, FC } from 'react';

import useAudioTime from 'app/hooks/audio/useAudioTimeProvider';
import { AudioData } from 'app/hooks/audio/useAudio';
import PlayPauseButton from './podcast/PlayPauseButton';
import AudioPlayerSlider from '../AudioWidget/AudioPlayerSlider';

interface PodcastBoxAudioProps {
  data: AudioData;
}

const PodcastBoxAudio: FC<PodcastBoxAudioProps> = ({ data }) => {
  const { getAudioStatus } = useAudioTime();
  const { playing } = useMemo(
    () => getAudioStatus(data.audioURL ?? ''),
    [getAudioStatus, data.audioURL],
  );
  return (
    <View className="flex flex-row items-center">
      <View className="mr-2">
        <PlayPauseButton data={data} icon={{ size: 24, color: 'blue' }} />
      </View>
      {playing && (
        <View className="flex-1 mr-2">
          <AudioPlayerSlider audioURL={data.audioURL} />
        </View>
      )}
      <View>
        <Text>
          1 hr 1 min
        </Text>
      </View>
    </View>
  );
};

export default PodcastBoxAudio;
