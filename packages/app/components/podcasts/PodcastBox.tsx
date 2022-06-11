import { View, Text, Image } from 'react-native';
import { FC } from 'react';

import { AudiosQuery } from 'app/graphql/generated/generated';
import PodcastBoxAudio from './PodcastBoxAudio';

interface PodcastBoxProps {
  podcast: NonNullable<NonNullable<NonNullable<AudiosQuery['audios']>['nodes']>[0]>
}

const PodcastBox: FC<PodcastBoxProps> = ({ podcast }) => {
  const audioURL = podcast.audios?.mp3?.mediaItemUrl;
  return (
    <View key={podcast.slug} className="flex flex-row space-x-2">
      {podcast.featuredImage?.node?.mediaItemUrl && (
        <View className="w-20 h-20">
          <Image
            source={{ uri: podcast.featuredImage.node.mediaItemUrl }}
            className="w-full h-full rounded-lg"
          />
        </View>
      )}
      <View className="flex-1">
        <Text
          className="text-blue-700 text-xl mb-2"
          style={{ fontFamily: 'PTSerif_700Bold' }}
        >
          {podcast.title}
        </Text>
        {audioURL && (
          <View className="w-48">
            <PodcastBoxAudio
              artist={podcast.title}
              album="Albert's Podcast"
              audioURL={audioURL}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default PodcastBox;
