import { FC } from 'react';
import {
  View, Pressable, Text, Image,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Link } from 'solito/link';

import AudioPlayerSlider from './AudioPlayerSlider';

interface AudioWidgetProps {
  playing: boolean;
  onPress: () => void;
  percent: number;
  image: string;
  title: string;
  subTitle: string;
  slug: string;
}

const AudioWidget: FC<AudioWidgetProps> = ({
  slug,
  title,
  subTitle,
  image,
  playing,
  percent,
  onPress,
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
            {title}
          </Text>
          <Text className="text-gray-700 text-sm">
            {subTitle}
          </Text>
        </View>
      </Link>
      <View className="">
        <Pressable onPress={onPress} className="items-center">
          <Entypo
            name={playing ? 'controller-paus' : 'controller-play'}
            size={31}
            color="black"
          />
        </Pressable>
      </View>
    </View>
    <View className="w-full self-center">
      <AudioPlayerSlider
        percent={percent}
        classWrap="h-1 bg-blue-900"
        classPercent="bg-green-300"
      />
    </View>
  </View>
);

export default AudioWidget;
