import { FC } from 'react';
import { View, Text, Image } from 'react-native';
import { Link } from 'solito/link';

import AudioPlayerSlider from './AudioPlayerSlider';
import PlayPauseButton from '../podcasts/podcast/PlayPauseButton';

interface AudioWidgetProps {
  image: string;
  album: string;
  artist?: string;
  slug: string;
  audioURL: string;
}

const AudioWidget: FC<AudioWidgetProps> = ({
  album,
  artist,
  slug,
  image,
  audioURL,
}) => (
  <View className="bg-black/50">
    <View className="flex flex-row items-center p-2">
      <View className="h-12 w-12 mr-2">
        <Link href={`/audios/${slug}`}>
          <Image
            source={{ uri: image }}
            className="h-12 w-12 rounded"
          />
        </Link>
      </View>
      <Link href={`/audios/${slug}`}>
        <View className="flex-1">
          <Text className="font-semibold">
            {album}
          </Text>
          <Text className="text-gray-700 text-sm">
            {artist}
          </Text>
        </View>
      </Link>
      <View className="">
        <PlayPauseButton audioURL={audioURL} />
      </View>
    </View>
    <View className="w-full self-center">
      <AudioPlayerSlider
        audioURL={audioURL}
        classWrap="h-1 bg-blue-900"
        classPercent="bg-green-300"
      />
    </View>
  </View>
);

export default AudioWidget;
