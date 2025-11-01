import Skeleton from '@/components/Skeleton';

const UMKMListSkeleton = () => {
  return (
    <section className='min-h-screen bg-white'>
      {/* Header Section Skeleton */}
      <div className='bg-linear-to-br from-primary via-primary/90 to-accent pt-24 pb-16 px-4 sm:px-6 lg:px-8'>
        <div className='container mx-auto text-center py-8'>
          <Skeleton className='h-10 w-64 mx-auto mb-4' />
          <Skeleton className='h-5 w-96 mx-auto' />
        </div>
      </div>

      {/* Search & Filter Section Skeleton */}
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10'>
        <div className='bg-white rounded-2xl p-6 mb-8'>
          <div className='flex flex-col lg:flex-row gap-4'>
            <Skeleton className='flex-1 h-14' />
            <Skeleton className='hidden lg:block px-6 py-4 rounded-2xl w-32' />
          </div>

          <div className='mt-6'>
            <Skeleton className='h-6 w-40 mb-4' />
            <div className='flex flex-wrap gap-3'>
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className='h-12 w-24 rounded-xl' />
              ))}
            </div>
          </div>
        </div>

        {/* Results Header Skeleton */}
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8'>
          <Skeleton className='h-8 w-64 mb-2' />
          <Skeleton className='h-5 w-48' />
        </div>

        {/* Card Grid Skeleton */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
          {[...Array(6)].map((_, index) => (
            <div key={index} className='animate-pulse'>
              <div className='flex flex-col overflow-hidden border border-surface bg-white shadow-lg shadow-black/5 h-full rounded-2xl'>
                <div className='relative overflow-hidden aspect-video'>
                  <Skeleton className='w-full h-full' />
                </div>
                <div className='flex flex-col flex-1 p-6 space-y-4'>
                  <Skeleton className='h-4 w-3/4' />
                  <div className='flex justify-between items-center'>
                    <Skeleton className='h-4 w-1/4' />
                    <Skeleton className='h-4 w-1/3' />
                  </div>
                  <div className='mt-auto flex flex-col sm:flex-row items-start gap-4 sm:items-center justify-between pt-3 border-t border-surface'>
                    <Skeleton className='h-4 w-1/3' />
                    <Skeleton className='h-4 w-1/4' />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className='flex flex-col sm:flex-row items-center justify-between gap-6 mb-12'>
          <Skeleton className='h-5 w-72' />
          <div className='flex items-center gap-2'>
            <Skeleton className='p-3 rounded-lg w-12 h-12' />
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className='w-10 h-10 rounded-lg' />
            ))}
            <Skeleton className='p-3 rounded-lg w-12 h-12' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UMKMListSkeleton;
