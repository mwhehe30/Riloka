'use client';

import { ArrowUpRight, Clock, MapPin, Star } from 'lucide-react';
import Link from 'next/link';
import ImageWithFallback from './ImageWithFallback';

export default function UMKMCard({ umkm }) {
  return (
    <Link href={`/umkm/${umkm.id}`} className='h-full'>
      <article className='flex flex-col overflow-hidden cursor-pointer group border border-surface bg-white shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-black/10 transition-all duration-500 h-full rounded-2xl'>
        {/* Gambar */}
        <figure className='relative overflow-hidden aspect-video'>
          <ImageWithFallback
            src={
              umkm.thumb ||
              'https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg'
            }
            alt={umkm.name}
            fill
            className='object-cover transition-transform duration-700 group-hover:scale-110'
          />

          {/* Overlay gradient */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500' />

          {/* Label kategori */}
          <div className='absolute top-4 left-4 bg-primary/90 backdrop-blur-md text-white text-sm font-medium px-3 py-1.5 rounded-full shadow-md'>
            {Array.isArray(umkm.category)
              ? umkm.category.join(' & ')
              : umkm.category}
          </div>

          {/* Jam buka */}

          {/* Rekomendasi */}
          {umkm.featured && (
            <div className='absolute top-4 right-4 bg-gradient-to-br from-yellow-500 to-yellow-600 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg'>
              <Star
                className='size-3.5 fill-current flex-shrink-0'
                strokeWidth={0}
              />
              <span className='text-sm font-semibold'>Rekomendasi</span>
            </div>
          )}

          {/* Nama */}
          <div className='absolute bottom-0 left-0 right-0 p-5 text-white'>
            <h3 className='text-xl font-bold line-clamp-1 drop-shadow-lg'>
              {umkm.name}
            </h3>
          </div>
        </figure>

        {/* Konten bawah */}
        <figcaption className='flex flex-col flex-1 p-6 space-y-4'>
          {/* Alamat */}
          <div className='flex items-center gap-2 text-sm text-gray-700 overflow-hidden'>
            <MapPin
              className='size-4 text-gray-500 flex-shrink-0'
              strokeWidth={2}
            />
            <span className='font-medium line-clamp-1'>{umkm.address}</span>
          </div>

          {/* Rating & Clock */}
          <div className='flex justify-between items-center truncate leading-relaxed'>
            <div className='flex items-center gap-2'>
              <Star className='w-5 h-5 fill-current text-yellow-500' />
              {umkm.rating || '0.0'}
            </div>
            <div className='flex items-center gap-2'>
              <Clock className='size-3.5 flex-shrink-0' />
              <span>
                {umkm.hours?.open} - {umkm.hours?.close}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className='mt-auto flex items-center justify-between pt-3 border-t border-surface'>
            <div className='flex flex-col'>
              <span className='text-xs text-gray-500 font-medium'>
                Rentang Harga
              </span>
              <span className='text-sm font-bold text-gray-900'>
                {umkm.priceRange || '-'}
              </span>
            </div>

            <div className='text-primary hover:text-primary/90 font-semibold text-base flex items-center gap-1 transition-all duration-300'>
              Lihat detail
              <ArrowUpRight
                className='size-5 flex-shrink-0'
                strokeWidth={2.5}
              />
            </div>
          </div>
        </figcaption>
      </article>
    </Link>
  );
}
