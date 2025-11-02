import { Quote } from 'lucide-react';

const TestimonialSliderSkeleton = () => {
  return (
    <div className='relative w-full max-w-6xl mx-auto'>
      <div className='flex items-center justify-center'>
        <div className='w-full max-w-4xl'>
          <Quote className='w-12 h-12 text-primary/20 absolute -top-4 -left-4' />
          <div className='bg-white rounded-3xl p-8 shadow-lg border border-border relative z-10'>
            <div className='flex justify-center mb-6'>
              {/* Star Rating Skeleton */}
              <div className='flex space-x-1'>
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className='w-5 h-5 bg-muted-foreground/20 rounded-full'
                  />
                ))}
              </div>
            </div>

            <div className='space-y-4'>
              <div className='h-5 bg-muted-foreground/20 rounded w-3/4 mx-auto'></div>
              <div className='h-5 bg-muted-foreground/20 rounded w-full mx-auto'></div>
              <div className='h-5 bg-muted-foreground/20 rounded w-5/6 mx-auto'></div>
            </div>

            <div className='flex flex-col items-center mt-8'>
              <div className='h-6 bg-muted-foreground/20 rounded w-1/3'></div>
              <div className='h-4 bg-muted-foreground/20 rounded w-1/4 mt-2'></div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows Skeleton */}
      <div className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white rounded-full p-3 shadow-lg border border-border z-20 opacity-50'>
        <div className='w-6 h-6' />
      </div>

      <div className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white rounded-full p-3 shadow-lg border border-border z-20 opacity-50'>
        <div className='w-6 h-6' />
      </div>

      {/* Indicators Skeleton */}
      <div className='flex justify-center mt-8 space-x-2'>
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className='w-3 h-3 bg-muted-foreground/20 rounded-full'
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSliderSkeleton;
