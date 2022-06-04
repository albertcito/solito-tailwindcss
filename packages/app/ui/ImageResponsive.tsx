import { useEffect, useState } from 'react';
import { Image, View } from 'react-native';

// eslint-disable-next-line no-unused-vars
export type CancelPromise = ((reason?: Error) => void) | undefined;
export type ImageSize = { width: number; height: number };
interface ImageSizeOperation {
  start: () => Promise<ImageSize>;
  cancel: CancelPromise;
}

const getImageSize = (uri: string): ImageSizeOperation => {
  let cancel: CancelPromise;
  const start = (): Promise<ImageSize> => (
    new Promise<{ width: number; height: number }>((resolve, reject) => {
      cancel = reject;
      Image.getSize(
        uri,
        (width, height) => {
          cancel = undefined;
          resolve({ width, height });
        },
        (error) => {
          reject(error);
        },
      );
    }));

  return { start, cancel };
};

interface ImageResponsiveProps {
  uri: string;
  alt: string;
}

function ImageResponsive({ uri, alt }: ImageResponsiveProps) {
  const [imageAspectRatio, setImageAspectRatio] = useState<number>();
  useEffect(() => {
    let cancel: CancelPromise;
    const sideEffect = async (): Promise<void> => {
      try {
        const operation = getImageSize(uri);
        cancel = operation.cancel;
        const { width, height } = await operation.start();
        setImageAspectRatio(width / height);
      } catch (error) {
        if (__DEV__) console.warn(error);
      }
    };
    sideEffect();
    return () => {
      if (cancel) {
        cancel();
      }
    };
  }, [uri]);
  return (
    <View className="flex flex-1 flex-row">
      <Image
        source={{ uri }}
        accessible
        accessibilityLabel={alt}
        resizeMode="contain"
        className="flex-1"
        style={{ aspectRatio: imageAspectRatio }}
      />
    </View>
  );
}

export default ImageResponsive;
