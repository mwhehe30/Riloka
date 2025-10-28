'use client';

import { Facebook, Instagram, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='bg-surface border-t border-border'>
      <div className='container mx-auto px-6 lg:px-12 py-12'>
        <div className='grid gap-10 md:grid-cols-2 lg:grid-cols-4'>
          <div className='space-y-4'>
            <h2 className='text-2xl font-semibold text-foreground'>Riloka</h2>
            <p className='text-sm text-muted-foreground leading-relaxed'>
              Platform untuk menemukan, mendukung, dan mempromosikan UMKM lokal
              favorit Anda. Jelajahi cerita di balik setiap produk dan bantu
              mereka tumbuh bersama.
            </p>
          </div>

          <div className='space-y-3'>
            <h3 className='text-base font-semibold text-foreground tracking-wide'>
              Navigasi
            </h3>
            <nav className='flex flex-col space-y-2 text-sm'>
              <Link
                href='/'
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                Beranda
              </Link>
              <Link
                href='/umkm'
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                UMKM
              </Link>
              <Link
                href='/tentang'
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                Tentang Kami
              </Link>
            </nav>
          </div>

          <div className='space-y-3'>
            <h3 className='text-base font-semibold text-foreground tracking-wide'>
              Hubungi Kami
            </h3>
            <div className='space-y-2 text-sm text-muted-foreground'>
              <p>Senin - Jumat, 09.00 - 17.00 WIB</p>
              <Link
                href='mailto:halo@riloka.id'
                className='inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors'
              >
                <Mail className='h-4 w-4' />
                halo@riloka.id
              </Link>
            </div>
          </div>

          <div className='space-y-3'>
            <h3 className='text-base font-semibold text-foreground tracking-wide'>
              Ikuti Kami
            </h3>
            <p className='text-sm text-muted-foreground'>
              Dapatkan kabar terbaru seputar UMKM, program komunitas, dan event
              menarik setiap minggunya.
            </p>
            <div className='flex items-center gap-3'>
              <Link
                href='https://facebook.com'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors'
              >
                <Facebook className='h-4 w-4' />
              </Link>
              <Link
                href='https://instagram.com'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors'
              >
                <Instagram className='h-4 w-4' />
              </Link>
            </div>
          </div>
        </div>

        <div className='mt-12 border-t border-border pt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <p className='text-sm text-muted-foreground'>
            © {new Date().getFullYear()} Riloka. Seluruh hak cipta dilindungi.
          </p>
          <div className='flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground'>
            <Link
              href='/kebijakan-privasi'
              className='hover:text-foreground transition-colors'
            >
              Kebijakan Privasi
            </Link>
            <Link
              href='/syarat-ketentuan'
              className='hover:text-foreground transition-colors'
            >
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
