'use client';

import { getUmkmById } from '@/lib/api';
import { Clock, MapPin, Share2, Star, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
export default function Page() {
  const { id } = useParams();
  const [detailUmkm, setDetailUmkm] = useState(null);

  useEffect(() => {
    async function detailUmkm() {
      try {
        const res = await getUmkmById(Number(id));
        setDetailUmkm(res);
      } catch (error) {
        console.error(error);
      }
    }
    detailUmkm();
  }, [id]);

  if (!detailUmkm) {
    return (
      <section className='flex justify-center items-center min-h-screen'>
        <p className='text-gray-500'>Memuat data UMKM...</p>
      </section>
    );
  }
  return (
    <section className='container mx-auto flex justify-center pt-22 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen'>
      <div className='w-full h-full'>
        <Link href='/umkm' className=' flex items-center max-w-max hover:bg-primary/10 my-4 rounded-xl hover:text-primary/90 p-4 transition duration-300'>
        <ChevronLeft className=''/>
          Kembali ke daftar UMKM
        </Link>

        <article className='relative overflow-hidden rounded-3xl shadow-2xl mb-12 group'>
          <figure className=' aspect-square md:aspect-[21/9]  overflow-hidden'>
            <Image
              src={detailUmkm?.images?.[0]}
              alt={detailUmkm?.name}
              fill
              className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
            />
          </figure>

          <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent' />
          <div className='absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white'>
            <span className='inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-white/20 backdrop-blur-xl text-white border border-white/30'>
              {detailUmkm?.category}
            </span>

            {detailUmkm?.featured && (
              <span className='inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ml-3 bg-gradient-to-br from-yellow-500 to-yellow-600 text-white'>
                 Rekomendasi
              </span>
            )}

            <h1 className='text-white text-2xl md:text-6xl mb-4 font-bold mt-4'>
              {detailUmkm?.name}
            </h1>

            <div className='flex flex-wrap items-center gap-6 text-white/90'>
              <div className='flex items-center gap-2'>
                <Star className='w-5 h-5 fill-current text-yellow-500' />
                <span>{detailUmkm?.rating || '0.0'}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Clock className='size-5' />
                <span>
                  {detailUmkm?.hours.open} - {detailUmkm?.hours.close}
                </span>
              </div>
            </div>
          </div>

          <div className='absolute top-8 right-8 flex gap-3'>
            <button className='p-3 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 text-white hover:bg-white/30 transition'>
              <Share2 className='size-6' />
            </button>
          </div>
        </article>
        <h1 className='text-2xl font-bold mb-4'>{detailUmkm?.name}</h1>
        <p className='text-gray-600 mb-4'>{detailUmkm?.description}</p>
        <p className='text-gray-600 mb-4'>{detailUmkm?.address}</p>
        <p className='text-gray-600 mb-4'>{detailUmkm?.contact.phone}</p>
        <p className='text-gray-600 mb-4'>{detailUmkm?.hours.open}</p>
        <p className='text-gray-600 mb-4'>{detailUmkm?.hours.close}</p>
      </div>
    </section>
  );
}
