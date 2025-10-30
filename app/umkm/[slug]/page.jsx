'use client';

import ImageWithFallback from '@/components/ImageWithFallback';
import PromoCard from '@/components/PromoCard';
import { getUmkmBySlug } from '@/lib/api';
import {
  Box,
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

  // Debug activeImage changes
  useEffect(() => {
    console.log('Active Image changed:', activeImage);
  }, [activeImage]);

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
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link disalin ke clipboard');
    }
  };

  const handleImageClick = (img) => {
    console.log('Clicked image:', img);
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
          // Set gambar aktif pertama kali ketika data berubah
          if (res?.images?.length > 0) {
            console.log('Setting initial image:', res.images[0]);
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
      <section className='min-h-screen bg-white'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse'>
          <div className='w-48 h-5 bg-gray-200 rounded mb-6'></div>
          <div className='w-full aspect-[21/9] bg-gray-200 rounded-3xl mb-8'></div>
          <div className='grid lg:grid-cols-3 gap-8'>
            <div className='lg:col-span-2 space-y-8'>
              <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-8 space-y-6'>
                <div className='w-2/3 h-6 bg-gray-200 rounded'></div>
                <div className='w-full h-4 bg-gray-200 rounded'></div>
                <div className='w-5/6 h-4 bg-gray-200 rounded'></div>
              </div>
            </div>
            <div className='space-y-6'>
              <div className='bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-8'>
                <div className='p-6'>
                  <div className='w-24 h-6 bg-gray-200 rounded mb-4'></div>
                  <div className='w-full h-[300px] sm:h-[400px] md:h-[500px] bg-gray-200 rounded-xl mb-4'></div>
                  <div className='w-full h-10 bg-gray-300 rounded-xl'></div>
                </div>
              </div>
            </div>
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

  return (
    <section className='min-h-screen bg-white pt-20'>
      <div className='relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/7] overflow-hidden rounded-b-4xl'>
        <ImageWithFallback
          src={detailUmkm?.thumb}
          alt={detailUmkm?.name}
          fill
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
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <article className='relative overflow-hidden rounded-3xl shadow-2xl mb-8'>
          <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent' />

          <div className='absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-12 text-white'>
            <div className='flex flex-wrap gap-3 mb-4'>
              <span className='inline-flex items-center rounded-full px-3 py-1 text-xs sm:text-sm font-medium bg-white/20 backdrop-blur-xl border border-white/30'>
                {Array.isArray(detailUmkm.category)
                  ? detailUmkm.category.join(' & ')
                  : detailUmkm.category}
              </span>
              {detailUmkm?.featured && (
                <span className='inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs sm:text-sm font-medium bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg'>
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
            {/* Tabs */}
            <div className='bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden'>
              <div className='flex overflow-x-auto border-b border-gray-200 scrollbar-none'>
                {tabs.map(({ id, label, icon: Icon }) => {
                  return (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id)}
                      className={`flex flex-1 items-center justify-center gap-2 py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base font-medium transition-all whitespace-nowrap ${
                        activeTab === id
                          ? 'text-primary border-b-2 border-primary'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Icon className='w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0' />
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div className='p-4 sm:p-8'>
                {activeTab === 'tentang' && (
                  <div className='space-y-6'>
                    <h2 className='text-xl sm:text-2xl font-bold text-gray-900'>
                      Tentang {detailUmkm?.name}
                    </h2>
                    <p className='text-gray-600 leading-relaxed text-base sm:text-lg'>
                      {detailUmkm?.description}
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
                    {detailUmkm?.contact?.phone && (
                      <a
                        href={`https://wa.me/${detailUmkm?.contact?.phone?.replace(
                          /\D/g,
                          ''
                        )}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='block w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors text-center shadow-lg hover:shadow-xl'
                      >
                        Hubungi via WhatsApp
                      </a>
                    )}
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
                      {detailUmkm?.reviews?.map(({ id, name, comment }) => (
                        <div
                          key={id}
                          className='rounded-xl p-6 border border-surface hover:border-primary/40 transition-colors'
                        >
                          <div className='flex items-start gap-4'>
                            <div className='flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center'>
                              <User className='w-5 h-5 sm:w-6 sm:h-6 text-white' />
                            </div>
                            <div>
                              <h4 className='font-bold text-gray-900'>
                                {name}
                              </h4>
                              <p className='text-gray-600 leading-relaxed text-sm sm:text-base'>
                                {comment}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Promo Section */}
            {detailUmkm?.promo?.length > 0 ? (
              <div className='bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100'>
                <div className='flex items-center justify-between mb-6'>
                  <h2 className='text-2xl font-bold text-gray-900'>
                    Promo Spesial
                  </h2>
                </div>

                <div className='flex gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-2'>
                  {detailUmkm.promo.map((promo) => (
                    <div key={promo.id} className='flex-none w-72 sm:w-80'>
                      <PromoCard promo={promo} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className='bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100'>
                <div className='flex items-center justify-between mb-6'>
                  <h2 className='text-2xl font-bold text-gray-900'>
                    Promo Spesial
                  </h2>
                </div>

                <div className='flex gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-2'>
                  <p className='text-gray-500'>Belum ada promo tersedia.</p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className='space-y-6'>
            <div className='bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-8'>
              <h3 className='text-xl font-bold mb-4 flex items-center gap-2 bg-primary text-white p-4 justify-center'>
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
                  className='flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-xl transition-colors shadow-lg hover:shadow-xl'
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
              className={`relative flex-shrink-0 w-32 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300
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
        className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 ${bg} rounded-xl flex items-center justify-center`}
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
          <p className='text-gray-900 break-words'>{value}</p>
        )}
      </div>
    </div>
  );
}
