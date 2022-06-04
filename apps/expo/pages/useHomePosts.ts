import { usePostsQuery } from 'app/graphql/generated/generated';

const useHomePosts = () => usePostsQuery(
  {
    variables: {
      where: {
        categoryId: 17,
        offsetPagination: { size: 6 },
      },
    },
  },
);

export default useHomePosts;
