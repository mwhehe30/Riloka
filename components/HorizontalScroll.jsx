'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const HorizontalSlider = ({ children }) => {
  const containerRef = useRef(null);
  const [scrollState, setScrollState] = useState({
    canScrollLeft: false,
    canScrollRight: false,
  });

  const checkScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setScrollState({
      canScrollLeft: scrollLeft > 0,
      canScrollRight: scrollLeft < scrollWidth - clientWidth - 1,
    });
  };

  const scrollBy = (amount) => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({
      left: amount,
      behavior: 'smooth',
    });
    setTimeout(checkScroll, 300);
  };

  useEffect(() => {
    checkScroll();
  }, [children]);

  return (
    <div className='relative'>
      <div
        ref={containerRef}
        onScroll={checkScroll}
        className='flex overflow-x-auto space-x-6 pb-4 scrollbar-none snap-x snap-mandatory px-6'
      >
        {children}
      </div>

      {scrollState.canScrollLeft && (
        <button
          onClick={() => scrollBy(-400)}
          className='flex absolute top-1/2 -left-3 md:-left-6 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white border border-gray-200 shadow-lg hover:bg-primary hover:text-white transition-all z-10'
        >
          <ChevronLeft className='size-6' />
        </button>
      )}

      {scrollState.canScrollRight && (
        <button
          onClick={() => scrollBy(400)}
          className='flex absolute top-1/2 -right-3 md:-right-6 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white border border-gray-200 shadow-lg hover:bg-primary hover:text-white transition-all z-10'
        >
          <ChevronRight className='size-6' />
        </button>
      )}
    </div>
  );
};

export default HorizontalSlider;
