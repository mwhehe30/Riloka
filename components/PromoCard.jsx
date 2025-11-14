import { CalendarIcon, StarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ImageWithFallback from './ImageWithFallback';

const PromoCard = ({ promo, umkm, isInDetailPage = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to ensure scroll is restored when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

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

  const handleContactUMKM = () => {
    // Close modal first
    handleCloseModal();

    // If we're in UMKM detail page context and umkm data is available
    if (isInDetailPage && umkm && umkm.contact) {
      // Try to contact via WhatsApp first
      if (umkm.contact.phone) {
        // Format phone number for WhatsApp (remove any non-digit characters except +)
        const phoneNumber = umkm.contact.phone.replace(/\D/g, '');
        const whatsappUrl = `https://wa.me/${phoneNumber}`;
        window.open(whatsappUrl, '_blank');
      }
      // If no phone, try Instagram
      else if (umkm.contact.instagram) {
        const instagramUrl = `https://www.instagram.com/${umkm.contact.instagram}`;
        window.open(instagramUrl, '_blank');
      }
      // If no contact info, navigate to UMKM page
      else if (promo?.slug) {
        router.push(`/umkm/${promo.slug}`);
      }
    }
    // If not in detail page or no contact info, navigate to UMKM page
    else if (promo?.slug) {
      router.push(`/umkm/${promo.slug}`);
    }
  };

  return (
    <>
      {/* Promo Card */}
      <div className='min-w-full md:min-w-[50%] lg:min-w-[33.333%] p-2'>
        <div className='bg-white rounded-2xl shadow-lg transition-all duration-300 overflow-hidden border border-surface hover:border-primary/40 flex flex-col h-full hover:-translate-y-1 hover:shadow-xl'>
          <div className='relative w-full pt-[100%] overflow-hidden'>
            <ImageWithFallback
              src={promo.image}
              alt={promo.name}
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              className='absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105'
              priority={false}
            />
            <span className='absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg z-10'>
              Promo
            </span>
          </div>
          <div className='p-6 flex flex-col grow'>
            <h3 className='text-xl font-semibold text-gray-800 mb-2 truncate'>
              {promo.name}
            </h3>

            {/* Rating Section */}
            <div className='flex items-center gap-2 mb-3'>
              <div className='flex items-center gap-1'>
                <StarIcon className='w-4 h-4 fill-amber-500 text-amber-500' />
                <span className='text-sm font-semibold text-gray-800'>
                  {promo.rating}
                </span>
              </div>
              <span className='text-gray-500 text-sm'>
                ({promo.review} reviews)
              </span>
            </div>

            <div className='mt-auto'>
              <div className='flex items-center gap-2 text-gray-500 mb-4'>
                <CalendarIcon className='w-5 h-5 text-amber-500' />
                <span className='text-sm'>
                  {new Date(promo.date).toLocaleDateString('id-ID', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
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
        <div className='fixed inset-0 bg-black/70 pb-26 md:pb-0 flex items-center justify-center p-4 z-50 animate-fade-in'>
          <div
            className='bg-white rounded-2xl max-w-6xl w-full max-h-[85vh] overflow-hidden shadow-2xl animate-scale-in flex flex-col'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className='flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white z-10 shrink-0'>
              <div className='flex-1 min-w-0'>
                <h3 className='text-lg md:text-2xl font-bold text-green-800 truncate pr-4'>
                  {promo.name}
                </h3>
              </div>
              <button
                onClick={handleCloseModal}
                className='text-gray-500 hover:text-error text-2xl transition-colors duration-200 shrink-0 w-8 h-8 flex items-center justify-center'
                aria-label='Close modal'
              >
                &times;
              </button>
            </div>

            {/* Content Area */}
            <div className='overflow-y-auto scrollbar-none flex-1'>
              <div className='flex flex-col lg:flex-row'>
                {/* Image Section - Mobile: auto height, Desktop: full height */}
                <div className='lg:w-1/2'>
                  <div className='relative w-full h-auto lg:h-full'>
                    {/* Mobile: Image dengan height auto */}
                    <div className='block lg:hidden'>
                      <ImageWithFallback
                        src={promo.image}
                        alt={promo.name}
                        width={600}
                        height={400}
                        className='w-full h-auto object-contain'
                        sizes='100vw'
                        priority
                      />
                    </div>
                    {/* Desktop: Image dengan fill dan stretch */}
                    <div className='hidden lg:block relative w-full h-full min-h-[400px]'>
                      <ImageWithFallback
                        src={promo.image}
                        alt={promo.name}
                        fill
                        sizes='50vw'
                        className='object-cover'
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className='p-6 lg:p-8 flex flex-col gap-6 lg:w-1/2 lg:overflow-y-auto lg:max-h-[calc(85vh-80px)]'>
                  {/* Details Grid */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <h4 className='text-green-800 text-sm font-semibold uppercase tracking-wider mb-2'>
                        Nama UMKM
                      </h4>
                      <p className='font-semibold text-gray-800 capitalize'>
                        {promo.slug?.replace(/-/g, ' ') || 'Tidak tersedia'}
                      </p>
                    </div>
                    <div>
                      <h4 className='text-green-800 text-sm font-semibold uppercase tracking-wider mb-2'>
                        Tanggal Promo
                      </h4>
                      <p className='font-semibold text-gray-800'>
                        {new Date(promo.date).toLocaleDateString('id-ID', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <div>
                      <h4 className='text-green-800 text-sm font-semibold uppercase tracking-wider mb-2'>
                        Rating
                      </h4>
                      <div className='flex items-center gap-2'>
                        <StarIcon className='w-4 h-4 fill-amber-500 text-amber-500' />
                        <span className='font-semibold text-gray-800'>
                          {promo.rating}
                        </span>
                        <span className='text-gray-500 text-sm'>
                          ({promo.review})
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className='text-green-800 text-sm font-semibold uppercase tracking-wider mb-2'>
                        Status
                      </h4>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          promo.status
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {promo.status ? 'Aktif' : 'Tidak Aktif'}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className='text-green-800 text-lg font-semibold mb-3'>
                      Deskripsi Promo
                    </h4>
                    <div className='text-gray-700 leading-relaxed whitespace-pre-line'>
                      {promo.description}
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className='bg-gray-50 p-6 rounded-xl border-l-4 border-amber-500'>
                    <h4 className='text-green-800 text-lg font-semibold mb-3'>
                      Informasi Tambahan
                    </h4>
                    <div className='space-y-3'>
                      <div className='flex items-start gap-3'>
                        <div className='w-2 h-2 bg-amber-500 rounded-full mt-2 shrink-0'></div>
                        <p className='text-gray-700'>
                          Promo ini berlaku untuk semua pelanggan
                        </p>
                      </div>
                      <div className='flex items-start gap-3'>
                        <div className='w-2 h-2 bg-amber-500 rounded-full mt-2 shrink-0'></div>
                        <p className='text-gray-700'>
                          Dapatkan pengalaman terbaik dengan rating{' '}
                          {promo.rating} dari {promo.review} review
                        </p>
                      </div>
                      <div className='flex items-start gap-3'>
                        <div className='w-2 h-2 bg-amber-500 rounded-full mt-2 shrink-0'></div>
                        <p className='text-gray-700'>
                          Kunjungi lokasi UMKM untuk informasi lebih lanjut
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className='flex flex-col sm:flex-row gap-4 mt-auto pt-4'>
                    <button
                      onClick={handleContactUMKM}
                      className='flex-1 bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg text-center'
                    >
                      {isInDetailPage ? 'Hubungi UMKM' : 'Kunjungi UMKM'}
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
        </div>
      )}
    </>
  );
};

export default PromoCard;
