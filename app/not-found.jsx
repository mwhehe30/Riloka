'use client';

import { Home, Search, ArrowLeft, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <section className='min-h-screen bg-gradient-to-br from-primary/5 via-white to-orange-50 flex items-center justify-center px-4 py-16'>
      <div className='container mx-auto max-w-4xl'>
        <div className='text-center space-y-8'>
          {/* Illustration Area */}
          <div className='relative'>
            {/* Large 404 Text */}
            <div className='relative inline-block'>
              <h1 className='text-[120px] sm:text-[180px] md:text-[220px] font-extrabold text-gray-200 leading-none select-none'>
                404
              </h1>
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center shadow-2xl animate-pulse'>
                  <MapPin className='w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white' />
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className='space-y-4'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900'>
              Halaman Tidak Ditemukan
            </h2>
            <p className='text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed'>
              Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin
              halaman tersebut telah dipindahkan atau tidak pernah ada.
            </p>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center pt-6'>
            <button
              onClick={() => router.back()}
              className='group inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-primary hover:text-primary transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto'
            >
              <ArrowLeft className='w-5 h-5 group-hover:-translate-x-1 transition-transform' />
              <span>Kembali</span>
            </button>

            <Link
              href='/'
              className='group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary/90 text-white font-semibold rounded-xl hover:from-primary/90 hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto'
            >
              <Home className='w-5 h-5' />
              <span>Halaman Utama</span>
            </Link>

            <Link
              href='/umkm'
              className='group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto'
            >
              <Search className='w-5 h-5' />
              <span>Jelajahi UMKM</span>
            </Link>
          </div>

          {/* Helpful Links */}
          <div className='pt-8'>
            <p className='text-sm text-gray-500 mb-4'>
              Atau kunjungi halaman populer kami:
            </p>
            <div className='flex flex-wrap gap-3 justify-center'>
              <Link
                href='/umkm'
                className='inline-block px-4 py-2 text-sm text-gray-600 hover:text-primary bg-white hover:bg-primary/5 border border-gray-200 hover:border-primary/30 rounded-lg transition-all duration-300'
              >
                Daftar UMKM
              </Link>
              <Link
                href='/tentang'
                className='inline-block px-4 py-2 text-sm text-gray-600 hover:text-primary bg-white hover:bg-primary/5 border border-gray-200 hover:border-primary/30 rounded-lg transition-all duration-300'
              >
                Tentang Kami
              </Link>
              <Link
                href='/#featured'
                className='inline-block px-4 py-2 text-sm text-gray-600 hover:text-primary bg-white hover:bg-primary/5 border border-gray-200 hover:border-primary/30 rounded-lg transition-all duration-300'
              >
                UMKM Unggulan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
