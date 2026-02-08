import * as React from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '@/components/ui';
import { ChevronDown, ChevronUp } from '@/components/ui/icons';

type Props = {
  title?: string;
  description: string;
  maxLines?: number;
};

export function PropertyDescription({
  title = 'About the property',
  description,
  maxLines = 3,
}: Props) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [showExpandButton, setShowExpandButton] = React.useState(false);

  const handleTextLayout = (e: any) => {
    const { lines } = e.nativeEvent;
    if (lines.length > maxLines) {
      setShowExpandButton(true);
    }
  };

  return (
    <View className="bg-white p-4 dark:bg-neutral-900">
      {/* Title */}
      <Text className="text-lg font-semibold text-neutral-900 dark:text-white">
        {title}
      </Text>

      {/* Description */}
      <Text
        className="mt-2 text-base leading-6 text-neutral-700 dark:text-neutral-300"
        numberOfLines={isExpanded ? undefined : maxLines}
        onTextLayout={handleTextLayout}
      >
        {description}
      </Text>

      {/* Expand/Collapse Button */}
      {showExpandButton && (
        <Pressable
          onPress={() => setIsExpanded(!isExpanded)}
          className="mt-3 flex-row items-center gap-1"
        >
          <Text className="text-base font-medium text-neutral-900 dark:text-white">
            {isExpanded ? 'View less' : 'View more about the property'}
          </Text>
          {isExpanded ? (
            <ChevronUp size={20} className="text-neutral-900 dark:text-white" />
          ) : (
            <ChevronDown size={20} className="text-neutral-900 dark:text-white" />
          )}
        </Pressable>
      )}
    </View>
  );
}
