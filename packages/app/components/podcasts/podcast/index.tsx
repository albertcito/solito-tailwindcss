import { FC } from 'react';
import { View, Text, Image } from 'react-native';

import { AudioQuery } from 'app/graphql/generated/generated';
import AudioPlayer from './AudioPlayer';

type AudioValues = NonNullable<AudioQuery['audio']>
interface PodcastProps {
  audio: AudioValues;
}
const Podcast: FC<PodcastProps> = ({ audio }) => {
  const audioURL = audio.audios?.mp3?.mediaItemUrl;
  const data = {
    album: audio.title ?? '',
    artist: 'John Doe',
    slug: audio.slug ?? '',
    image: audio.featuredImage?.node?.mediaItemUrl ?? '',
    audioURL: audio.audios?.mp3?.mediaItemUrl ?? '',
    duration: 0,
  };

  return (
    <View
      key={audio.slug}
      className="w-full flex-1 text-center"
    >
      <View className="w-full h-96">
        {audio.featuredImage?.node?.mediaItemUrl && (
          <Image
            source={{ uri: audio.featuredImage?.node?.mediaItemUrl }}
            resizeMode="cover"
            blurRadius={1}
            accessible
            className="flex-1"
          />
        )}
        <Text
          className="px-3 pt-2 pb-8 text-3xl font-semibold"
          style={{ fontFamily: 'PTSerif_700Bold' }}
          selectable
        >
          {audio.title}
        </Text>
        {audioURL && audio.slug && (
          <AudioPlayer data={data} />
        )}
      </View>
    </View>
  );
};

export default Podcast;
