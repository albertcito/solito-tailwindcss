import useSafeAreaHook from './use-safe-area';

const useSafeAreaInsets = (): ReturnType<typeof useSafeAreaHook> => ({
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
});

export default useSafeAreaInsets;
