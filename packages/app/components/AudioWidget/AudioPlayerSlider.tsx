import { FC } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

interface AudioPlayerSliderProps {
  percent: number
  classWrap?: string;
  classPercent?: string;
  styleWrap?: StyleProp<ViewStyle>
  stylePercent?: StyleProp<ViewStyle>
}

const AudioPlayerSlider: FC<AudioPlayerSliderProps> = ({
  percent,
  classWrap,
  classPercent,
  styleWrap,
  stylePercent,
}) => (
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

AudioPlayerSlider.defaultProps = {
  classWrap: 'h-2 bg-gray-500 w-full rounded justify-center',
  classPercent: 'bg-gray-800 rounded',
  styleWrap: undefined,
  stylePercent: undefined,
};

export default AudioPlayerSlider;
