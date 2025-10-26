'use client';

import Card from '@/components/Card';
import HorizontalScroll from '@/components/HorizontalScroll';
import PromoCard from '@/components/PromoCard';
import { getPromo, getUmkm } from '@/lib/api';
import { ArrowRight, Award, Search, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function Page() {
  const [promo, setPromo] = useState([]);
  const [featuredUmkm, setFeaturedUmkm] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  // State untuk melacak posisi scroll

  const promoScrollRef = useRef(null);
  const umkmScrollRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getUmkm();
      setFeaturedUmkm(data.filter((i) => i.featured));
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const data = await getPromo();
      setPromo(data);
    }
    fetchData();
  }, []);

  // Fungsi untuk mengecek posisi scroll
  const checkScrollPosition = (ref, setScrollState) => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      const canScrollLeft = scrollLeft > 0;
      const canScrollRight = scrollLeft < scrollWidth - clientWidth - 1;

      setScrollState({
        canScrollLeft,
        canScrollRight,
      });
    }
  };

  // Effect untuk mengecek posisi scroll saat komponen mount dan data berubah

  // Fungsi untuk handle pencarian
  const handleSearch = (e) => {
    if (e) {
      e.preventDefault();
    }

    // Navigate ke halaman UMKM dengan parameter search
    if (searchValue.trim()) {
      router.push(`/umkm?search=${encodeURIComponent(searchValue.trim())}`);
    } else {
      router.push('/umkm');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

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
            onSubmit={handleSearch}
            className='relative max-w-2xl mx-auto mb-12'
          >
            <div className='absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-2xl' />
            <div className='relative flex items-center gap-3 bg-card border border-muted-foreground rounded-2xl px-6 py-4 shadow-lg hover:shadow-xl transition-shadow'>
              <Search className='size-5 text-muted-foreground flex-shrink-0' />
              <input
                type='text'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder='Cari UMKM, produk, atau jasa lokal...'
                className='w-full border-0 bg-transparent outline-0 ring-0 text-base placeholder:text-muted-foreground'
              />
              <button
                type='submit'
                className='px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-hover transition-colors'
              >
                Cari
              </button>
            </div>
          </form>

          <p className='text-sm text-muted-foreground'>
            <em>Riloka — dari lokal, untuk semua.</em>
          </p>
        </div>
      </section>

      {/* Rekomendasi Umkm */}
      {featuredUmkm.length > 0 && (
        <section className='container mx-auto px-6 lg:px-12 py-16 md:py-20'>
          <div className='flex justify-between items-end mb-12'>
            <div>
              <div className='inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 text-yellow-700 px-4 py-2 rounded-full mb-4 font-medium text-sm'>
                <Award className='size-4' />
                Pilihan Terbaik
              </div>
              <h2 className='text-4xl md:text-5xl font-bold text-foreground mb-3'>
                UMKM Rekomendasi
              </h2>
              <p className='text-lg text-muted-foreground'>
                Dipilih khusus untuk Anda berdasarkan kualitas dan rating
                tertinggi
              </p>
            </div>
            <Link
              href='/umkm'
              className='hidden md:flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all group'
            >
              Lihat Semua
              <ArrowRight className='size-5 group-hover:translate-x-1 transition-transform' />
            </Link>
          </div>

          <HorizontalScroll>
            {featuredUmkm.map((item) => (
              <div key={item.id} className='flex-none w-80 md:w-96 snap-center'>
                <Card umkm={item} />
              </div>
            ))}
          </HorizontalScroll>

          <Link
            href='/umkm'
            className='md:hidden flex items-center justify-center gap-2 text-primary font-semibold hover:gap-3 transition-all group mt-6'
          >
            Lihat Semua UMKM
            <ArrowRight className='size-5 group-hover:translate-x-1 transition-transform' />
          </Link>
        </section>
      )}

      {/* Promo Section */}
      {promo.length > 0 && (
        <section className='container mx-auto px-6 lg:px-12 py-16 md:py-20'>
          <div className='flex justify-between items-end mb-12'>
            <div>
              <div className='inline-flex items-center gap-2 bg-gradient-to-r from-red-500/10 to-pink-500/10 text-red-600 px-4 py-2 rounded-full mb-4 font-medium text-sm'>
                <Sparkles className='size-4' />
                Penawaran Spesial
              </div>
              <h2 className='text-4xl md:text-5xl font-bold text-foreground mb-3'>
                Promo Menarik
              </h2>
              <p className='text-lg text-muted-foreground'>
                Jangan lewatkan penawaran terbaik dari UMKM favorit Anda
              </p>
            </div>
          </div>

          <HorizontalScroll>
            {promo.map((promo) => (
              <div
                key={promo.id}
                className='flex-none w-80 md:w-96 snap-center'
              >
                <PromoCard promo={promo} />
              </div>
            ))}
          </HorizontalScroll>
        </section>
      )}
    </main>
  );
}
