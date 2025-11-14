'use client';

import { ArrowUpRight, Clock, MapPin, Star, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import ImageWithFallback from './ImageWithFallback';

const UMKMCard = ({ umkm }) => {
  return (
    <Link href={`/umkm/${umkm.slug}`} className='h-full'>
      <article className='flex flex-col overflow-hidden cursor-pointer group border border-surface bg-white shadow-lg shadow-black/5 transition-all duration-300 h-full rounded-2xl group-hover:-translate-y-1 group-hover:shadow-xl hover:shadow-xl hover:translate-y-0 translate-y-1 hover:border-primary/30 active:border-primary/40'>
        {/* Gambar */}
        <figure className='relative overflow-hidden aspect-video'>
          <ImageWithFallback
            src={umkm.thumb}
            alt={umkm.name}
            fill
            priority
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className='object-cover transition-transform duration-700 group-hover:scale-110'
          />

          {/* Overlay gradient */}
          <div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500' />

          {/* Label kategori */}
          <div
            className={`absolute top-4 left-4 backdrop-blur-md text-white text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full shadow-md ${
              Array.isArray(umkm.category) && umkm.category.length === 2
                ? 'bg-linear-to-r ' +
                  (umkm.category[0] === 'makanan'
                    ? 'from-category-makanan '
                    : umkm.category[0] === 'minuman'
                    ? 'from-category-minuman '
                    : umkm.category[0] === 'jasa'
                    ? 'from-category-jasa '
                    : umkm.category[0] === 'fashion'
                    ? 'from-category-fashion '
                    : umkm.category[0] === 'kerajinan'
                    ? 'from-category-kerajinan '
                    : 'from-primary/90 ') +
                  (umkm.category[1] === 'makanan'
                    ? 'to-category-makanan'
                    : umkm.category[1] === 'minuman'
                    ? 'to-category-minuman'
                    : umkm.category[1] === 'jasa'
                    ? 'to-category-jasa'
                    : umkm.category[1] === 'fashion'
                    ? 'to-category-fashion'
                    : umkm.category[1] === 'kerajinan'
                    ? 'to-category-kerajinan'
                    : 'to-primary/90')
                : (Array.isArray(umkm.category)
                    ? umkm.category[0]
                    : umkm.category) === 'makanan'
                ? 'bg-category-makanan'
                : (Array.isArray(umkm.category)
                    ? umkm.category[0]
                    : umkm.category) === 'minuman'
                ? 'bg-category-minuman'
                : (Array.isArray(umkm.category)
                    ? umkm.category[0]
                    : umkm.category) === 'jasa'
                ? 'bg-category-jasa'
                : (Array.isArray(umkm.category)
                    ? umkm.category[0]
                    : umkm.category) === 'fashion'
                ? 'bg-category-fashion'
                : (Array.isArray(umkm.category)
                    ? umkm.category[0]
                    : umkm.category) === 'kerajinan'
                ? 'bg-category-kerajinan'
                : 'bg-primary/90'
            }`}
          >
            {Array.isArray(umkm.category)
              ? umkm.category
                  .map(
                    (category) =>
                      category.charAt(0).toUpperCase() + category.slice(1)
                  )
                  .join(' & ')
              : umkm.category.charAt(0).toUpperCase() + umkm.category.slice(1)}
          </div>

          {/* Rekomendasi */}
          {umkm.featured && (
            <div className='absolute top-4 right-4 bg-linear-to-br from-yellow-500 to-yellow-600 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg'>
              <ThumbsUp className='size-3.5 shrink-0' />
              <span className='text-xs sm:text-sm font-semibold'>
                Rekomendasi
              </span>
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
            <MapPin className='size-4 text-gray-500 shrink-0' strokeWidth={2} />
            <span className='font-medium line-clamp-1'>{umkm.address}</span>
          </div>

          {/* Rating & Clock */}
          <div className='flex justify-between items-center truncate leading-relaxed'>
            <div className='flex items-center gap-2'>
              <Star className='w-5 h-5 fill-current text-yellow-500' />
              {umkm.rating || '0.0'}
            </div>
            <div className='flex items-center gap-2'>
              <Clock className='size-3.5  shrink-0' />
              <span>
                {umkm.hours?.open} - {umkm.hours?.close}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className='mt-auto flex flex-col sm:flex-row items-start gap-4 sm:items-center justify-between pt-3 border-t border-surface'>
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
              <ArrowUpRight className='size-5 shrink-0' strokeWidth={2.5} />
            </div>
          </div>
        </figcaption>
      </article>
    </Link>
  );
};

export default UMKMCard;
