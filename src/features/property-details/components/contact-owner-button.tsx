import * as React from 'react';
import { View } from 'react-native';
import { Button } from '@/components/ui';

type Props = {
  ownerName?: string;
  onContact?: () => void;
};

export function ContactOwnerButton({ ownerName = 'Tracy', onContact }: Props) {
  return (
    <View className="bg-white px-4 py-3 dark:bg-neutral-900">
      <Button
        label={`Contact ${ownerName}`}
        variant="default"
        size="lg"
        onPress={onContact}
        className="w-full"
      />
    </View>
  );
}
