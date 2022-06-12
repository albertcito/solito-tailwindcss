import { FC, useMemo } from 'react';
import { Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { IconProps } from '@expo/vector-icons/build/createIconSet';
import useAudioTimeProvider from 'app/hooks/audio/useAudioTimeProvider';
import { AudioData } from 'app/hooks/audio/useAudio';

interface PlayPauseButtonProps {
  icon?: Omit<IconProps<never>, 'name'>;
  className?: string;
  data: AudioData,
}

const PlayPauseButton: FC<PlayPauseButtonProps> = ({
  icon,
  className,
  data,
}) => {
  const { play, getAudioStatus } = useAudioTimeProvider();
  const { playing } = useMemo(() => getAudioStatus(data.audioURL), [getAudioStatus, data.audioURL]);
  const iconName = playing ? 'pausecircle' : 'play';
  return (
    <Pressable onPress={() => play(data.audioURL, data)} className={className}>
      <AntDesign name={iconName} {...icon} />
    </Pressable>
  );
};

export default PlayPauseButton;
