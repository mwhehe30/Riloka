'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const NavBar = () => {
  const pathname = usePathname();
  // const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Beranda', href: '/' },
    { name: 'List UMKM', href: '/umkm' },
    { name: 'Tentang Kami', href: '/tentang' },
  ];

  const isActive = (href) => pathname === href;

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? 'bg-white-brighter/95 backdrop-blur-xl shadow-sm border-b border-surface'
          : 'bg-white-brighter/90 backdrop-blur-xl border-b border-surface'
      }`}
    >
      <nav
        className={`container mx-auto flex items-center justify-between px-6 lg:px-12 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-4'
        }`}
      >
        {/* LOGO */}
        <Link href='/' className='flex items-center gap-3 group relative'>
          <div className='relative'>
            {/* Glow effect on hover */}
            <div className='absolute inset-0 bg-linear-to-r from-primary/20 to-accent/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

            <div className='relative'>
              <h1 className='text-2xl font-bold tracking-tight bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300'>
                Riloka
              </h1>
              <p className='text-sm text-muted-foreground font-medium leading-tight group-hover:text-muted-foreground/80 transition-colors'>
                Dukung Bisnis Lokal
              </p>
            </div>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <ul className='hidden md:flex items-center gap-2'>
          {navItems.map(({ name, href }) => (
            <li key={href} className='relative'>
              <Link
                href={href}
                className={`relative px-4 py-2 rounded-lg text-[1.05rem] font-semibold transition-all duration-300 overflow-hidden group ${
                  isActive(href)
                    ? 'text-black'
                    : 'text-muted-foreground hover:text-black'
                }`}
              >
                {/* Background hover effect */}
                <span className='absolute inset-0 bg-linear-to-r from-primary/5 to-accent/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'></span>

                {/* Text */}
                <span className='relative z-10'>{name}</span>

                {/* Animated underline */}
                <span
                  className={`absolute left-1/2 -translate-x-1/2 bottom-0 h-[3px] rounded-full bg-linear-to-r from-primary to-accent transform transition-all duration-300 ${
                    isActive(href)
                      ? 'w-8 opacity-100'
                      : 'w-0 opacity-0 group-hover:w-8 group-hover:opacity-100'
                  }`}
                ></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* MOBILE TOGGLE */}
        {/* <button
          onClick={() => setOpen((prev) => !prev)}
          className='md:hidden relative p-2.5 rounded-xl hover:bg-black/5 active:scale-95 transition-all duration-200 group'
          aria-label='Toggle navigation menu'
        >
          <div className='absolute inset-0 bg-linear-to-r from-primary/10 to-accent/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
          {open ? (
            <X className='size-6 relative z-10 transition-transform duration-300 rotate-0 group-hover:rotate-90' />
          ) : (
            <Menu className='size-6 relative z-10 transition-transform duration-300' />
          )}
        </button> */}

        {/* MOBILE MENU */}
        {/* <div
          className={`absolute top-full left-0 w-full overflow-hidden bg-white/98 backdrop-blur-xl border-t border-black/10 shadow-2xl transition-all duration-500 md:hidden ${
            open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className='flex flex-col gap-1 p-4'>
            {navItems.map(({ name, href }, index) => (
              <li
                key={href}
                style={{
                  animation: open
                    ? `slideIn 0.3s ease-out ${index * 0.1}s both`
                    : 'none',
                }}
              >
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between px-5 py-3.5 rounded-xl font-semibold text-lg transition-all duration-300 group ${
                    isActive(href)
                      ? 'text-black bg-linear-to-r from-primary/5 to-accent/5'
                      : 'text-muted-foreground hover:text-black hover:bg-black/5'
                  }`}
                >
                  <span>{name}</span>
                  <ChevronRight
                    className={`size-5 transition-transform duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1
                    `}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div> */}
      </nav>
    </header>
  );
};

export default NavBar;
