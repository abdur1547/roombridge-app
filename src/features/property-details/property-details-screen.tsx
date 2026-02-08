import { useLocalSearchParams } from 'expo-router';
import * as React from 'react';
import { ScrollView } from 'react-native';
import { FocusAwareStatusBar, View } from '@/components/ui';
import { AboutFlatmates } from './components/about-flatmates';
import { AcceptingComponent } from './components/accepting-component';
import { ContactOwnerButton } from './components/contact-owner-button';
import { PropertyDescription } from './components/property-description';
import { PropertyFeatures } from './components/property-features';
import { PropertyInfo } from './components/property-info';
import { PropertyPhotos } from './components/property-photos';
import { RoomOverview } from './components/room-overview';
import { ShareFavoriteActions } from './components/share-favorite-actions';

// Mock data - replace with API call later
const MOCK_PROPERTY = {
  id: '1',
  name: 'Private room with shared bathroom',
  location: 'Drayton, QLD',
  rent: 270,
  rentPeriod: 'week' as const,
  bedrooms: 4,
  bathrooms: 2,
  occupancy: 4,
  images: [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
  ],
  description:
    'Looking for one Single person to share this beautiful house with three young men in their early 20s. All of them are full time students studying in UniSQ. Each of them is a unique culture which makes them a diverse professional family. Very spacious house (3.7 * 4.6) with new aircon, new sling fans. Private room with timber door (tight and solid), beautiful view from inside with trees, birds and cricket 100% View secured. The room has a locker. All rooms have TV. Unlimited internet is a rent. Study halls with office chairs. Very spacious backyard, study hall and new office chairs.',
  ownerName: 'Tracy',
  accepting: ['students', 'backpackers'] as const,
  features: [
    { id: '1', label: 'Off-street parking', icon: 'parking' as const },
    { id: '2', label: 'Unlimited internet to rent', icon: 'wifi' as const },
    { id: '3', label: 'Air conditioning', icon: 'ac' as const },
  ],
  roomDetails: [
    { label: 'Bills included in rent', value: 'Yes' },
    { label: 'Shared bathroom', value: 'Yes' },
    { label: 'Minimum 1 month stay', value: 'Yes' },
    { label: 'Maximum 1 month stay', value: 'Yes' },
    { label: 'Anyone except couples', value: 'Yes' },
    { label: 'Furnished', value: 'Yes' },
  ],
  flatmatesDescription:
    'We are renting out one 4 bedrooms house to singles, poker students or professionals. We are social people who would like 4 of you are responsible, clean and respectful to each others. Sorry, No smoking.',
};

export function PropertyDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = React.useState(false);

  // TODO: Fetch property data based on ID
  // const { data: property, isPending } = useProperty({ variables: { id } });

  const handleShare = () => {
    // TODO: Implement share functionality
    console.log('Share property');
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleContact = () => {
    // TODO: Implement contact functionality
    console.log('Contact owner');
  };

  return (
    <View className="flex-1 bg-neutral-50 dark:bg-black">
      <FocusAwareStatusBar />

      <ScrollView className="flex-1">
        {/* Property Photos */}
        <PropertyPhotos images={MOCK_PROPERTY.images} />

        {/* Property Info */}
        <PropertyInfo
          name={MOCK_PROPERTY.name}
          location={MOCK_PROPERTY.location}
          rent={MOCK_PROPERTY.rent}
          rentPeriod={MOCK_PROPERTY.rentPeriod}
          bedrooms={MOCK_PROPERTY.bedrooms}
          bathrooms={MOCK_PROPERTY.bathrooms}
          occupancy={MOCK_PROPERTY.occupancy}
        />

        {/* Divider */}
        <View className="h-2 bg-neutral-100 dark:bg-neutral-950" />

        {/* Contact Owner Button */}
        <ContactOwnerButton
          ownerName={MOCK_PROPERTY.ownerName}
          onContact={handleContact}
        />

        {/* Divider */}
        <View className="h-2 bg-neutral-100 dark:bg-neutral-950" />

        {/* About the Property */}
        <PropertyDescription description={MOCK_PROPERTY.description} />

        {/* Divider */}
        <View className="h-2 bg-neutral-100 dark:bg-neutral-950" />

        {/* Property Accepting */}
        <AcceptingComponent acceptingTypes={MOCK_PROPERTY.accepting} />

        {/* Divider */}
        <View className="h-2 bg-neutral-100 dark:bg-neutral-950" />

        {/* Property Features */}
        <PropertyFeatures features={MOCK_PROPERTY.features} />

        {/* Divider */}
        <View className="h-2 bg-neutral-100 dark:bg-neutral-950" />

        {/* Room Overview */}
        <RoomOverview details={MOCK_PROPERTY.roomDetails} />

        {/* About Flatmates */}
        <AboutFlatmates description={MOCK_PROPERTY.flatmatesDescription} />

        {/* Bottom Spacing */}
        <View className="h-8" />
      </ScrollView>

      {/* Floating Share & Favorite Actions */}
      <ShareFavoriteActions
        onShare={handleShare}
        onFavorite={handleFavorite}
        isFavorite={isFavorite}
      />
    </View>
  );
}
