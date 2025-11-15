'use client';

import {
  ArrowUpRight,
  Clock,
  Heart,
  MapPin,
  ShoppingBag,
  ShoppingCart,
  Star,
  ThumbsUp,
} from 'lucide-react';
import Link from 'next/link';
import ImageWithFallback from './ImageWithFallback';

const UMKMCard = ({ umkm }) => {
  // Menentukan ikon berdasarkan kategori
  const getIconByCategory = (category) => {
    if (Array.isArray(category) && category.length > 0) {
      category = category[0]; // Gunakan kategori pertama
    }
    switch (category) {
      case 'makanan':
        return <ShoppingBag className='size-8 text-primary-dark' />;
      case 'minuman':
        return <ShoppingCart className='size-8 text-primary-dark' />;
      case 'jasa':
        return <Heart className='size-8 text-primary-dark' />;
      case 'fashion':
        return <ShoppingBag className='size-8 text-primary-dark' />;
      case 'kerajinan':
        return <ShoppingCart className='size-8 text-primary-dark' />;
      default:
        return <Heart className='size-8 text-primary-dark' />;
    }
  };

  // Menentukan warna berdasarkan kategori
  const getColorByCategory = (category) => {
    if (Array.isArray(category) && category.length > 0) {
      category = category[0];
    }
    switch (category) {
      case 'makanan':
        return 'bg-primary/20';
      case 'minuman':
        return 'bg-secondary/20';
      case 'jasa':
        return 'bg-amber-500/20';
      case 'fashion':
        return 'bg-blue-500/20';
      case 'kerajinan':
        return 'bg-purple-500/20';
      default:
        return 'bg-primary/20';
    }
  };

  return (
    <Link href={`/umkm/${umkm.slug}`} className='h-full block'>
      <div className='group relative h-full'>
        <div className='absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300'></div>
        <article className='relative flex flex-col overflow-hidden cursor-pointer group border border-surface bg-white shadow-2xl hover:shadow-3xl transition-all duration-300 h-full rounded-3xl group-hover:-translate-y-2'>
          {/* Header dengan ikon dan nama */}
          <div className='p-6 pb-4'>
            <div className='flex items-center gap-4 mb-4'>
              <div
                className={`p-3 rounded-2xl ${getColorByCategory(
                  umkm.category
                )}`}
              >
                {getIconByCategory(umkm.category)}
              </div>
              <h3 className='text-xl font-bold text-primary-dark truncate'>
                {umkm.name}
              </h3>
            </div>

            {/* Label kategori */}
            <div
              className={`inline-block text-white text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full shadow-md ${
                Array.isArray(umkm.category) && umkm.category.length === 2
                  ? 'bg-gradient-to-r ' +
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
                : umkm.category.charAt(0).toUpperCase() +
                  umkm.category.slice(1)}
            </div>
          </div>

          {/* Gambar */}
          <figure className='relative overflow-hidden px-6 pb-0 flex-1'>
            <div className='relative aspect-video rounded-2xl overflow-hidden'>
              <ImageWithFallback
                src={umkm.thumb}
                alt={umkm.name}
                fill
                priority
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                className='object-cover transition-transform duration-700 group-hover:scale-110'
              />
            </div>

            {/* Rekomendasi */}
            {umkm.featured && (
              <div className='absolute top-4 right-4 bg-gradient-to-br from-yellow-500 to-yellow-600 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg'>
                <ThumbsUp className='size-3.5 shrink-0' />
                <span className='text-xs sm:text-sm font-semibold'>
                  Rekomendasi
                </span>
              </div>
            )}
          </figure>

          {/* Konten bawah */}
          <figcaption className='flex flex-col flex-1 p-6 pt-4 space-y-4'>
            {/* Alamat */}
            <div className='flex items-center gap-2 text-sm text-gray-700 overflow-hidden'>
              <MapPin
                className='size-4 text-gray-500 shrink-0'
                strokeWidth={2}
              />
              <span className='font-medium line-clamp-1'>{umkm.address}</span>
            </div>

            {/* Rating & Jam Operasional */}
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

            {/* Rentang Harga */}
            <div className='p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-white border border-gray-100'>
              <div className='flex flex-col'>
                <span className='text-xs text-gray-500 font-medium'>
                  Rentang Harga
                </span>
                <span className='text-sm font-bold text-gray-900'>
                  {umkm.priceRange || '-'}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className='mt-auto flex items-start gap-4 sm:items-center justify-between pt-4 border-t border-gray-100'>
              <div className='flex items-center gap-2 text-primary-dark'>
                <div className='w-2 h-2 bg-secondary rounded-full'></div>
                <span className='text-sm font-medium'>UMKM Lokal</span>
              </div>

              <div className='text-primary hover:text-primary/90 font-semibold text-base flex items-center gap-1 transition-all duration-300'>
                Lihat detail
                <ArrowUpRight className='size-5 shrink-0' strokeWidth={2.5} />
              </div>
            </div>
          </figcaption>
        </article>
      </div>
    </Link>
  );
};

export default UMKMCard;
