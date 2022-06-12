import { AudiosQuery } from 'app/graphql/generated/generated';
import { View } from 'react-native';
import { FC } from 'react';
import { Link } from 'solito/link';
import PostBox from './PodcastBox';

interface PodcastsBoxProps {
  podcasts: NonNullable<NonNullable<AudiosQuery['audios']>['nodes']>
}

const PodcastsBox: FC<PodcastsBoxProps> = ({ podcasts }) => (
  <View className="flex flex-wrap flex-row p-4">
    {podcasts.map((post) => {
      if (!post) {
        return <></>;
      }
      return (
        <View
          key={post?.slug}
          className="w-full border-b pb-4 "
        >
          <View className="mt-2">
            <Link href={`/audios/${post.slug}`}>
              <PostBox podcast={post} />
            </Link>
          </View>
        </View>
      );
    })}
  </View>
);

export default PodcastsBox;
