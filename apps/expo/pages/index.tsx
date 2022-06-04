import { FC } from 'react';
import PostsBox from 'app/components/posts/PostsBox';

import {
  ScrollView, Text, View, NativeScrollEvent, RefreshControl,
} from 'react-native';
import useHomePosts from './useHomePosts';

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom
  );
};

const Index: FC = () => {
  const [{ fetching, data, error }] = useHomePosts();
  // eslint-disable-next-line no-console
  const onRefresh = console.log;
  return (
    <ScrollView
      refreshControl={(
        <RefreshControl
          refreshing={false}
          onRefresh={onRefresh}
        />
      )}
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          // eslint-disable-next-line no-console
          console.log('Call more articles');
        }
      }}
      scrollEventThrottle={400}
    >
      <View className="pt-3">
        {fetching && (
          <Text>
            loading data....
          </Text>
        )}
        {error && (
          <Text>
            {error.message}
          </Text>
        )}
        {data?.posts?.nodes && (
          <PostsBox posts={data?.posts?.nodes} />
        )}
      </View>
    </ScrollView>
  );
};

export default Index;
