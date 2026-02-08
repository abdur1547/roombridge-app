import * as React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui';

type RoomDetail = {
  label: string;
  value: string;
};

type Props = {
  details: RoomDetail[];
};

export function RoomOverview({ details }: Props) {
  return (
    <View className="bg-white p-4 dark:bg-neutral-900">
      <Text className="text-lg font-semibold text-neutral-900 dark:text-white">
        Room overview
      </Text>

      <View className="mt-3 gap-3">
        {details.map((detail, index) => (
          <View key={index} className="flex-row items-center justify-between">
            <Text className="text-base text-neutral-600 dark:text-neutral-400">
              {detail.label}
            </Text>
            <Text className="text-base font-medium text-neutral-900 dark:text-white">
              {detail.value}
            </Text>
          </View>
        ))}
      </View>

      <View className="mt-3 border-t border-neutral-200 dark:border-neutral-700" />
    </View>
  );
}
