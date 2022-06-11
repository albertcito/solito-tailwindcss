import { FC, useMemo } from 'react';
import { Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { IconProps } from '@expo/vector-icons/build/createIconSet';
import useAudioTimeProvider from 'app/hooks/audio/useAudioTimeProvider';

interface PlayPauseButtonProps {
  audioURL: string;
  icon?: Omit<IconProps<never>, 'name'>;
  className?: string;
}

const PlayPauseButton: FC<PlayPauseButtonProps> = ({
  audioURL,
  icon,
  className,
}) => {
  const { play, getAudioStatus } = useAudioTimeProvider();
  const { playing } = useMemo(() => getAudioStatus(audioURL), [getAudioStatus, audioURL]);
  return (
    <Pressable onPress={() => play(audioURL)} className={className}>
      {playing
        ? (<AntDesign name="pausecircle" {...icon} />)
        : (<AntDesign name="play" {...icon} />)}
    </Pressable>
  );
};

export default PlayPauseButton;
