import React from 'react';
import Skeleton from './Skeleton';

const PromoCardSkeleton = () => {
  return (
    <div className='min-w-full md:min-w-[50%] lg:min-w-[33.333%] p-2'>
      <div className='bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full'>
        <div className='relative w-full pt-[100%] overflow-hidden'>
          <Skeleton className="absolute top-0 left-0 w-full h-full" />
          <Skeleton className="absolute top-4 right-4 w-20 h-8 rounded-full" />
        </div>
        <div className='p-6 flex flex-col flex-grow'>
          <Skeleton className='text-xl font-semibold text-gray-800 mb-2 h-6 w-3/4' />

          {/* Rating Section */}
          <div className='flex items-center gap-2 mb-3'>
            <Skeleton className='w-16 h-4' />
            <Skeleton className='w-10 h-4' />
          </div>

          <div className='mt-auto'>
            <div className='flex items-center gap-2 text-gray-500 mb-4'>
              <Skeleton className='w-24 h-4' />
            </div>
            <Skeleton className='w-full h-12 rounded-full' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoCardSkeleton;