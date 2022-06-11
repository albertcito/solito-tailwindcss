import React, { FC } from 'react';
import { GetStaticProps } from 'next';

import { PostsDocument, PostsQuery, PostsQueryVariables } from 'app/graphql/generated/generated';
import PostsBox from 'app/components/posts/PostsBox';
import ssrClient, { withUrqlClient } from '../urql/UrqlClient';

interface HomeProps {
  data: PostsQuery['posts'] | null;
  // error: string | null;
}

const Home: FC<HomeProps> = ({ data }) => (
  <div>
    {data?.nodes && (
    <PostsBox posts={data.nodes} />
    )}
  </div>
);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const response = await ssrClient
    .query<PostsQuery, PostsQueryVariables>(
      PostsDocument,
      { where: { categoryId: 17, offsetPagination: { size: 6 } } },
    ).toPromise();
  return {
    props: {
      data: response.data?.posts ?? null,
      error: response.error?.message ?? null,
    },
    revalidate: 600,
  };
};

export default withUrqlClient(Home);
