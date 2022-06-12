import { FC } from 'react';
import { Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { IconProps } from '@expo/vector-icons/build/createIconSet';
import useAudioTimeProvider from 'app/hooks/audio/useAudioTimeProvider';

interface ForwardButtonProps extends Omit<IconProps<never>, 'name'> {
  className?: string;
}

const BackwardButton: FC<ForwardButtonProps> = ({
  className,
  ...icon
}) => {
  const { backward } = useAudioTimeProvider();
  return (
    <Pressable onPress={() => backward(1000)} className={className}>
      <MaterialIcons name="replay-10" {...icon} />
    </Pressable>
  );
};

export default BackwardButton;
