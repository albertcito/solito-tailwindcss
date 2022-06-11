import { FC } from 'react';
import { Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { IconProps } from '@expo/vector-icons/build/createIconSet';
import useAudioTimeProvider from 'app/hooks/audio/useAudioTimeProvider';

interface ForwardButtonProps extends Omit<IconProps<never>, 'name'> {
  className?: string;
}

const ForwardButton: FC<ForwardButtonProps> = ({
  className,
  ...icon
}) => {
  const { forward } = useAudioTimeProvider();
  return (
    <Pressable onPress={() => forward()} className={className}>
      <MaterialIcons name="forward-30" {...icon} />
    </Pressable>
  );
};

export default ForwardButton;
