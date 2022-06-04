import { FC, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import removeTags from 'app/util/removeTags';
import ImageResponsive from 'app/ui/ImageResponsive';
import PostProps from './interface';
import OpenURLButton from '../../ui/OpenURLButton';

const PostImage: FC<PostProps> = ({ post }) => {
  const [copyURL, setCopyUrl] = useState<string>();
  useEffect(() => {
    if (post.featuredImage?.node?.image_attr?.ccUrl) {
      setCopyUrl(removeTags(post.featuredImage.node.image_attr.ccUrl));
    }
  }, [post.featuredImage?.node?.image_attr?.ccUrl]);

  if (!post.featuredImage?.node?.mediaItemUrl) {
    return <View className="hidden" />;
  }
  return (
    <>
      <View>
        {post.featuredImage?.node?.mediaItemUrl && (
        <View>
          <ImageResponsive
            uri={post.featuredImage.node.mediaItemUrl}
            alt={post.featuredImage.node.caption ? removeTags(post.featuredImage.node.caption) : ''}
          />
        </View>
        )}
        {copyURL && (
        <OpenURLButton
          url={copyURL}
          className="absolute z-10 bottom-3 right-3 bg-white font-xl rounded-lg p-0.5 opacity-40"
        >
          <AntDesign name="copyright" />
        </OpenURLButton>
        )}
      </View>
      {post.featuredImage.node.caption && (
        <View className="px-3">
          <Text className="text-right text-xs text-gray-500" selectable>
            {removeTags(post.featuredImage.node.caption)}
          </Text>
        </View>
      )}
    </>
  );
};

export default PostImage;
