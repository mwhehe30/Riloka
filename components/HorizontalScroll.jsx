'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

export default function HorizontalScroll({ children, itemWidth = 320 }) {
  const scrollRef = useRef(null);

  const scrollByAmount = (amount) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: amount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className='relative'>
      <div
        ref={scrollRef}
        className='flex overflow-x-auto gap-6 pb-4 scrollbar-none snap-x snap-mandatory'
      >
        {children.map((child, i) => (
          <div key={i} className={`flex-none`} style={{ width: itemWidth }}>
            {child}
          </div>
        ))}
      </div>

      {/* Prev Button */}
      <button
        onClick={() => scrollByAmount(-itemWidth)}
        className='absolute top-1/2 -left-6 -translate-y-1/2 p-3 rounded-full bg-white border-2 border-gray-200 shadow-xl hover:bg-primary hover:text-white hover:border-primary transition-all z-10 hover:scale-110'
      >
        <ChevronLeft className='size-6' />
      </button>

      {/* Next Button */}
      <button
        onClick={() => scrollByAmount(itemWidth)}
        className='absolute top-1/2 -right-6 -translate-y-1/2 p-3 rounded-full bg-white border-2 border-gray-200 shadow-xl hover:bg-primary hover:text-white hover:border-primary transition-all z-10 hover:scale-110'
      >
        <ChevronRight className='size-6' />
      </button>
    </div>
  );
}
