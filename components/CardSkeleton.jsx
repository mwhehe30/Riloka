import React from 'react';
import Skeleton from './Skeleton';

const CardSkeleton = () => {
  return (
    <div className="flex flex-col overflow-hidden border border-surface bg-white shadow-lg shadow-black/5 h-full rounded-2xl">
      {/* Gambar */}
      <div className="relative overflow-hidden aspect-video">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Konten bawah */}
      <div className="flex flex-col flex-1 p-6 space-y-4">
        {/* Alamat */}
        <Skeleton className="h-4 w-3/4" />
        
        {/* Rating & Clock */}
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/3" />
        </div>

        {/* Footer */}
        <div className="mt-auto flex flex-col sm:flex-row items-start gap-4 sm:items-center justify-between pt-3 border-t border-surface">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;