import { View } from 'react-native';
import { FC } from 'react';
import classnames from 'classnames';

import useSafeAreaInsets from 'app/provider/safe-area/use-safe-area';

const SafeArea: FC = ({ children }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={classnames({
        'pt-12': insets.top,
        'pl-6': insets.left,
      })}
    >
      {children}
    </View>
  );
};

export default SafeArea;
