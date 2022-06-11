import { View, Text } from 'react-native';
import { useMemo, FC } from 'react';

import useAudioTime from 'app/hooks/audio/useAudioTimeProvider';
import PlayPauseButton from './podcast/PlayPauseButton';
import AudioPlayerSlider from '../AudioWidget/AudioPlayerSlider';

interface PodcastBoxAudioProps {
  audioURL: string
  artist?: string;
  album?: string;
}

const PodcastBoxAudio: FC<PodcastBoxAudioProps> = ({
  audioURL,
  artist,
  album,
}) => {
  const { getAudioStatus } = useAudioTime();
  const { playing } = useMemo(
    () => getAudioStatus(audioURL ?? ''),
    [getAudioStatus, audioURL],
  );
  return (
    <View className="flex flex-row items-center">
      <View className="mr-2">
        <PlayPauseButton audioURL={audioURL} icon={{ size: 24, color: 'blue' }} />
      </View>
      {playing && (
        <View className="flex-1 mr-2">
          <AudioPlayerSlider audioURL={audioURL} />
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
