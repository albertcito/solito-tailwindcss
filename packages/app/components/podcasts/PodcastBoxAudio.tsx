import { View, Text } from 'react-native';
import { useMemo, FC } from 'react';

import useAudioProvider from 'app/hooks/audio/useAudioProvider';
import PlayPauseButton from './podcast/PlayPauseButton';
import AudioPlayerSlider from '../AudioWidget/AudioPlayerSlider';

interface PodcastBoxAudioProps {
  url: string
  slug: string
  artist?: string;
  album?: string;
}

const PodcastBoxAudio: FC<PodcastBoxAudioProps> = ({
  url,
  slug,
  artist,
  album,
}) => {
  const { play, getAudioStatus } = useAudioProvider();
  const { playing, percent } = useMemo(
    () => getAudioStatus(url ?? ''),
    [getAudioStatus, url],
  );
  return (
    <View className="flex flex-row items-center">
      <View className="mr-2">
        <PlayPauseButton
          play={() => play(url, slug, { artist, album })}
          playing={playing}
          icon={{ size: 24, color: 'blue' }}
        />
      </View>
      {playing && (
        <View className="flex-1 mr-2">
          <AudioPlayerSlider percent={percent} />
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
