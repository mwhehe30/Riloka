'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function ImageWithFallback({
  src,
  alt = 'Image',
  fallback = '/images/fallback.webp',
  ...props
}) {
  const [imgSrc, setImgSrc] = useState(src || fallback);

  const validSrc = imgSrc?.trim() ? imgSrc : fallback;

  return (
    validSrc && (
      <Image
        src={validSrc}
        alt={alt}
        onError={() => setImgSrc(fallback)}
        {...props}
      />
    )
  );
}
