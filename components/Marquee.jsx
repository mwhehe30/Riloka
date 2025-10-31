import Image from 'next/image';

const partnerLogos = [
  '/logo.png',
  '/images/logo-diatas-meja.webp',
  '/images/logo-fukunobu.webp',
  '/images/logo-lebiru.webp',
  '/images/logo-nubani.webp',
  '/images/logo-steak-batmans.webp',
];

const Marquee = () => {
  return (
    <section className='py-12 pb-16 overflow-hidden'>
      <div className='container mx-auto px-6 lg:px-12'>
        <h2 className='text-center text-2xl md:text-3xl font-bold text-white mb-8'>
          UMKM Yang Telah Bergabung
        </h2>

        {/* Marquee Container */}
        <div className='relative overflow-hidden'>
          {/* Gradient Overlays */}
          <div className='absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-primary to-transparent z-10'></div>
          <div className='absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-primary to-transparent z-10'></div>

          {/* Marquee Track */}
          <div className='flex animate-marquee whitespace-nowrap'>
            {/* First Set */}
            {partnerLogos.map((src, index) => (
              <div
                key={`first-${index}`}
                className='mx-4 md:mx-8 flex-shrink-0 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 hover:scale-105'
              >
                <Image
                  src={src}
                  alt={`Partner logo ${index + 1}`}
                  width={200}
                  height={100}
                  className='w-32 h-16 md:w-40 md:h-20 object-contain'
                />
              </div>
            ))}

            {/* Duplicate Set for Seamless Loop */}
            {partnerLogos.map((src, index) => (
              <div
                key={`second-${index}`}
                className='mx-4 md:mx-8 flex-shrink-0 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 hover:scale-105'
              >
                <Image
                  src={src}
                  alt={`Partner logo ${index + 1}`}
                  width={200}
                  height={100}
                  className='w-32 h-16 md:w-40 md:h-20 object-contain'
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Marquee;
