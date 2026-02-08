import * as React from 'react';
import { Image, Pressable } from 'react-native';

import { Text, View } from '@/components/ui';
import {
  Bed as BedIcon,
  Favourite as FavouriteIcon,
  Shower as ShowerIcon,
  User as UserIcon,
} from '@/components/ui/icons';

type PropertyCardProps = {
  id: string;
  title: string;
  location: string;
  availableDate: string;
  bedroomCount: number;
  personCount: number;
  bathroomCount: number;
  price: string;
  imageUrl: string;
  onPress: (id: string) => void;
};

export function PropertyCard({
  id,
  title,
  location,
  availableDate,
  bedroomCount,
  personCount,
  bathroomCount,
  price,
  imageUrl,
  onPress,
}: PropertyCardProps) {
  return (
    <Pressable
      onPress={() => onPress(id)}
      className="mb-4 overflow-hidden rounded-2xl bg-white dark:bg-neutral-800"
    >
      {/* Property Image */}
      <View className="relative h-48 w-full">
        <Image
          source={{ uri: imageUrl }}
          className="size-full"
          resizeMode="cover"
        />
        {/* Favorite Icon */}
        <View className="absolute right-3 bottom-3 rounded-full bg-white/90 p-2 dark:bg-neutral-800/90">
          <FavouriteIcon color="#FFA500" width={20} height={20} />
        </View>
      </View>

      {/* Property Details */}
      <View className="p-4">
        {/* Title and Price Row */}
        <View className="mb-2 flex-row items-start justify-between">
          <View className="flex-1">
            <Text className="text-lg font-bold text-black dark:text-white">
              {title}
            </Text>
            <Text className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              {location}
            </Text>
          </View>
          <Text className="ml-2 text-lg font-bold text-black dark:text-white">
            {price}
          </Text>
        </View>

        {/* Availability */}
        <Text className="mb-2 text-sm text-neutral-600 dark:text-neutral-400">
          Available
          {' '}
          {availableDate}
        </Text>

        {/* Icons Row */}
        <View className="flex-row items-center gap-4">
          {/* Bedroom */}
          <View className="flex-row items-center gap-1">
            <BedIcon color="#6B7280" width={18} height={18} />
            <Text className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {bedroomCount}
            </Text>
          </View>

          {/* Person */}
          <View className="flex-row items-center gap-1">
            <UserIcon color="#6B7280" width={18} height={18} />
            <Text className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {personCount}
            </Text>
          </View>

          {/* Bathroom */}
          <View className="flex-row items-center gap-1">
            <ShowerIcon color="#6B7280" width={18} height={18} />
            <Text className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {bathroomCount}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
