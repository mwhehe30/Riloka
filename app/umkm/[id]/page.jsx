'use client';

import { getUmkmById } from '@/lib/api';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const { id } = useParams();
  const [detailUmkm, setDetailUmkm] = useState([]);
  useEffect(() => {
    // dapetin data detail umkm
    async function detailUmkm() {
      const res = await getUmkmById(Number(id));
      setDetailUmkm(res);
      console.log(res);
    }
    detailUmkm();
  }, []);
  return (
    <section className='container mx-auto flex items-center justify-center pt-24 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen'>
      <div className='w-full'>
        <Link href='/umkm' className='text-primary hover:text-primary/90'>
          Kembali ke daftar UMKM
        </Link>
        <h1 className='text-2xl font-bold mb-4'>{detailUmkm.name}</h1>
        <p className='text-gray-600 mb-4'>{detailUmkm.description}</p>
      </div>
    </section>
  );
}
