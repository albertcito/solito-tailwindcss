import { FC } from 'react';
import { Link } from 'solito/link';
import { View } from 'react-native';
import { PostsQuery } from 'app/graphql/generated/generated';
import PostBox from './PostBox';

interface PostsBoxProps {
  posts: NonNullable<NonNullable<PostsQuery['posts']>['nodes']>
}

const PostsBox: FC<PostsBoxProps> = ({ posts }) => (
  <View className="flex flex-row flex-wrap">
    {posts.map((post) => {
      if (!post) {
        return <></>;
      }
      return (
        <View
          key={post?.databaseId}
          className="w-full md:w-1/3 sm:1/2 mb-3"
        >
          <View className="bg-gray-200 border rounded-lg flex-1 mx-2">
            <Link href={`/articles/${post.slug}`}>
              <PostBox post={post} />
            </Link>
          </View>
        </View>
      );
    })}
  </View>
);

export default PostsBox;
