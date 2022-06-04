import { FC } from 'react';
import { View, Text } from 'react-native';

import PostProps from './interface';
import PostImage from './PostImage';
import DangerousHTML, { generateHtml } from '../../../ui/DangerousHTML';

const Post: FC<PostProps> = ({ post }) => (
  <View
    key={post.slug}
    className="w-full flex-1 text-center"
  >
    <View>
      {post.featuredImage?.node?.mediaItemUrl && (
      <View>
        <PostImage post={post} />
      </View>
      )}
      <Text
        className="px-3 pt-2 pb-8 text-3xl font-semibold"
        style={{ fontFamily: 'PTSerif_700Bold' }}
        selectable
      >
        {post.title}
      </Text>
      <View className="px-5 pb-10 max-w-2xl">
        <DangerousHTML
          source={{ html: generateHtml(post.content) }}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    </View>
  </View>
);

export default Post;
