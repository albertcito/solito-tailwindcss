import { PostQuery } from 'app/graphql/generated/generated';
import { ReactNode } from 'react';

interface PostProps {
  post: NonNullable<PostQuery['post']>;
  content?: ReactNode;
}

export default PostProps;
