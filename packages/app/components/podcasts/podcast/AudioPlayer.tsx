import { FC } from 'react';
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { AudioData } from 'app/hooks/audio/useAudio';
import AudioPlayerSlider from '../../AudioWidget/AudioPlayerSlider';
import PlayPauseButton from './PlayPauseButton';
import ForwardButton from './ForwardButton';
import BackwardButton from './BackwardButton';

interface AudioPlayerProps {
  data: AudioData,
}

const AudioPlayer: FC<AudioPlayerProps> = ({ data }) => (
  <View>
    <View className="flex mb-4 items-center py-2">
      <View className="w-11/12 ">
        <AudioPlayerSlider audioURL={data.audioURL} />
      </View>
    </View>
    <View className="flex items-center">
      <View className="flex flex-row items-center">
        <BackwardButton size={45} color="black" />
        <View className="mx-7">
          <PlayPauseButton data={data} icon={{ size: 74, color: 'black' }} />
        </View>
        <ForwardButton size={45} color="black" />
      </View>
    </View>
  </View>
);

export default AudioPlayer;
