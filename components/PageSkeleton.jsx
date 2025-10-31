import Skeleton from './Skeleton';

const PageSkeleton = () => {
  return (
    <main className='min-h-screen'>
      {/* Hero Section Skeleton */}
      <section className='relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center'>
        <div className='max-w-5xl mx-auto text-center'>
          <Skeleton className='h-6 w-48 mx-auto mb-6' />
          <Skeleton className='h-10 w-full max-w-2xl mx-auto mb-6' />
          <Skeleton className='h-5 w-full max-w-xl mx-auto mb-10' />
          <Skeleton className='h-14 w-full max-w-2xl mx-auto mb-12' />
        </div>
      </section>

      {/* Categories Section Skeleton */}
      <section className='container mx-auto px-6 lg:px-12 py-16 md:py-20'>
        <div className='flex flex-col items-center justify-center text-center w-full max-w-4xl mx-auto mb-16'>
          <Skeleton className='h-6 w-32 mx-auto mb-4' />
          <Skeleton className='h-8 w-64 mx-auto mb-4' />
          <Skeleton className='h-5 w-80 mx-auto' />
        </div>
        <div className='mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-6xl mx-auto'>
          {[...Array(5)].map((_, i) => (
            <div key={i} className='bg-white rounded-2xl p-6 shadow-sm'>
              <Skeleton className='w-14 h-14 rounded-xl mb-4' />
              <Skeleton className='h-6 w-3/4 mb-2' />
              <Skeleton className='h-4 w-full mb-3' />
              <div className='flex items-center justify-between'>
                <Skeleton className='h-4 w-1/4' />
                <Skeleton className='h-4 w-6' />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured UMKM Section Skeleton */}
      <section className='bg-surface'>
        <div className='container mx-auto px-6 lg:px-12 py-16 md:py-20'>
          <div className='flex justify-center items-center flex-col gap-4 mb-8'>
            <Skeleton className='h-6 w-40 mb-4' />
            <Skeleton className='h-8 w-56 mb-3' />
            <Skeleton className='h-5 w-72' />
          </div>
          <div className='flex space-x-6 pb-4 px-6 overflow-x-auto'>
            {[...Array(3)].map((_, i) => (
              <div key={i} className='flex-none w-88 md:w-96 snap-center'>
                <div className='h-full'>
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
              </div>
            ))}
          </div>
          <div className='flex justify-center items-center mt-8'>
            <Skeleton className='w-48 h-12 rounded-full' />
          </div>
        </div>
      </section>

      {/* Promo Section Skeleton */}
      <section className='container mx-auto px-6 lg:px-12 py-16 md:py-20'>
        <div className='flex justify-center items-center flex-col gap-4 mb-8'>
          <Skeleton className='h-6 w-40 mb-4' />
          <Skeleton className='h-8 w-56 mb-3' />
          <Skeleton className='h-5 w-72' />
        </div>
        <div className='flex space-x-6 pb-4 px-6 overflow-x-auto'>
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className='min-w-full md:min-w-[50%] lg:min-w-[33.333%] p-2'
            >
              <div className='bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full'>
                <div className='relative w-full pt-[100%] overflow-hidden'>
                  <Skeleton className='absolute top-0 left-0 w-full h-full' />
                  <Skeleton className='absolute top-4 right-4 w-20 h-8 rounded-full' />
                </div>
                <div className='p-6 flex flex-col flex-grow'>
                  <Skeleton className='text-xl font-semibold text-gray-800 mb-2 h-6 w-3/4' />
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
          ))}
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className='bg-primary'>
        <div className='container mx-auto px-6 lg:px-12 py-16 md:py-20'>
          <div className='flex flex-col items-center justify-center text-center w-full max-w-3xl mx-auto gap-6'>
            <Skeleton className='h-8 w-80' />
            <Skeleton className='h-5 w-96' />
            <Skeleton className='w-48 h-12 rounded-full' />
          </div>
        </div>
      </section>
    </main>
  );
};

export default PageSkeleton;
