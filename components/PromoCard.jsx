import { Star, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function PromoCard({ promo }) {
  return (
    <Link
      href={`/umkm/${promo.slug}`}
      className='group block overflow-hidden rounded-2xl border border-surface transition-all duration-300 ease-in-out  shadow-lg shadow-black/5'
    >
      <figure className='relative'>
        <div className='aspect-video overflow-hidden'>
          <Image
            src={promo.image}
            alt={promo.name}
            width={500}
            height={500}
            className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
          />
        </div>
        <div className='absolute top-0 flex w-full items-center justify-between p-4 text-sm'>
          <div className='flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-white'>
            <User className='size-4' />
            <span>{promo.review} Reviews</span>
          </div>
          <div className='flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-white'>
            <Star className='size-4' />
            <span>{promo.rating}</span>
          </div>
        </div>
      </figure>

      <figcaption className='p-4'>
        <h3 className='text-xl font-bold'>{promo.name}</h3>
        <p className='mt-1 truncate text-muted-foreground'>
          {promo.description}
        </p>
      </figcaption>
    </Link>
  );
}
