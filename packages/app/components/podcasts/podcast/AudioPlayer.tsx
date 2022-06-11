import { FC, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTailwind } from 'tailwindcss-react-native';

import useAudioTime from 'app/hooks/audio/useAudioTimeProvider';
import useAudioProvider from 'app/hooks/audio/useAudioProvider';
import AudioPlayerSlider from '../../AudioWidget/AudioPlayerSlider';
import PlayPauseButton from './PlayPauseButton';

interface AudioPlayerProps {
  url: string;
  slug: string;
  artist?: string;
  album?: string;
}

const AudioPlayer: FC<AudioPlayerProps> = ({
  url,
  slug,
  artist,
  album,
}) => {
  const { play, forward } = useAudioProvider();
  const { getAudioStatus } = useAudioTime();
  const { percent, playing } = useMemo(() => getAudioStatus(url), [getAudioStatus, url]);
  const tw = useTailwind();
  const { backgroundColor } = tw('bg-blue-500');
  return (
    <View>
      <View className="flex mb-4 items-center py-2">
        <View className="w-11/12 ">
          <AudioPlayerSlider percent={percent} />
        </View>
      </View>
      <View className="flex items-center">
        <View className="flex flex-row items-center">
          <MaterialIcons name="replay-10" size={45} color="black" />
          <View className="mx-7">
            <PlayPauseButton
              play={() => play(url, slug, { artist, album })}
              playing={playing}
              icon={{ size: 74, color: 'black' }}
            />
          </View>
          <Pressable
            onPress={() => forward()}
            style={({ pressed }) => [
              pressed ? { backgroundColor } : {},
            ]}
          >
            <MaterialIcons name="forward-30" size={45} color="black" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default AudioPlayer;
