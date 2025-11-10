'use client';

import Card from '@/components/Card';
import CardSkeleton from '@/components/CardSkeleton';
import HorizontalScroll from '@/components/HorizontalScroll';
import ImageWithFallback from '@/components/ImageWithFallback';
import Marquee from '@/components/Marquee';
import PageSkeleton from '@/components/PageSkeleton';
import PromoCard from '@/components/PromoCard';
import PromoCardSkeleton from '@/components/PromoCardSkeleton';
import TestimonialSlider from '@/components/TestimonialSlider';
import TestimonialSliderSkeleton from '@/components/TestimonialSliderSkeleton';
import { getPromo, getTestimonials, getUmkm } from '@/lib/api';
import {
  ArrowRight,
  Award,
  Coffee,
  Hammer,
  Mail,
  Scissors,
  Search,
  Shirt,
  Sparkles,
  Tag,
  Utensils,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
  const [promo, setPromo] = useState([]);
  const [umkm, setUmkm] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [testimonialLoading, setTestimonialLoading] = useState(true);
  const featuredUmkm = umkm.filter((i) => i.featured);
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const [umkmData, promoData] = await Promise.all([
          getUmkm(),
          getPromo(),
        ]);
        setUmkm(umkmData);
        setPromo(promoData);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchTestimonials() {
      setTestimonialLoading(true);
      try {
        const testimonialsData = await getTestimonials();
        setTestimonials(testimonialsData);
      } finally {
        setTestimonialLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

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

  const categories = [
    {
      id: 1,
      name: 'makanan',
      icon: Utensils,
      color: 'var(--color-category-makanan)',
      description: 'Warung makan, restoran, kafe',
      count: umkm.filter(({ category }) => category.includes('makanan')).length,
    },
    {
      id: 2,
      name: 'minuman',
      icon: Coffee,
      color: 'var(--color-category-minuman)',
      description: 'Kedai kopi, juice bar, teh',
      count: umkm.filter(({ category }) => category.includes('minuman')).length,
    },
    {
      id: 3,
      name: 'jasa',
      icon: Scissors,
      color: 'var(--color-category-jasa)',
      description: 'Barber, servis, konsultan',
      count: umkm.filter(({ category }) => category.includes('jasa')).length,
    },
    {
      id: 4,
      name: 'fashion',
      icon: Shirt,
      color: 'var(--color-category-fashion)',
      description: 'Pakaian, aksesoris, sepatu',
      count: umkm.filter(({ category }) => category.includes('fashion')).length,
    },
    {
      id: 5,
      name: 'kerajinan',
      icon: Hammer,
      color: 'var(--color-category-kerajinan)',
      description: 'Handmade, souvenir, seni',
      count: umkm.filter(({ category }) => category.includes('kerajinan'))
        .length,
    },
  ];

  // Show skeleton while loading
  if (isLoading) {
    return <PageSkeleton />;
  }

  return (
    <main className='min-h-screen'>
      <section className='relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center'>
        <ImageWithFallback
          src='/images/bg.webp'
          alt='Background'
          width={1920}
          height={1080}
          priority
          fetchPriority='high'
          className='absolute inset-0 w-full h-full object-cover object-center'
        />

        <div className='inset-0 bg-white/70 absolute backdrop-blur-xs'></div>

        <div className='max-w-5xl mx-auto text-center z-10'>
          <div className='inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 font-medium text-sm'>
            <Sparkles className='size-4' />
            Temukan UMKM di Sekitar Anda
          </div>

          <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight font-montserrat'>
            <span className='text-transparent bg-clip-text bg-linear-to-r from-primary via-secondary to-accent'>
              Riloka
            </span>{' '}
            — Jelajahi Dunia UMKM Lokal
          </h1>

          <p className='text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed'>
            Platform direktori untuk menemukan dan mendukung Usaha Mikro, Kecil,
            dan Menengah di sekitar Anda
          </p>

          <form
            onSubmit={handleSearch}
            className='relative max-w-2xl mx-auto mb-12'
          >
            {/* <div className='absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-2xl' /> */}
            <div className='relative flex items-center gap-3 bg-white/90 border border-muted-foreground/70 rounded-full px-6 py-4 shadow-lg hover:shadow-xl transition-shadow'>
              <Search className='size-5 text-muted-foreground shrink-0' />
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
                className='px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-hover transition-colors'
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
      {/* Kategori Section */}
      <section className='container mx-auto px-6 lg:px-12 py-16 md:py-20'>
        <div className='flex flex-col items-center justify-center text-center w-full max-w-4xl mx-auto'>
          <div className='inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4 font-medium text-sm'>
            <Tag className='size-4' />
            Kategori
          </div>
          <h2 className='text-4xl md:text-5xl font-bold text-foreground mb-4'>
            Jelajahi Berbagai Kategori
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Temukan UMKM favorit Anda berdasarkan kategori yang tersedia
          </p>
        </div>

        {/* Grid Kategori */}
        <div className='mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-6xl mx-auto'>
          {categories.map(
            ({ id, name, icon: Icon, color, description, count }) => {
              return (
                <Link
                  key={id}
                  href={`/umkm?category=${name}`}
                  className='group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/20 hover:-translate-y-1 text-left cursor-pointer'
                >
                  {/* Background gradient effect on hover */}
                  <div
                    className='absolute inset-0 rounded-2xl bg-linear-to-br from-white to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                    style={{
                      background: `linear-gradient(135deg, ${color}15 0%, white 100%)`,
                    }}
                  />

                  <div className='relative z-10'>
                    <div
                      className='w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300'
                      style={{
                        backgroundColor: `${color}15`,
                        color,
                      }}
                    >
                      <Icon className='size-7' />
                    </div>

                    <h3
                      className='text-xl font-bold mb-2 group-hover:translate-x-1 transition-transform duration-300'
                      style={{ color }}
                    >
                      {name.replace(/^./, (char) => char.toUpperCase())}
                    </h3>

                    <p className='text-muted-foreground text-sm mb-3 leading-relaxed'>
                      {description}
                    </p>
                    <div className='flex items-center justify-between'>
                      <span className='text-xs font-medium text-muted-foreground'>
                        {count}
                      </span>
                      <div className='opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300'>
                        <ArrowRight className='size-4' style={{ color }} />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            }
          )}
        </div>
      </section>

      <section className='bg-surface'>
        <div className='container mx-auto px-6 lg:px-12 py-16 md:py-20'>
          <div className='flex justify-center items-center flex-col gap-4'>
            <div className='text-center mb-8'>
              <div className='inline-flex items-center gap-2 bg-linear-to-r from-yellow-500/10 to-orange-500/10 text-yellow-700 px-4 py-2 rounded-full mb-4 font-medium text-sm'>
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
          </div>

          <HorizontalScroll>
            {isLoading
              ? // Show skeleton cards while loading
                [...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className='flex-none w-88 md:w-96 snap-center'
                  >
                    <CardSkeleton />
                  </div>
                ))
              : featuredUmkm.map((umkm) => (
                  <div
                    key={umkm.id}
                    className='flex-none w-88 md:w-96 snap-center'
                  >
                    <Card umkm={umkm} />
                  </div>
                ))}
          </HorizontalScroll>

          <div className='flex justify-center items-center mt-8'>
            <Link
              href='/umkm'
              className='w-max bg-primary rounded-full px-6 py-4 shadow-lg hover:bg-primary-hover hover:shadow-xl hover:-translate-y-1 text-white font-semibold hover:gap-3 transition-all group'
            >
              Lihat Semua UMKM
            </Link>
          </div>
        </div>
      </section>

      {/* Promo Section */}
      <section className='container mx-auto px-6 lg:px-12 py-16 md:py-20'>
        <div className='flex justify-center items-center flex-col gap-4'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center gap-2 bg-linear-to-r from-red-500/10 to-pink-500/10 text-red-600 px-4 py-2 rounded-full mb-4 font-medium text-sm'>
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
          {isLoading
            ? // Show skeleton promo cards while loading
              [...Array(2)].map((_, index) => (
                <div
                  key={index}
                  className='min-w-full md:min-w-[50%] lg:min-w-[33.333%] p-2'
                >
                  <PromoCardSkeleton />
                </div>
              ))
            : promo.map((promo) => (
                <div
                  key={promo.id}
                  className='flex-none w-80 md:w-96 snap-center'
                >
                  <PromoCard promo={promo} />
                </div>
              ))}
        </HorizontalScroll>
      </section>

      {/* marquee */}
      <section className='bg-primary'>
        <Marquee />
      </section>
      {/* testimonial */}
      <section className='container mx-auto px-6 lg:px-12 py-16 md:py-20'>
        <div className='flex justify-center items-center flex-col gap-4 mb-12'>
          <div className='text-center'>
            <div className='inline-flex items-center gap-2 bg-linear-to-r from-purple-500/10 to-indigo-500/10 text-purple-700 px-4 py-2 rounded-full mb-4 font-medium text-sm'>
              <Mail className='size-4' />
              Testimoni
            </div>
            <h2 className='text-4xl md:text-5xl font-bold text-foreground mb-3'>
              Apa Kata Mereka?
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Pengalaman nyata dari pelanggan yang telah mendukung UMKM lokal
            </p>
          </div>
        </div>

        {testimonialLoading ? (
          <TestimonialSliderSkeleton />
        ) : (
          <TestimonialSlider testimonials={testimonials} />
        )}
      </section>

      {/* cta */}
      <section className='bg-primary'>
        <div className='container mx-auto px-6 lg:px-12 py-16 md:py-20'>
          <div className='flex flex-col items-center justify-center text-center w-full max-w-3xl mx-auto gap-6'>
            <h1 className='text-2xl md:text-4xl font-bold text-white'>
              Siap dukung UMKM Lokal?
            </h1>

            <p className='text-lg text-white'>
              Bergabunglah dengan komunitas kami untuk menemukan dan mendukung
              usaha kecil menengah di Kota Banjar
            </p>

            <Link
              href='/umkm'
              className='w-max bg-secondary rounded-full px-6 py-4 shadow-lg hover:bg-secondary-hover hover:shadow-xl hover:-translate-y-1 text-white font-semibold hover:gap-3 transition-all group'
            >
              Lihat Semua UMKM
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
