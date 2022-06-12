import useAudioTimeProvider from 'app/hooks/audio/useAudioTimeProvider';
import { FC, useMemo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

interface AudioPlayerSliderProps {
  audioURL: string;
  classWrap?: string;
  classPercent?: string;
  styleWrap?: StyleProp<ViewStyle>
  stylePercent?: StyleProp<ViewStyle>
}

const AudioPlayerSlider: FC<AudioPlayerSliderProps> = ({
  audioURL,
  classWrap,
  classPercent,
  styleWrap,
  stylePercent,
}) => {
  const { getAudioStatus } = useAudioTimeProvider();
  const { percent } = useMemo(() => getAudioStatus(audioURL), [getAudioStatus, audioURL]);
  return (
    <View className={classWrap} style={styleWrap}>
      <View
        className={classPercent}
        style={[
          stylePercent,
          {
            width: `${percent * 100}%`,
            height: '90%',
          },
        ]}
      />
    </View>
  );
};

AudioPlayerSlider.defaultProps = {
  classWrap: 'h-2 bg-gray-500 w-full rounded justify-center',
  classPercent: 'bg-gray-800 rounded',
  styleWrap: undefined,
  stylePercent: undefined,
};

export default AudioPlayerSlider;
