import { useState } from 'react';

type Property = {
  id: string;
  title: string;
  location: string;
  availableDate: string;
  bedroomCount: number;
  personCount: number;
  bathroomCount: number;
  price: string;
  imageUrl: string;
};

export function useHome() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock property data - will be replaced with API calls later
  const properties: Property[] = [
    {
      id: '1',
      title: '1 Room in Share House',
      location: 'Yokine, Perth',
      availableDate: '12 February 2026',
      bedroomCount: 4,
      personCount: 1,
      bathroomCount: 4,
      price: '$320 pw',
      imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
    },
    {
      id: '2',
      title: '2 Rooms in Modern Apartment',
      location: 'Northbridge, Perth',
      availableDate: '15 February 2026',
      bedroomCount: 3,
      personCount: 2,
      bathroomCount: 2,
      price: '$400 pw',
      imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
    },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // TODO: Implement search logic
    console.log('Searching for:', query);
  };

  const handlePropertyPress = (id: string) => {
    // TODO: Navigate to property details screen
    console.log('Property pressed:', id);
    // router.push(`/property/${id}`);
  };

  const handleCreateFlatmateListing = () => {
    // TODO: Navigate to create flatmate listing screen
    console.log('Create flatmate listing');
  };

  const handleCreatePlaceListing = () => {
    // TODO: Navigate to create place listing screen
    console.log('Create place listing');
  };

  return {
    searchQuery,
    properties,
    handleSearch,
    handlePropertyPress,
    handleCreateFlatmateListing,
    handleCreatePlaceListing,
  };
}
