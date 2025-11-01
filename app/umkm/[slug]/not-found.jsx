'use client';

import { ArrowLeft, Home, Search, Store } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <section className='min-h-screen bg-white flex items-center justify-center px-4 py-16'>
      <div className='container mx-auto max-w-3xl'>
        <div className=' p-8 sm:p-12 text-center space-y-8'>
          {/* Icon */}
          <div className='flex justify-center'>
            <div className='relative'>
              <div className='w-32 h-32 sm:w-40 sm:h-40 bg-linear-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center'>
                <Store className='w-16 h-16 sm:w-20 sm:h-20 text-gray-400' />
              </div>
              <div className='absolute -top-2 -right-2 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg'>
                ?
              </div>
            </div>
          </div>

          {/* Message */}
          <div className='space-y-4'>
            <h1 className='text-3xl sm:text-4xl font-bold text-gray-900'>
              UMKM Tidak Ditemukan
            </h1>
            <p className='text-base sm:text-lg text-gray-600 leading-relaxed'>
              Maaf, UMKM yang Anda cari tidak dapat ditemukan. Mungkin nama UMKM
              salah atau telah dihapus dari sistem kami.
            </p>
          </div>

          {/* Stats or Info Box */}
          <div className='bg-linear-to-br from-primary/5 to-orange-50 rounded-2xl p-6 border border-primary/10'>
            <p className='text-sm text-gray-600'>
              <span className='font-semibold text-primary'>Tips:</span> Coba cek
              kembali URL yang Anda masukkan atau jelajahi daftar UMKM kami
              untuk menemukan usaha yang Anda cari.
            </p>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center pt-4'>
            <button
              onClick={() => router.back()}
              className='group inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-primary hover:text-primary transition-all duration-300 shadow-md hover:shadow-lg w-full sm:w-auto'
            >
              <ArrowLeft className='w-5 h-5 group-hover:-translate-x-1 transition-transform' />
              <span>Kembali</span>
            </button>

            <Link
              href='/umkm'
              className='group inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-primary to-primary/90 text-white font-semibold rounded-xl hover:from-primary/90 hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto'
            >
              <Search className='w-5 h-5' />
              <span>Lihat Semua UMKM</span>
            </Link>

            <Link
              href='/'
              className='group inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-orange-500 hover:text-orange-600 transition-all duration-300 shadow-md hover:shadow-lg w-full sm:w-auto'
            >
              <Home className='w-5 h-5' />
              <span>Halaman Utama</span>
            </Link>
          </div>

          {/* Additional Help */}
          <div className='pt-6 border-t border-gray-100'>
            <p className='text-sm text-gray-500'>
              Butuh bantuan?{' '}
              <Link
                href='/tentang'
                className='text-primary hover:text-primary/80 font-medium underline'
              >
                Hubungi kami
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
