import * as React from 'react';
import { PropertyDescription } from './property-description';

type Props = {
  description: string;
  maxLines?: number;
};

export function AboutFlatmates({ description, maxLines = 3 }: Props) {
  return (
    <PropertyDescription
      title="About the flatmates"
      description={description}
      maxLines={maxLines}
    />
  );
}
