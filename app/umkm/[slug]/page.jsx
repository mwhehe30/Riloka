'use client';

import ImageWithFallback from '@/components/ImageWithFallback';
import { getUmkmBySlug } from '@/lib/api';
import {
  ChevronLeft,
  Clock,
  Info,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Share2,
  Star,
  User,
  UtensilsCrossed,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import NotFound from './not-found';

export default function Page() {
  const { slug } = useParams();
  const [detailUmkm, setDetailUmkm] = useState(null);
  const [activeTab, setActiveTab] = useState('tentang');
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchDetail() {
      try {
        setIsLoading(true);
        const res = await getUmkmBySlug(slug);
        if (!res) {
          setNotFound(true);
        } else {
          setDetailUmkm(res);
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
    { id: 'menu', label: 'Menu', icon: UtensilsCrossed },
    { id: 'ulasan', label: 'Ulasan', icon: Star },
  ];

  return (
    <section className='min-h-screen bg-white'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-26'>
        {/* Back Button */}
        <Link
          href='/umkm'
          className='inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors duration-300 mb-6 group'
        >
          <ChevronLeft className='w-5 h-5 group-hover:-translate-x-1 transition-transform' />
          <span className='font-medium'>Kembali ke daftar UMKM</span>
        </Link>

        {/* Hero Section */}
        <article className='relative overflow-hidden rounded-3xl shadow-2xl mb-8'>
          <figure className='relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] overflow-hidden'>
            <ImageWithFallback
              src={detailUmkm?.thumb}
              alt={detailUmkm?.name}
              fill
              className='object-cover hover:scale-105 transition-transform duration-700'
            />
          </figure>

          <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent' />

          <div className='absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-12 text-white'>
            <div className='flex flex-wrap gap-3 mb-4'>
              <span className='inline-flex items-center rounded-full px-3 py-1 text-xs sm:text-sm font-medium bg-white/20 backdrop-blur-xl border border-white/30'>
                {detailUmkm?.category}
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

          <button className='absolute top-4 right-4 sm:top-6 sm:right-6 p-3 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 text-white hover:bg-white/30 hover:scale-110 transition-all duration-300 shadow-lg'>
            <Share2 className='w-5 h-5 sm:w-6 sm:h-6' />
          </button>
        </article>

        {/* Content Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Tabs */}
            <div className='bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden'>
              <div className='flex flex-wrap border-b border-gray-200'>
                {tabs.map(({ id, label, icon: Icon }) => {
                  return (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id)}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 sm:py-4 px-2 sm:px-4 text-sm sm:text-base font-medium transition-all ${
                        activeTab === id
                          ? 'text-primary border-b-2 border-primary'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Icon className='w-4 h-4 sm:w-5 sm:h-5' />
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
                      <InfoItem
                        icon={MapPin}
                        color='text-primary'
                        bg='bg-primary/10'
                        title='Alamat'
                        value={detailUmkm?.address}
                      />
                      <InfoItem
                        icon={Clock}
                        color='text-orange-600'
                        bg='bg-orange-50'
                        title='Jam Operasional'
                        value={`${detailUmkm?.hours?.open} - ${detailUmkm?.hours?.close}`}
                      />
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

                {/* Menu */}
                {activeTab === 'menu' && (
                  <div className='space-y-6'>
                    <h2 className='text-2xl font-bold text-gray-900'>
                      Menu Kami
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

            {/* Gallery */}
            {detailUmkm?.images?.length > 1 && (
              <div className='bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100'>
                <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                  Galeri
                </h2>
                <div className='flex gap-4 overflow-x-auto scrollbar-none scroll-smooth'>
                  {detailUmkm.images.map((img, idx) => (
                    <div
                      key={idx}
                      className='relative flex-shrink-0 w-56 h-56 sm:w-64 sm:h-64 rounded-xl overflow-hidden group'
                    >
                      <ImageWithFallback
                        src={img}
                        alt={`${detailUmkm.name} ${idx + 1}`}
                        fill
                        className='object-cover group-hover:scale-110 transition-transform duration-500'
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className='space-y-6'>
            <div className='bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-8'>
              <div className='p-6'>
                <h3 className='text-xl font-bold text-gray-900 mb-4'>Lokasi</h3>
                <div className='w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-xl overflow-hidden mb-4'>
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
