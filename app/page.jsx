'use client';

import { getUmkm } from '@/lib/api';
import { Search, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

const kategori = [
  { name: 'makanan', href: '' },
  { name: 'minuman', href: '' },
  { name: 'fashion', href: '' },
  { name: 'kerajinan', href: '' },
  { name: 'jasa', href: '' },
];

export default function Page() {
  const [umkm, setUmkm] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const umkm = await getUmkm();
      setUmkm(umkm);
    }
    fetchData();
  }, []);

  return (
    <main className='min-h-screen'>
      <section className='relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center'>
        <div className='absolute inset-0 -z-10'>
          <div className='absolute top-20 right-0 size-36 md:size-64 lg:size-96 bg-primary/20 lg:bg-primary/10 rounded-full blur-3xl' />
          <div className='absolute bottom-0 left-0 size-36 md:size-64 lg:size-96 bg-accent/20 lg:bg-accent/10 rounded-full blur-3xl' />
        </div>

        <div className='max-w-5xl mx-auto text-center'>
          <div className='inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 font-medium text-sm'>
            <Sparkles className='size-4' />
            Temukan UMKM di Sekitar Anda
          </div>

          <h1 className='text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 leading-tight font-montserrat'>
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent'>
              Riloka
            </span>{' '}
            — Jelajahi Dunia UMKM Lokal
          </h1>

          <p className='text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed'>
            Platform pencarian UMKM yang memudahkan Anda menemukan produk, jasa,
            dan pelaku usaha lokal terbaik di seluruh Indonesia. Dukung bisnis
            kecil, gerakkan ekonomi besar.
          </p>

          <form
            method='post'
            action=''
            className='relative max-w-2xl mx-auto mb-12'
          >
            <div className='absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-2xl' />
            <div className='relative flex items-center gap-3 bg-card border border-muted-foreground rounded-2xl px-6 py-4 shadow-lg hover:shadow-xl transition-shadow'>
              <Search className='size-5 text-muted-foreground flex-shrink-0' />
              <input
                type='text'
                placeholder='Cari UMKM, produk, atau jasa lokal...'
                className='w-full border-0 bg-transparent outline-0 ring-0 text-base placeholder:text-muted-foreground'
              />
            </div>
          </form>

          <p className='text-sm text-muted-foreground'>
            <em>Riloka — dari lokal, untuk semua.</em>
          </p>
        </div>
      </section>

      <section className='container mx-auto px-6 lg:px-12 py-12 md:py-16 min-h-screen'>
        {/* tambahin anunya */}
      </section>
    </main>
  );
}
