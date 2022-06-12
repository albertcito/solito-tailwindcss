import { View, Text } from 'react-native';
import { FC } from 'react';
import dayjs from 'dayjs';

import { AudiosQuery } from 'app/graphql/generated/generated';
import PodcastBoxAudio from './PodcastBoxAudio';

interface PodcastBoxProps {
  podcast: NonNullable<NonNullable<NonNullable<AudiosQuery['audios']>['nodes']>[0]>
}

const PodcastBox: FC<PodcastBoxProps> = ({ podcast }) => {
  const data = {
    album: podcast.title ?? '',
    artist: 'John Doe',
    slug: podcast.slug ?? '',
    image: podcast.featuredImage?.node?.mediaItemUrl ?? '',
    audioURL: podcast.audios?.mp3?.mediaItemUrl ?? '',
    duration: 0,
  };
  return (
    <View key={podcast.slug} className="flex flex-row space-x-2">
      <View className="flex-1">
        <Text className=" text-gray-500 font-semibold uppercase">
          {dayjs(podcast.date).format('MMM DD, YY')}
        </Text>
        <Text
          className="text-blue-700 text-lg mb-2"
          style={{ fontFamily: 'PTSerif_700Bold' }}
        >
          {podcast.title}
        </Text>
        <View>
          {data && (
            <View className="w-48">
              <PodcastBoxAudio data={data} />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default PodcastBox;
