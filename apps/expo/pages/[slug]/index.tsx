import Post from 'app/components/posts/Post';
import { ScrollView, Text, View } from 'react-native';
import { PostIdType, usePostQuery } from 'app/graphql/generated/generated';
import { createParam } from 'solito';
import { FC } from 'react';

const { useParam } = createParam<{ slug: string }>();

function PostPage({ slug }: { slug: string }) {
  const variables = { id: slug, idType: PostIdType.Slug, asPreview: false };
  const [{ fetching, data }] = usePostQuery({ variables });

  return (
    <ScrollView>
      <View>
        {fetching && (
          <Text>
            loading....
          </Text>
        )}
        {data?.post && (
          <Post post={data?.post} />
        )}
      </View>
    </ScrollView>
  );
}

const PostPageSlug: FC = () => {
  const [slug] = useParam('slug');

  if (!slug) {
    return (
      <View>
        <Text>
          invalid slug - Not Found
        </Text>
      </View>
    );
  }

  return (
    <PostPage slug={slug} />
  );
};

export default PostPageSlug;
