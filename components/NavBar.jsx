import { Store } from 'lucide-react';

export default function NavBar() {
  return (
    <header className='border-b border-black/5 bg-white/90 backdrop-blur-2xl fixed w-full top-0 z-50'>
      <div className='container mx-auto px-6 lg:px-12 py-5'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <div className='relative group'>
              <div className='absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300' />
              <div className='relative bg-gradient-to-br from-primary to-accent p-3 rounded-2xl shadow-2xl shadow-primary/25'>
                <Store className='size-7 text-white' strokeWidth={2} />
              </div>
            </div>
            <div>
              <h1 className='font-display tracking-tight text-[1.5rem] leading-none mb-1'>
                <span className='bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold'>
                  Riloka
                </span>
              </h1>
              <p className='text-sm text-muted-foreground font-medium'>
                Dukung Bisnis Lokal
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
