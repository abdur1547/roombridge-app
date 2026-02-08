import * as React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui';
import { Bath, Bed, Users } from '@/components/ui/icons';

type Props = {
  name: string;
  location: string;
  rent: number;
  rentPeriod?: 'week' | 'month';
  bedrooms: number;
  bathrooms: number;
  occupancy: number;
};

export function PropertyInfo({
  name,
  location,
  rent,
  rentPeriod = 'week',
  bedrooms,
  bathrooms,
  occupancy,
}: Props) {
  return (
    <View className="bg-white p-4 dark:bg-neutral-900">
      {/* Location */}
      <Text className="text-sm text-neutral-600 dark:text-neutral-400">
        {location}
      </Text>

      {/* Property Name */}
      <Text className="mt-1 text-2xl font-semibold text-neutral-900 dark:text-white">
        {name}
      </Text>

      {/* Rent */}
      <View className="mt-3 flex-row items-baseline">
        <Text className="text-3xl font-bold text-neutral-900 dark:text-white">
          $
          {rent}
        </Text>
        <Text className="ml-1 text-base text-neutral-600 dark:text-neutral-400">
          Inc. bills / per
          {' '}
          {rentPeriod}
        </Text>
      </View>

      {/* Property Details */}
      <View className="mt-4 flex-row items-center gap-6">
        {/* Bedrooms */}
        <View className="flex-row items-center gap-2">
          <Bed width={20} height={20} className="text-neutral-600 dark:text-neutral-400" />
          <Text className="text-base text-neutral-900 dark:text-white">
            {bedrooms}
          </Text>
        </View>

        {/* Bathrooms */}
        <View className="flex-row items-center gap-2">
          <Bath width={20} height={20} className="text-neutral-600 dark:text-neutral-400" />
          <Text className="text-base text-neutral-900 dark:text-white">
            {bathrooms}
          </Text>
        </View>

        {/* Occupancy */}
        <View className="flex-row items-center gap-2">
          <Users width={20} height={20} className="text-neutral-600 dark:text-neutral-400" />
          <Text className="text-base text-neutral-900 dark:text-white">
            {occupancy}
          </Text>
        </View>
      </View>
    </View>
  );
}
