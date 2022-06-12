import { FC } from 'react';
import { View, Text, Image } from 'react-native';
import { Link } from 'solito/link';

import { AudioData } from 'app/hooks/audio/useAudio';
import AudioPlayerSlider from './AudioPlayerSlider';
import PlayPauseButton from '../podcasts/podcast/PlayPauseButton';

interface AudioWidgetProps {
  data: AudioData;
}

const AudioWidget: FC<AudioWidgetProps> = ({ data }) => (
  <View className="bg-black/50">
    <View className="flex flex-row items-center p-2">
      <View className="h-12 w-12 mr-2">
        <Link href={`/audios/${data.slug}`}>
          <Image
            source={{ uri: data.image }}
            className="h-12 w-12 rounded"
          />
        </Link>
      </View>
      <View className="flex-1">
        <Link href={`/audios/${data.slug}`}>
          <Text className="font-semibold">
            {data.album}
          </Text>
          <Text className="text-gray-700 text-sm">
            {data.artist}
          </Text>
        </Link>
      </View>
      <View className="">
        <PlayPauseButton data={data} icon={{ size: 30 }} />
      </View>
    </View>
    <View className="w-full self-center">
      <AudioPlayerSlider
        audioURL={data.audioURL}
        classWrap="h-1 bg-blue-900"
        classPercent="bg-green-300"
      />
    </View>
  </View>
);

export default AudioWidget;
