'use client';

import Image from 'next/image';
import { useState } from 'react';

const ImageWithFallback = ({
  src,
  alt = 'Image',
  fallback = '/images/fallback.webp',
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src || fallback);

  return (
    <Image
      src={imgSrc || fallback}
      alt={alt}
      onError={() => setImgSrc(fallback)}
      {...props}
    />
  );
};

export default ImageWithFallback;
