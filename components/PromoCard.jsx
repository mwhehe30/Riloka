import { format } from 'date-fns';
import { CalendarIcon, StarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ImageWithFallback from './ImageWithFallback';

const PromoCard = ({ promo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  // Validasi data promo
  if (!promo) {
    console.warn('Promo data is undefined');
    return null;
  }

  const handleDetailClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleVisitUMKM = () => {
    if (promo?.slug) {
      // Navigasi normal ke halaman UMKM (tidak buka tab baru)
      router.push(`/umkm/${promo.slug}`);
    }
  };

  // Data fallback
  const promoData = {
    id: promo.id || 0,
    slug: promo.slug || 'unknown',
    name: promo.name || 'Untitled Promo',
    description: promo.description || 'Tidak ada deskripsi.',
    image: promo.image || '/default-image.jpg',
    date: promo.date || new Date().toISOString(),
    status: promo.status || false,
    rating: promo.rating || 0,
    review: promo.review || 0,
  };

  return (
    <>
      {/* Promo Card */}
      <div className='min-w-full md:min-w-[50%] lg:min-w-[33.333%] p-4'>
        <div className='bg-white rounded-2xl shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full hover:shadow-xl'>
          <div className='relative w-full pt-[100%] overflow-hidden'>
            <ImageWithFallback
              src={promoData.image}
              alt={promoData.name}
              width={500}
              height={500}
              className='absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105'
              priority={false}
            />
            <span className='absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg z-10'>
              Promo
            </span>
          </div>
          <div className='p-6 flex flex-col flex-grow'>
            <h3 className='text-xl font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]'>
              {promoData.name}
            </h3>

            {/* Rating Section */}
            <div className='flex items-center gap-2 mb-3'>
              <div className='flex items-center gap-1'>
                <StarIcon className='w-4 h-4 fill-amber-500 text-amber-500' />
                <span className='text-sm font-semibold text-gray-800'>
                  {promoData.rating}
                </span>
              </div>
              <span className='text-gray-500 text-sm'>
                ({promoData.review} reviews)
              </span>
            </div>

            <div className='mt-auto'>
              <div className='flex items-center gap-2 text-gray-500 mb-4'>
                <CalendarIcon className='w-5 h-5 text-amber-500' />
                <span className='text-sm'>
                  {promoData.date
                    ? format(new Date(promoData.date), 'dd MMM yyyy')
                    : 'No date'}
                </span>
              </div>
              <button
                onClick={handleDetailClick}
                className='w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg text-center'
              >
                Lihat Detail
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Promo Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 animate-fade-in'>
          <div
            className='bg-white rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto shadow-2xl animate-scale-in scrollbar-none'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className='flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white z-10'>
              <div className='flex-1 min-w-0'>
                <h3 className='text-2xl font-bold text-green-800 truncate pr-4'>
                  {promoData.name}
                </h3>
                {/* Rating in Header */}
                <div className='flex items-center gap-2 mt-2'>
                  <div className='flex items-center gap-1'>
                    <StarIcon className='w-4 h-4 fill-amber-500 text-amber-500' />
                    <span className='text-sm font-semibold text-gray-800'>
                      {promoData.rating}
                    </span>
                  </div>
                  <span className='text-gray-500 text-sm'>
                    ({promoData.review} reviews)
                  </span>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className='text-gray-500 hover:text-error text-2xl transition-colors duration-200 flex-shrink-0 w-8 h-8 flex items-center justify-center'
                aria-label='Close modal'
              >
                &times;
              </button>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2'>
              {/* Image Section - Diperbaiki agar gambar full */}
              <div className='bg-gray-50 flex items-center justify-center p-4'>
                <div className='relative w-full h-96 md:h-full'>
                  <ImageWithFallback
                    src={promoData.image}
                    alt={promoData.name}
                    fill
                    className='object-contain rounded-lg'
                    sizes='(max-width: 1024px) 100vw, 50vw'
                    priority
                  />
                </div>
              </div>

              {/* Content Section */}
              <div className='p-6 lg:p-8 flex flex-col gap-6'>
                {/* Details Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <h4 className='text-green-800 text-sm font-semibold uppercase tracking-wider mb-2'>
                      Nama UMKM
                    </h4>
                    <p className='font-semibold text-gray-800 capitalize'>
                      {promoData.slug?.replace(/-/g, ' ') || 'Tidak tersedia'}
                    </p>
                  </div>
                  <div>
                    <h4 className='text-green-800 text-sm font-semibold uppercase tracking-wider mb-2'>
                      Tanggal Promo
                    </h4>
                    <p className='font-semibold text-gray-800'>
                      {promoData.date
                        ? format(new Date(promoData.date), 'dd MMMM yyyy')
                        : 'Tidak tersedia'}
                    </p>
                  </div>
                  <div>
                    <h4 className='text-green-800 text-sm font-semibold uppercase tracking-wider mb-2'>
                      Rating
                    </h4>
                    <div className='flex items-center gap-2'>
                      <StarIcon className='w-4 h-4 fill-amber-500 text-amber-500' />
                      <span className='font-semibold text-gray-800'>
                        {promoData.rating}
                      </span>
                      <span className='text-gray-500 text-sm'>
                        ({promoData.review})
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className='text-green-800 text-sm font-semibold uppercase tracking-wider mb-2'>
                      Status
                    </h4>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        promoData.status
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {promoData.status ? 'Aktif' : 'Tidak Aktif'}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className='text-green-800 text-lg font-semibold mb-3'>
                    Deskripsi Promo
                  </h4>
                  <div className='text-gray-700 leading-relaxed whitespace-pre-line'>
                    {promoData.description}
                  </div>
                </div>

                {/* Additional Info */}
                <div className='bg-gray-50 p-6 rounded-xl border-l-4 border-amber-500'>
                  <h4 className='text-green-800 text-lg font-semibold mb-3'>
                    Informasi Tambahan
                  </h4>
                  <div className='space-y-3'>
                    <div className='flex items-start gap-3'>
                      <div className='w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0'></div>
                      <p className='text-gray-700'>
                        Promo ini berlaku untuk semua pelanggan
                      </p>
                    </div>
                    <div className='flex items-start gap-3'>
                      <div className='w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0'></div>
                      <p className='text-gray-700'>
                        Dapatkan pengalaman terbaik dengan rating{' '}
                        {promoData.rating} dari {promoData.review} review
                      </p>
                    </div>
                    <div className='flex items-start gap-3'>
                      <div className='w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0'></div>
                      <p className='text-gray-700'>
                        Kunjungi lokasi UMKM untuk informasi lebih lanjut
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className='flex flex-col sm:flex-row gap-4 mt-auto pt-4'>
                  <button
                    onClick={handleVisitUMKM}
                    className='flex-1 bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg text-center'
                  >
                    Kunjungi UMKM
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className='flex-1 bg-error hover:bg-error-hover text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 text-center'
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PromoCard;
