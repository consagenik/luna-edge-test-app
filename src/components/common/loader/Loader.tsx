import React from 'react';
import { ColorRing } from 'react-loader-spinner';

import './Loader.scss';

interface LoaderProps {
  size?: number
  color?: string
}

export default function Loader({size = 48, color = '#F90E27'} : LoaderProps) {
  return (
    <ColorRing
      visible={true}
      wrapperClass="loader"
      colors={[color, color, color, color, color]}
      height={size}
      width={size}
    />
  );
}
