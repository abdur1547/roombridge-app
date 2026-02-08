import * as React from 'react';
import { Image, Modal, Pressable, View } from 'react-native';
import { Text } from '@/components/ui';
import { ChevronLeft, ChevronRight, X } from '@/components/ui/icons';

type ThumbnailGalleryProps = {
  images: string[];
  onOpenFullScreen: (index: number) => void;
};

function ThumbnailGallery({ images, onOpenFullScreen }: ThumbnailGalleryProps) {
  return (
    <View className="bg-white dark:bg-neutral-900">
      <Pressable onPress={() => onOpenFullScreen(0)}>
        <Image
          source={{ uri: images[0] }}
          className="h-64 w-full"
          resizeMode="cover"
        />
      </Pressable>

      {images.length > 1 && (
        <View className="flex-row gap-2 p-4">
          {images.slice(1, 4).map((image, index) => (
            <Pressable
              key={image}
              onPress={() => onOpenFullScreen(index + 1)}
              className="flex-1"
            >
              <Image
                source={{ uri: image }}
                className="h-24 w-full rounded-lg"
                resizeMode="cover"
              />
              {index === 2 && images.length > 4 && (
                <View className="absolute inset-0 items-center justify-center rounded-lg bg-black/60">
                  <Text className="text-xl font-semibold text-white">
                    +
                    {images.length - 4}
                  </Text>
                </View>
              )}
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

type FullScreenModalProps = {
  visible: boolean;
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
};

function FullScreenModal({
  visible,
  images,
  currentIndex,
  onClose,
  onNext,
  onPrevious,
}: FullScreenModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black">
        <Pressable
          onPress={onClose}
          className="absolute top-12 right-4 z-50 size-10 items-center justify-center rounded-full bg-white/20"
        >
          <X width={24} height={24} className="text-white" />
        </Pressable>

        <View className="flex-1 items-center justify-center">
          <Image
            source={{ uri: images[currentIndex] }}
            className="size-full"
            resizeMode="contain"
          />
        </View>

        {images.length > 1 && (
          <>
            <Pressable
              onPress={onPrevious}
              className="absolute top-1/2 left-4 size-12 -translate-y-6 items-center justify-center rounded-full bg-white/20"
            >
              <ChevronLeft width={28} height={28} className="text-white" />
            </Pressable>

            <Pressable
              onPress={onNext}
              className="absolute top-1/2 right-4 size-12 -translate-y-6 items-center justify-center rounded-full bg-white/20"
            >
              <ChevronRight width={28} height={28} className="text-white" />
            </Pressable>
          </>
        )}

        <View className="absolute inset-x-0 bottom-8 items-center">
          <View className="rounded-full bg-white/20 px-4 py-2">
            <Text className="text-sm font-medium text-white">
              {currentIndex + 1}
              {' '}
              /
              {images.length}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

type Props = {
  images: string[];
};

export function PropertyPhotos({ images }: Props) {
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const openFullScreen = (index: number) => {
    setCurrentIndex(index);
    setIsFullScreen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
  };

  const showNext = () => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  };

  const showPrevious = () => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <>
      <ThumbnailGallery images={images} onOpenFullScreen={openFullScreen} />
      <FullScreenModal
        visible={isFullScreen}
        images={images}
        currentIndex={currentIndex}
        onClose={closeFullScreen}
        onNext={showNext}
        onPrevious={showPrevious}
      />
    </>
  );
}
