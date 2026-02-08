import * as React from 'react';
import { Pressable } from 'react-native';

import { Text, View } from '@/components/ui';

type ListingTypeCardProps = {
  title: string;
  image: React.ReactNode;
  onPress: () => void;
};

export function ListingTypeCard({
  title,
  image,
  onPress,
}: ListingTypeCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="mb-4 flex-row items-center justify-between rounded-2xl bg-neutral-100 p-6 dark:bg-neutral-800"
    >
      <View className="flex-1">
        <Text className="mb-1 text-sm text-neutral-500 dark:text-neutral-400">
          Create free listing
        </Text>
        <Text className="text-xl font-bold text-black dark:text-white">
          {title}
        </Text>
      </View>
      <View className="ml-4">{image}</View>
    </Pressable>
  );
}
