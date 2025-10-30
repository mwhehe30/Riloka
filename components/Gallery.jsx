'use client';

import ImageWithFallback from '@/components/ImageWithFallback';
import { Image } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Gallery({ images, title }) {
  const [activeImage, setActiveImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  // Initialize gallery when images prop changes
  useEffect(() => {
    if (images && images.length > 0) {
      setGalleryImages(images);
      setActiveImage(images[0]);
    } else {
      setGalleryImages([]);
      setActiveImage(null);
    }
  }, [images]);

  const handleImageClick = (image) => {
    console.log('Setting active image to:', image);
    setActiveImage(image);
  };

  return (
    <div className='space-y-6'>
      <h2 className='text-xl sm:text-2xl font-bold text-gray-900'>{title}</h2>

      {/* Main Image Display */}
      <div className='relative w-full h-[400px] rounded-xl overflow-hidden group border border-gray-200 bg-gray-100'>
        {activeImage ? (
          <ImageWithFallback
            src={activeImage}
            alt={`${title} gallery`}
            fill
            className='object-cover group-hover:scale-105 transition-transform duration-500'
            onError={(e) => {
              console.error('Error loading active image:', activeImage);
              e.target.style.display = 'none';
            }}
            onLoad={() => console.log('Active image loaded:', activeImage)}
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center text-gray-500'>
            <div className='text-center'>
              <Image className='w-16 h-16 mx-auto mb-2 text-gray-300' />
              <p>Tidak ada gambar yang dipilih</p>
            </div>
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {galleryImages.length > 0 ? (
        <div className='space-y-4'>
          <p className='text-gray-600'>Klik thumbnail untuk melihat gambar:</p>
          <div className='flex gap-4 overflow-x-auto scrollbar-none scroll-smooth pb-2'>
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => handleImageClick(img)}
                className={`relative flex-shrink-0 w-32 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  activeImage === img
                    ? 'border-primary scale-105 shadow-lg'
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <ImageWithFallback
                  src={img}
                  alt={`${title} ${idx + 1}`}
                  fill
                  className='object-cover'
                  onError={(e) => {
                    console.error('Error loading thumbnail:', img);
                    e.target.style.display = 'none';
                  }}
                  onLoad={() => console.log('Thumbnail loaded:', img)}
                />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className='text-center py-8'>
          <Image className='w-16 h-16 mx-auto mb-4 text-gray-300' />
          <p className='text-gray-500'>Belum ada foto tersedia.</p>
        </div>
      )}
    </div>
  );
}
