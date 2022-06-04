import { DripsyProvider, makeTheme } from 'dripsy';
import { FC } from 'react';

const theme = makeTheme({
  // https://www.dripsy.xyz/usage/theming/create
  text: {
    p: {
      fontSize: 16,
    },
  },
});

const Dripsy: FC = ({ children }) => (
  <DripsyProvider
    theme={theme}
      // this disables SSR, since react-native-web doesn't have support for it (yet)
    ssr
  >
    {children}
  </DripsyProvider>
);

export default Dripsy;
