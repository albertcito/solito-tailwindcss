import { FC } from 'react';
import { Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { IconProps } from '@expo/vector-icons/build/createIconSet';

interface PlayPauseButtonProps {
  play: () => Promise<void>;
  playing: boolean;
  icon: Omit<IconProps<never>, 'name'>;
  className?: string;
}

const PlayPauseButton: FC<PlayPauseButtonProps> = ({
  play,
  playing,
  icon,
  className,
}) => (
  <Pressable onPress={play} className={className}>
    {playing
      ? (<AntDesign name="pausecircle" {...icon} />)
      : (<AntDesign name="play" {...icon} />)}
  </Pressable>
);

export default PlayPauseButton;
