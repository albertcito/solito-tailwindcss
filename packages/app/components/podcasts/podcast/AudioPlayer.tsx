import { FC } from 'react';
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import AudioPlayerSlider from '../../AudioWidget/AudioPlayerSlider';
import PlayPauseButton from './PlayPauseButton';
import ForwardButton from './ForwardButton';

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
}) => (
  <View>
    <View className="flex mb-4 items-center py-2">
      <View className="w-11/12 ">
        <AudioPlayerSlider audioURL={url} />
      </View>
    </View>
    <View className="flex items-center">
      <View className="flex flex-row items-center">
        <MaterialIcons name="replay-10" size={45} color="black" />
        <View className="mx-7">
          <PlayPauseButton audioURL={url} icon={{ size: 74, color: 'black' }} />
        </View>
        <ForwardButton
          size={45}
          color="black"
        />
      </View>
    </View>
  </View>
);

export default AudioPlayer;
