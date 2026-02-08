import type { ViewProps } from 'react-native';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import { Share, Heart, Facebook, Twitter, MessageCircle } from '@/components/ui/icons';

type Props = ViewProps & {
  onShare?: () => void;
  onFavorite?: () => void;
  isFavorite?: boolean;
};

export function ShareFavoriteActions({
  onShare,
  onFavorite,
  isFavorite = false,
  ...props
}: Props) {
  const [showSocial, setShowSocial] = React.useState(false);

  const handleShare = () => {
    setShowSocial(!showSocial);
    onShare?.();
  };

  return (
    <View
      className="absolute right-4 top-4 z-50 flex flex-col gap-3"
      {...props}
    >
      {/* Share Button */}
      <Pressable
        onPress={handleShare}
        className="h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg dark:bg-neutral-800"
      >
        <Share size={20} className="text-neutral-900 dark:text-white" />
      </Pressable>

      {/* Social Icons - Show on Share click */}
      {showSocial && (
        <View className="flex flex-col gap-2">
          <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-blue-600 shadow-md">
            <Facebook size={18} className="text-white" />
          </Pressable>
          <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-sky-500 shadow-md">
            <Twitter size={18} className="text-white" />
          </Pressable>
          <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-green-600 shadow-md">
            <MessageCircle size={18} className="text-white" />
          </Pressable>
        </View>
      )}

      {/* Favorite Button */}
      <Pressable
        onPress={onFavorite}
        className="h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg dark:bg-neutral-800"
      >
        <Heart
          size={20}
          className={isFavorite ? 'text-red-500' : 'text-neutral-900 dark:text-white'}
          fill={isFavorite ? '#ef4444' : 'none'}
        />
      </Pressable>
    </View>
  );
}
