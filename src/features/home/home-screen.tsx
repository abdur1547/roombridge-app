import { FlashList } from '@shopify/flash-list';
import * as React from 'react';

import { FocusAwareStatusBar, Input, Text, View } from '@/components/ui';
import { translate } from '@/lib/i18n';
import { ListingTypeCard } from './components/listing-type-card';
import { PropertyCard } from './components/property-card';
import { useHome } from './use-home';

export function HomeScreen() {
  const {
    searchQuery,
    properties,
    handleSearch,
    handlePropertyPress,
    handleCreateFlatmateListing,
    handleCreatePlaceListing,
  } = useHome();

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <FocusAwareStatusBar />

      {/* Header with Search */}
      <View className="border-b border-neutral-200 bg-white px-4 pt-12 pb-4 dark:border-neutral-800 dark:bg-black">
        <Input
          placeholder={translate('home.searchPlaceholder')}
          value={searchQuery}
          onChangeText={handleSearch}
          className="rounded-xl"
        />
      </View>

      {/* Content */}
      <FlashList
        data={properties}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListHeaderComponent={(
          <View className="mb-4">
            {/* Listing Type Cards */}
            <ListingTypeCard
              title={translate('home.needFlatmate')}
              image={(
                <View className="size-16 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900">
                  <Text className="text-3xl">🛏️</Text>
                </View>
              )}
              onPress={handleCreateFlatmateListing}
            />

            <ListingTypeCard
              title={translate('home.needPlace')}
              image={(
                <View className="size-16 items-center justify-center rounded-xl bg-red-100 dark:bg-red-900">
                  <Text className="text-3xl">👤</Text>
                </View>
              )}
              onPress={handleCreatePlaceListing}
            />

            {/* Section Title */}
            <Text className="mt-2 mb-4 text-xl font-bold text-black dark:text-white">
              {translate('home.availableProperties')}
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <PropertyCard
            id={item.id}
            title={item.title}
            location={item.location}
            availableDate={item.availableDate}
            bedroomCount={item.bedroomCount}
            personCount={item.personCount}
            bathroomCount={item.bathroomCount}
            price={item.price}
            imageUrl={item.imageUrl}
            onPress={handlePropertyPress}
          />
        )}
      />
    </View>
  );
}
