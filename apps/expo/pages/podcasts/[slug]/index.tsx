import { FC } from 'react';
import Audio from 'app/components/podcasts/podcast';
import { ScrollView, Text, View } from 'react-native';
import {
  AudioIdType, useAudioQuery,
} from 'app/graphql/generated/generated';
import { createParam } from 'solito';
import SafeArea from '../../../components/SafeArea';

const { useParam } = createParam<{ slug: string }>();

function AudioPage({ slug }: { slug: string }) {
  const variables = { id: slug, idType: AudioIdType.Uri };
  const [{ fetching, data }] = useAudioQuery({ variables });

  return (
    <ScrollView>
      <SafeArea>
        <View>
          {fetching && (
            <Text>
              loading....
            </Text>
          )}
          {data?.audio && (
            <Audio audio={data.audio} />
          )}
        </View>
      </SafeArea>
    </ScrollView>
  );
}

const AudioPageSlug: FC = () => {
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
    <AudioPage slug={slug} />
  );
};

export default AudioPageSlug;
