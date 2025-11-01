'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

const partnerLogos = [
  '/logo.png',
  '/images/logo-diatas-meja.webp',
  '/images/logo-fukunobu.webp',
  '/images/logo-lebiru.webp',
  '/images/logo-nubani.webp',
  '/images/logo-steak-batmans.webp',
];

export default function Marquee() {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const container = marqueeRef.current;
    if (!container) return;

    const clone = container.innerHTML;
    container.insertAdjacentHTML('beforeend', clone);
  }, []);

  return (
    <section className='py-12 pb-16 overflow-hidden'>
      <div className='container mx-auto px-6 lg:px-12'>
        <h2 className='text-center text-2xl md:text-3xl font-bold text-white mb-8'>
          UMKM Yang Telah Bergabung
        </h2>

        <div className='relative overflow-hidden'>
          <div className='absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-primary to-transparent z-10'></div>
          <div className='absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-primary to-transparent z-10'></div>

          <div
            ref={marqueeRef}
            className='flex whitespace-nowrap animate-marquee'
          >
            {partnerLogos.map((src, index) => (
              <div
                key={index}
                className='mx-4 md:mx-8 shrink-0 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300'
              >
                <div className='flex items-center justify-center rounded-xl overflow-hidden'>
                  <Image
                    src={src}
                    alt={`Partner logo ${index + 1}`}
                    width={200}
                    height={100}
                    className='w-20 h-20 md:w-30 md:h-30 object-contain hover:scale-105 transition-transform duration-300'
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
