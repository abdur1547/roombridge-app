import * as React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui';
import { Car, Snowflake, Tv, Wifi } from '@/components/ui/icons';

type Feature = {
  id: string;
  label: string;
  icon?: 'wifi' | 'parking' | 'tv' | 'ac';
};

type Props = {
  features: Feature[];
};

const iconMap = {
  wifi: Wifi,
  parking: Car,
  tv: Tv,
  ac: Snowflake,
};

export function PropertyFeatures({ features }: Props) {
  return (
    <View className="bg-white p-4 dark:bg-neutral-900">
      <Text className="text-lg font-semibold text-neutral-900 dark:text-white">
        Property features
      </Text>

      <View className="mt-3 flex-row flex-wrap gap-3">
        {features.map((feature) => {
          const IconComponent = feature.icon ? iconMap[feature.icon] : null;

          return (
            <View
              key={feature.id}
              className="flex-row items-center gap-2 rounded-lg bg-neutral-100 px-4 py-3 dark:bg-neutral-800"
            >
              {IconComponent && (
                <IconComponent
                  size={18}
                  className="text-neutral-700 dark:text-neutral-300"
                />
              )}
              <Text className="text-sm text-neutral-900 dark:text-white">
                {feature.label}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
