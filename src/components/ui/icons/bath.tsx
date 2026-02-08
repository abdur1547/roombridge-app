import type { SvgProps } from 'react-native-svg';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export function Bath({ color = '#000', ...props }: SvgProps) {
  return (
    <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
      <Path
        d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1 2.5L7 8M15 5v2M18 8v2M3 12h18M3 12v3.5c0 1.5 1.5 3.5 3 3.5M21 12v3.5c0 1.5-1.5 3.5-3 3.5M6 19v2M18 19v2"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
