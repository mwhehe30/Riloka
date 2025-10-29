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

  return (
    <Image
      src={imgSrc || fallback}
      alt={alt}
      onError={() => setImgSrc(fallback)}
      {...props}
    />
  );
}
