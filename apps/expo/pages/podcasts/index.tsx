import { FC } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { useAudiosQuery } from 'app/graphql/generated/generated';
import PodcastsBox from 'app/components/podcasts/PodcastsBox';
import SafeArea from '../../components/SafeArea'

const Index: FC = () => {
  const [{ fetching, data, error }] = useAudiosQuery();

  return (
    <ScrollView>
      <SafeArea>
        <View>
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
          {data?.audios?.nodes && (
            <PodcastsBox podcasts={data?.audios?.nodes} />
          )}
        </View>
      </SafeArea>
    </ScrollView>
  );
};

export default Index;
