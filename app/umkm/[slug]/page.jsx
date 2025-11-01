'use client';

import ImageWithFallback from '@/components/ImageWithFallback';
import PromoCard from '@/components/PromoCard';
import { getUmkmBySlug } from '@/lib/api';
import {
  Box,
  ChevronDown,
  Clock,
  Image,
  Info,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Pin,
  Share2,
  Star,
  ThumbsUp,
  User,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import NotFound from './not-found';

export default function Page() {
  const { slug } = useParams();
  const [detailUmkm, setDetailUmkm] = useState(null);
  const [activeTab, setActiveTab] = useState('tentang');
  const [activeImage, setActiveImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: detailUmkm.name,
      text: detailUmkm.description || 'Cek UMKM lokal ini!',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        alert('Share gagal, coba salin link ini: ' + window.location.href);
        console.error(err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link disalin ke clipboard');
    }
  };

  const handleImageClick = (img) => {
    setActiveImage(img);
  };

  useEffect(() => {
    async function fetchDetail() {
      try {
        setIsLoading(true);
        const res = await getUmkmBySlug(slug);
        if (!res) {
          setNotFound(true);
        } else {
          setDetailUmkm(res);
          if (res?.images?.length > 0) {
            setActiveImage(res.images[0]);
          }
        }
      } catch (error) {
        console.error(error);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDetail();
  }, [slug]);

  if (notFound) {
    return <NotFound />;
  }

  if (isLoading || !detailUmkm) {
    return (
      <section className='min-h-screen bg-white pt-20'>
        {/* Hero Section Skeleton */}
        <div className='relative aspect-4/3 sm:aspect-video md:aspect-21/7 bg-gray-200 animate-pulse'>
          <div className='absolute inset-0 bg-linear-to-t from-gray-300 to-transparent'></div>
        </div>

        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-10'>
          {/* Content Grid */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Main Content Skeleton */}
            <div className='lg:col-span-2 space-y-8'>
              {/* Tabs Skeleton */}
              <div className='bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden animate-pulse'>
                <div className='flex border-b border-gray-200'>
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className='flex-1 py-4 px-6'>
                      <div className='h-5 bg-gray-200 rounded mx-auto w-20'></div>
                    </div>
                  ))}
                </div>
                <div className='p-8 space-y-4'>
                  <div className='h-6 bg-gray-200 rounded w-1/3'></div>
                  <div className='h-4 bg-gray-200 rounded w-full'></div>
                  <div className='h-4 bg-gray-200 rounded w-5/6'></div>
                  <div className='h-4 bg-gray-200 rounded w-4/5'></div>

                  {/* Contact Info Skeleton */}
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6'>
                    {[1, 2].map((i) => (
                      <div key={i} className='flex gap-4'>
                        <div className='w-12 h-12 bg-gray-200 rounded-xl'></div>
                        <div className='flex-1 space-y-2'>
                          <div className='h-3 bg-gray-200 rounded w-16'></div>
                          <div className='h-4 bg-gray-200 rounded w-32'></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className='h-12 bg-gray-200 rounded-xl w-full'></div>
                </div>
              </div>

              {/* Promo Section Skeleton */}
              <div className='bg-white rounded-2xl shadow-lg p-8 border border-gray-100 animate-pulse'>
                <div className='h-6 bg-gray-200 rounded w-40 mb-6'></div>
                <div className='flex gap-6 overflow-hidden'>
                  {[1, 2].map((i) => (
                    <div key={i} className='flex-none w-72 sm:w-80'>
                      <div className='h-48 bg-gray-200 rounded-xl'></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Skeleton */}
            <aside className='space-y-6'>
              <div className='bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-8 animate-pulse'>
                <div className='h-14 bg-gray-200'></div>
                <div className='px-6 pb-6 space-y-6 pt-4'>
                  <div className='space-y-2'>
                    <div className='h-5 bg-gray-200 rounded w-20'></div>
                    <div className='h-4 bg-gray-200 rounded w-full'></div>
                    <div className='h-4 bg-gray-200 rounded w-3/4'></div>
                  </div>
                  <div className='space-y-2'>
                    <div className='h-5 bg-gray-200 rounded w-32'></div>
                    <div className='h-4 bg-gray-200 rounded w-40'></div>
                    <div className='h-4 bg-gray-200 rounded w-36'></div>
                  </div>
                  <div className='w-full h-[400px] bg-gray-200 rounded-xl'></div>
                  <div className='h-12 bg-gray-200 rounded-xl w-full'></div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    );
  }

  const tabs = [
    { id: 'tentang', label: 'Tentang', icon: Info },
    { id: 'galeri', label: 'Galeri', icon: Image },
    { id: 'products', label: 'Produk', icon: Box },
    { id: 'ulasan', label: 'Ulasan', icon: Star },
  ];

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <section className='min-h-screen bg-white pt-20'>
      <div className='relative aspect-4/3 sm:aspect-video md:aspect-21/7 overflow-hidden rounded-b-xl md:rounded-b-2xl'>
        <ImageWithFallback
          src={detailUmkm?.thumb}
          alt={detailUmkm?.name}
          fill
          priority
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          className='object-cover'
        />
        <div className='absolute inset-0 bg-black/40 backdrop-blur-md flex flex-col gap-4 items-center justify-center p-4'>
          {detailUmkm.featured && (
            <div className='inline-flex items-center gap-2 bg-secondary/10 text-yellow-300 px-4 py-2 rounded-full mb-4 font-medium text-sm'>
              <ThumbsUp className='size-4' />
              Rekomendasi
            </div>
          )}

          <h1 className='text-4xl md:text-6xl font-bold text-white'>
            {detailUmkm?.name}
          </h1>

          <p className='text-white/90 text-sm sm:text-base text-center'>
            {detailUmkm?.description}
          </p>

          <div className='flex flex-wrap items-center gap-4 text-white/90 text-sm sm:text-base'>
            <div className='flex items-center gap-2'>
              <div className='p-2 bg-white/10 rounded-lg'>
                <Star className='w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400' />
              </div>
              <span className='font-semibold text-base'>
                {detailUmkm?.rating || '0.0'}({detailUmkm?.reviewer || '0'}{' '}
                ulasan)
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='p-2 bg-white/10 rounded-lg '>
                <Clock className='w-4 h-4 sm:w-5 sm:h-5' />
              </div>
              <span className='font-medium'>
                {detailUmkm?.hours?.open} - {detailUmkm?.hours?.close}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 pb-10'>
        <article className='relative overflow-hidden rounded-3xl shadow-2xl mb-8'>
          <div className='absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent' />

          <div className='absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-12 text-white'>
            <div className='flex flex-wrap gap-3 mb-4'>
              <span className='inline-flex items-center rounded-full px-3 py-1 text-xs sm:text-sm font-medium bg-white/20 backdrop-blur-xl border border-white/30'>
                {Array.isArray(detailUmkm.category)
                  ? detailUmkm.category.join(' & ')
                  : detailUmkm.category}
              </span>
              {detailUmkm?.featured && (
                <span className='inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs sm:text-sm font-medium bg-linear-to-r from-yellow-500 to-yellow-600 text-white shadow-lg'>
                  <Star className='w-4 h-4 fill-current' />
                  Rekomendasi
                </span>
              )}
            </div>

            <h1 className='text-2xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight'>
              {detailUmkm?.name}
            </h1>

            <div className='flex flex-wrap items-center gap-4 text-white/90 text-sm sm:text-base'>
              <div className='flex items-center gap-2'>
                <div className='p-2 bg-white/10 rounded-lg backdrop-blur-sm'>
                  <Star className='w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400' />
                </div>
                <span className='font-semibold text-base'>
                  {detailUmkm?.rating || '0.0'}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='p-2 bg-white/10 rounded-lg backdrop-blur-sm'>
                  <Clock className='w-4 h-4 sm:w-5 sm:h-5' />
                </div>
                <span className='font-medium'>
                  {detailUmkm?.hours?.open} - {detailUmkm?.hours?.close}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleShare}
            className='absolute top-4 right-4 sm:top-6 sm:right-6 p-3 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 text-white hover:bg-white/30 hover:scale-110 transition-all duration-300 shadow-lg'
          >
            <Share2 className='w-5 h-5 sm:w-6 sm:h-6' />
          </button>
        </article>

        {/* Content Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Responsive Tabs - Custom Dropdown on mobile, horizontal on larger screens */}
            <div className='bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden'>
              <div className='border-b border-gray-200'>
                {/* Mobile: Custom Dropdown */}
                <div className='sm:hidden'>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className='w-full p-4 text-base font-medium bg-primary text-white border-none focus:outline-none focus:ring-2 focus:ring-primary/50 flex items-center justify-between rounded-t-2xl hover:bg-gray-50 transition-colors'
                  >
                    <div className='flex items-center gap-3'>
                      {activeTabData && (
                        <activeTabData.icon className='w-5 h-5' />
                      )}
                      <span className='font-semibold'>
                        {activeTabData?.label}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-white transition-transform duration-200 ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className='absolute left-4 right-4 bg-white border border-gray-200 rounded-xl shadow-lg z-10 mt-1 max-h-60 overflow-y-auto'>
                      {tabs.map(({ id, label, icon: Icon }) => (
                        <button
                          key={id}
                          onClick={() => {
                            setActiveTab(id);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 p-4 text-left transition-colors border-b border-gray-100 last:border-b-0 ${
                            activeTab === id
                              ? 'bg-primary/10 text-primary font-semibold'
                              : 'text-gray-700 hover:bg-gray-50'
                          } first:rounded-t-xl last:rounded-b-xl`}
                        >
                          <Icon className='w-5 h-5 shrink-0' />
                          <span className='font-medium'>{label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Desktop: Horizontal tabs */}
                <div className='hidden sm:flex overflow-x-auto scrollbar-none'>
                  {tabs.map(({ id, label, icon: Icon }) => {
                    return (
                      <button
                        key={id}
                        onClick={() => setActiveTab(id)}
                        className={`flex flex-1 items-center justify-center gap-2 py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base font-medium transition-all whitespace-nowrap min-w-0 border-b-2 ${
                          activeTab === id
                            ? 'text-white bg-primary border-primary'
                            : 'text-gray-500 hover:text-primary border-transparent hover:bg-primary/10'
                        }`}
                      >
                        <Icon className='w-4 h-4 sm:w-5 sm:h-5 shrink-0' />
                        <span className='truncate'>{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab Content */}
              <div className='p-4 sm:p-8'>
                {activeTab === 'tentang' && (
                  <div className='space-y-6'>
                    <h2 className='text-xl sm:text-2xl font-bold text-gray-900'>
                      Tentang {detailUmkm?.name}
                    </h2>
                    <p className='text-gray-600 leading-relaxed text-base sm:text-lg'>
                      {detailUmkm?.long_desc}
                    </p>

                    {/* Contact Info */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-gray-100 pt-6'>
                      {detailUmkm?.contact?.phone && (
                        <InfoItem
                          icon={Phone}
                          color='text-green-600'
                          bg='bg-green-50'
                          title='Telepon'
                          value={detailUmkm?.contact?.phone}
                          link={`tel:${detailUmkm?.contact?.phone}`}
                        />
                      )}
                      {detailUmkm?.contact?.instagram && (
                        <InfoItem
                          icon={Instagram}
                          color='text-pink-600'
                          bg='bg-pink-50'
                          title='Instagram'
                          value={detailUmkm?.contact?.instagram}
                          link={`https://www.instagram.com/${detailUmkm?.contact?.instagram}`}
                        />
                      )}
                      {detailUmkm?.contact?.email && (
                        <InfoItem
                          icon={Mail}
                          color='text-blue-600'
                          bg='bg-blue-50'
                          title='Email'
                          value={detailUmkm?.contact?.email}
                          link={`mailto:${detailUmkm?.contact?.email}`}
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* Gallery Tab */}
                {activeTab === 'galeri' && (
                  <GallerySection
                    detailUmkm={detailUmkm}
                    activeImage={activeImage}
                    onImageClick={handleImageClick}
                  />
                )}

                {/* Menu */}
                {activeTab === 'products' && (
                  <div className='space-y-6'>
                    <h2 className='text-2xl font-bold text-gray-900'>
                      Produk Kami
                    </h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'>
                      {detailUmkm?.products?.map(
                        ({ id, name, image, price }) => (
                          <div
                            key={id}
                            className='group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300'
                          >
                            <div className='relative h-44 sm:h-48 overflow-hidden'>
                              <ImageWithFallback
                                src={image}
                                alt={name}
                                fill
                                className='object-cover group-hover:scale-110 transition-transform duration-500'
                              />
                            </div>
                            <div className='p-4'>
                              <h3 className='font-bold text-gray-900 text-lg mb-1'>
                                {name}
                              </h3>
                              <p className='text-primary font-bold text-xl'>
                                {price.toLocaleString('id-ID', {
                                  style: 'currency',
                                  currency: 'IDR',
                                })}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Reviews */}
                {activeTab === 'ulasan' && (
                  <div className='space-y-6'>
                    <h2 className='text-2xl font-bold text-gray-900'>
                      Ulasan Pelanggan
                    </h2>
                    <div className='space-y-4'>
                      {detailUmkm?.reviews?.map(
                        ({ id, name, comment, date, rating }) => (
                          <div
                            key={id}
                            className='rounded-xl p-6 border border-surface hover:border-primary/40 transition-colors'
                          >
                            <div className='flex items-start gap-4'>
                              <div className='shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-primary to-primary/70 rounded-full flex items-center justify-center'>
                                <User className='w-5 h-5 sm:w-6 sm:h-6 text-white' />
                              </div>
                              <div className='w-full'>
                                <div className='flex items-center justify-between'>
                                  <h4 className='font-bold text-gray-900'>
                                    {name}
                                  </h4>
                                  <p className='text-gray-600'>
                                    {new Date(date).toLocaleDateString(
                                      'id-ID',
                                      {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                      }
                                    )}
                                  </p>
                                </div>
                                <p className='flex items-center gap-2 text-amber-400'>
                                  <Star className='size-5 fill-amber-400' />
                                  {rating}
                                </p>
                                <p className='text-gray-600 leading-relaxed text-sm sm:text-base'>
                                  {comment}
                                </p>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Promo Section */}
            {detailUmkm?.promo?.length > 0 ? (
              <div className='bg-white rounded-2xl shadow-lg border border-gray-100'>
                <div className='flex items-center justify-between bg-primary px-6 py-4 md:px-8 rounded-t-2xl'>
                  <h2 className='text-2xl font-bold text-white'>
                    Promo Spesial
                  </h2>
                </div>

                <div className='flex gap-6 overflow-x-auto scrollbar-none scroll-smooth p-4'>
                  {detailUmkm.promo.map((promo) => (
                    <div key={promo.id} className='flex-none w-72 sm:w-80'>
                      <PromoCard promo={promo} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className='bg-white rounded-2xl shadow-lg border border-gray-100'>
                <div className='flex items-center justify-between mb-6 bg-primary px-6 py-4 md:px-8 rounded-t-2xl'>
                  <h2 className='text-2xl font-bold text-white'>
                    Promo Spesial
                  </h2>
                </div>

                <div className='flex gap-6 overflow-x-auto scrollbar-none scroll-smooth p-4'>
                  <p className='text-gray-500'>Belum ada promo tersedia.</p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className='space-y-6'>
            <div className='bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-8'>
              <h3 className='text-xl font-bold mb-4 flex items-center gap-2 bg-primary text-white px-6 py-4 md:justify-center'>
                <MapPin className='w-5 h-5' /> Lokasi
              </h3>
              <div className='px-6 pb-6 space-y-6'>
                <div className='flex flex-col gap-2'>
                  <div className='flex items-center gap-2'>
                    <Pin className='w-5 h-5' />
                    <p className='font-bold'>Alamat</p>
                  </div>
                  <p className='text-gray-600'>{detailUmkm?.address}</p>
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2 text-foreground'>
                    <Clock className='w-5 h-5' />
                    <p className='font-bold'>Jam Operasional</p>
                  </div>
                  <div className='flex gap-2 flex-col text-gray-600 font-medium'>
                    <p>
                      {detailUmkm?.hours?.days.slice(0, -1).join(', ') +
                        ' dan ' +
                        detailUmkm?.hours?.days.slice(-1)}
                    </p>
                    <p>
                      {detailUmkm?.hours?.open} - {detailUmkm?.hours?.close} WIB
                    </p>
                  </div>
                </div>
                <div className='w-full h-[400px] rounded-xl overflow-hidden mb-4'>
                  <iframe
                    src={detailUmkm?.map?.url}
                    width='100%'
                    height='100%'
                    style={{ border: 0 }}
                    allowFullScreen
                    loading='lazy'
                  />
                </div>
                <a
                  href={detailUmkm?.map?.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-4 rounded-xl transition-colors shadow-lg hover:shadow-xl'
                >
                  <MapPin className='w-5 h-5' />
                  Buka di Google Maps
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

// Komponen Gallery Terpisah
function GallerySection({ detailUmkm, activeImage, onImageClick }) {
  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-bold text-gray-900'>Galeri</h2>

      {/* Main Image */}
      <div className='relative w-full h-[400px] rounded-xl overflow-hidden group border border-border'>
        <ImageWithFallback
          src={activeImage || detailUmkm?.images?.[0] || detailUmkm?.thumb}
          alt={detailUmkm?.name || 'Gallery Image'}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          className='object-contain group-hover:scale-110 transition-transform duration-500'
          key={activeImage}
        />
      </div>

      {/* Thumbnails */}
      {detailUmkm?.images?.length > 0 ? (
        <div className='flex gap-4 overflow-x-auto scrollbar-none scroll-smooth'>
          {detailUmkm.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => onImageClick(img)}
              className={`relative shrink-0 w-32 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300
                ${
                  activeImage === img
                    ? 'border-primary'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }
              `}
            >
              <ImageWithFallback
                src={img}
                alt={`${detailUmkm?.name} ${idx + 1}`}
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                className='object-cover hover:scale-110 transition-transform duration-300'
              />
              {activeImage === img && (
                <div className='absolute inset-0 bg-primary/20' />
              )}
            </button>
          ))}
        </div>
      ) : (
        <p className='text-gray-500'>Belum ada foto tersedia.</p>
      )}
    </div>
  );
}

/* === Subcomponent for contact info === */
function InfoItem({ icon: Icon, color, bg, title, value, link }) {
  return (
    <div className='flex gap-4 items-start'>
      <div
        className={`shrink-0 w-10 h-10 sm:w-12 sm:h-12 ${bg} rounded-xl flex items-center justify-center`}
      >
        <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${color}`} />
      </div>
      <div>
        <p className='text-sm font-medium text-gray-500 mb-1'>{title}</p>
        {link ? (
          <a
            href={link}
            target='_blank'
            rel='noopener noreferrer'
            className='text-gray-900 hover:text-primary transition-colors font-medium break-all'
          >
            {value}
          </a>
        ) : (
          <p className='text-gray-900 wrap-break-word'>{value}</p>
        )}
      </div>
    </div>
  );
}
