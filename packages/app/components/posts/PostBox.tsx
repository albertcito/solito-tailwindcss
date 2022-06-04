import { View, Text, Image } from 'react-native';
import { FC } from 'react';

import { PostsQuery } from 'app/graphql/generated/generated';
import removeTags from 'app/util/removeTags';

interface PostBoxProps {
  post: NonNullable<NonNullable<NonNullable<PostsQuery['posts']>['nodes']>[0]>
}

const PostBox: FC<PostBoxProps> = ({ post }) => (
  <View>
    {post.featuredImage?.node?.mediaItemUrl && (
      <View className="w-full h-48 mb-2.5">
        <Image
          source={{ uri: post.featuredImage.node.mediaItemUrl }}
          className="w-full h-full rounded-t-lg"
          accessible
          accessibilityLabel={post.featuredImage.node.caption ? removeTags(post.featuredImage.node.caption) : ''}
        />
      </View>
    )}
    <View className="px-2 pb-2">
      <Text
        className="text-blue-700 text-xl mb-2"
        style={{ fontFamily: 'PTSerif_700Bold' }}
      >
        {post.title}
      </Text>
      {post.excerpt && (
        <Text className="text-base">
          {removeTags(post.excerpt)}
        </Text>
      )}
    </View>
  </View>
);

export default PostBox;
