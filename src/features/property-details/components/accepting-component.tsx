import * as React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui';
import { Check } from '@/components/ui/icons';

type AcceptingType = 'students' | 'backpackers' | 'professionals' | 'anyone';

type Props = {
  acceptingTypes: AcceptingType[];
};

const acceptingLabels: Record<AcceptingType, string> = {
  students: 'Students',
  backpackers: 'Backpackers',
  professionals: 'Professionals',
  anyone: 'Anyone except couples',
};

export function AcceptingComponent({ acceptingTypes }: Props) {
  return (
    <View className="bg-white p-4 dark:bg-neutral-900">
      <Text className="text-lg font-semibold text-neutral-900 dark:text-white">
        Property accepting of
      </Text>

      <View className="mt-3 flex-row flex-wrap gap-2">
        {acceptingTypes.map((type) => (
          <View
            key={type}
            className="flex-row items-center gap-2 rounded-full bg-neutral-100 px-4 py-2 dark:bg-neutral-800"
          >
            <Check size={16} className="text-green-600 dark:text-green-500" />
            <Text className="text-sm text-neutral-900 dark:text-white">
              {acceptingLabels[type]}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
