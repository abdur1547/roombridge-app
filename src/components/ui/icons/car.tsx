import type { SvgProps } from 'react-native-svg';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export function Car({ color = '#000', ...props }: SvgProps) {
  return (
    <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
      <Path
        d="M5 17h14M2 11l1.5-4.5A2 2 0 0 1 5.4 5h13.2a2 2 0 0 1 1.9 1.5L22 11M2 11v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6M2 11h20M7 15h.01M17 15h.01"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
