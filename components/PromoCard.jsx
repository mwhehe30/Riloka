'use client';

import { Star, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function PromoCard({ promo }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      {/* Card */}
      <div
        onClick={handleOpen}
        className='cursor-pointer group block overflow-hidden rounded-2xl border border-surface transition-all duration-300 ease-in-out shadow-lg shadow-black/5 relative'
      >
        <figure className='relative'>
          <div className='aspect-video overflow-hidden'>
            <Image
              src={promo.image}
              alt={promo.name}
              width={500}
              height={500}
              className='h-full w-full object-contain'
            />
          </div>

          {/* Badge */}
          <div className='absolute top-0 flex w-full items-center justify-between p-4 text-sm'>
            <div className='flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-white'>
              <User className='size-4' />
              <span>{promo.review} Ulasan</span>
            </div>
            <div className='flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-white'>
              <Star className='size-4' />
              <span>{promo.rating}</span>
            </div>
          </div>
        </figure>

        <figcaption className='p-4 flex flex-col gap-4'>
          <h3 className='text-xl font-bold truncate'>{promo.name}</h3>
          <p className='mt-1 text-muted-foreground truncate'>
            {promo.description}
          </p>
          <button className='px-4 py-2 bg-primary text-white rounded-full text-sm shadow-lg active:scale-95 transition hover:bg-primary-hover'>
            Lihat Detail
          </button>
        </figcaption>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          onClick={handleClose}
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className='bg-white rounded-xl p-6 shadow-xl w-11/12 max-w-lg'
          >
            <h2 className='text-2xl font-bold mb-3'>{promo.name}</h2>

            <Image
              src={promo.image}
              alt={promo.name}
              width={600}
              height={600}
              className='rounded-lg mb-4'
            />

            <p className='text-gray-600 mb-6'>{promo.description}</p>

            <div className='flex items-center justify-end gap-3'>
              <button
                onClick={handleClose}
                className='px-5 py-2 border rounded-lg text-error'
              >
                Tutup
              </button>

              <Link
                href={`/umkm/${promo.slug}`}
                className='px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition'
              >
                Lihat UMKM
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
