'use client';

import { ArrowLeft, MapPin } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const NavBar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    // Check initial screen size
    checkMobile();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const navItems = [
    { name: 'Beranda', href: '/' },
    { name: 'List UMKM', href: '/umkm' },
    { name: 'Tentang Kami', href: '/tentang' },
  ];

  const isActive = (href) => pathname === href;

  // Check if we're on a UMKM detail page (dynamic route like /umkm/slug)
  const isUMKMDetailPage =
    pathname.startsWith('/umkm/') && pathname !== '/umkm';

  // Extract UMKM name from URL if on detail page
  let umkmName = '';
  if (isUMKMDetailPage) {
    const slug = pathname.split('/')[2];
    // Convert slug to title case for display
    umkmName = slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Determine navbar position
  const getNavbarPosition = () => {
    // Desktop: selalu fixed
    if (!isMobile) return 'fixed';

    // Mobile:
    // - Detail UMKM → fixed
    // - Halaman lain → absolute
    return isUMKMDetailPage ? 'fixed' : 'absolute';
  };

  const navbarPosition = getNavbarPosition();

  return (
    <header
      className={`${navbarPosition} top-0 left-0 right-0 z-[9999] w-full transition-all duration-500 ${
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
        {/* Back button for UMKM detail page, Logo for other pages */}
        {isUMKMDetailPage ? (
          <div className='flex items-center gap-3'>
            <button
              onClick={() => window.history.back()}
              className='p-2 rounded-lg hover:bg-black/5 transition-colors'
              aria-label='Kembali'
            >
              <ArrowLeft className='size-6 text-black' />
            </button>
            <div className='flex items-center gap-2 min-w-0'>
              {' '}
              <MapPin className='size-5 text-primary shrink-0' />
              <h2 className='text-lg font-bold text-black truncate max-w-[120px] xs:max-w-[150px] sm:max-w-[200px]'>
                {umkmName}
              </h2>
            </div>
          </div>
        ) : (
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
        )}

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
      </nav>
    </header>
  );
};

export default NavBar;
