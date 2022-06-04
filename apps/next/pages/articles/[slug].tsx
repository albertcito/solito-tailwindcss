import { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import {
  PostDocument, PostIdType, PostQuery, PostQueryVariables,
} from 'app/graphql/generated/generated';
import Post from 'app/components/posts/Post';
import ssrClient, { withUrqlClient } from '../../urql/UrqlClient';

interface HomeProps {
  data: PostQuery['post'];
  // error: string | null;
}

type PostContentProps = { content?: string };
function PostContent({ content }: PostContentProps) {
  return (
    <div>
      {content}
    </div>
  );
}

const PostPage: FC<HomeProps> = ({ data }) => (
  <div>
    {data && (
    <Post
      post={data}
      content={<PostContent content={data.content} />}
    />
    )}
  </div>
);

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => ({
  paths: [], // indicates that no page needs be created at build time
  fallback: 'blocking', // indicates the type of fallback
});

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug as string;
  const variables = { id: slug, idType: PostIdType.Slug, asPreview: false };
  const response = await ssrClient
    .query<PostQuery, PostQueryVariables>(PostDocument, variables)
    .toPromise();
  const notFound = !response.data?.post;
  return {
    props: {
      data: response.data?.post ?? null,
      error: response.error?.message ?? null,
    },
    notFound,
    revalidate: 600,
  };
};

export default withUrqlClient(PostPage);
