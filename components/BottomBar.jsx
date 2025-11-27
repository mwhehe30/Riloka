'use client';

import { Home, Info, Store } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BottomBar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Beranda', href: '/', icon: Home },
    { name: 'List UMKM', href: '/umkm', icon: Store },
    { name: 'Tentang Kami', href: '/tentang', icon: Info },
  ];

  const isActive = (href) => pathname === href;

  return (
    <div className='fixed bottom-0 left-0 right-0 bg-white-brighter/90 border-t-2 border-surface backdrop-blur-xl md:hidden z-9999'>
      <div className='grid grid-cols-3 py-3'>
        {navItems.map(({ name, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center justify-center py-2 px-4 rounded-lg transition-all duration-200 ${
              isActive(href)
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className='relative flex flex-col items-center justify-center'>
              <Icon
                className={`w-6 h-6 mb-1 ${
                  isActive(href) ? 'text-primary' : 'text-muted-foreground'
                }`}
              />
              <p className='text-xs'>{name}</p>
              <span
                className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[3px] rounded-full bg-linear-to-r from-primary to-accent w-0 transition-all duration-300 ${
                  isActive(href) ? 'w-4 opacity-100' : 'w-0 opacity-0'
                }`}
              ></span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomBar;
