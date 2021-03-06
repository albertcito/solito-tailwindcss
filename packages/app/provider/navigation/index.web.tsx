// on Web, we don't use React Navigation, so we avoid the provider altogether
// instead, we just have a no-op here
// for more, see: https://solito.dev/recipes/tree-shaking

import { FC } from 'react';

const NavigationProvider: FC = ({ children }) => <>{children}</>;

export default NavigationProvider;
