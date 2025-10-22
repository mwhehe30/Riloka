'use client';

import Card from '@/components/Card';
import { getUmkm } from '@/lib/api';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Page() {
  const [umkm, setUmkm] = useState([]);

  useEffect(() => {
    const fetchUmkm = async () => {
      const umkm = await getUmkm();
      setUmkm(umkm);
    };
    fetchUmkm();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const search = e.target.search.value;
    const filteredUmkm = umkm.filter((umkm) => {
      return umkm.name.toLowerCase().includes(search.toLowerCase());
    });
    setUmkm(filteredUmkm);
  };

  return (
    <section className='container mx-auto pt-24 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex justify-center'>
      <div className='w-full'>
        <form
          onSubmit={handleSearch}
          className='relative mx-auto mb-12 flex w-full gap-2'
        >
          <div className='relative flex w-full items-center gap-3 flex-8 bg-card border border-muted-foreground rounded-2xl px-6 py-4 shadow-lg '>
            <Search className='size-5 text-muted-foreground flex-shrink-0' />
            <input
              type='text'
              placeholder='Cari UMKM, produk, atau jasa lokal...'
              className='w-full border-0 bg-transparent outline-0 ring-0 text-base placeholder:text-muted-foreground'
            />
          </div>
          <button
            type='submit'
            className='cursor-pointer shadow-lg flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover transition-all  text-white rounded-2xl'
          >
            <Search className='size-5 text-white flex-shrink-0' />
            <span>Search</span>
          </button>
        </form>

        <div className='flex flex-col gap-2 mb-12'>
          <h3>Filter UMKM</h3>
          <div className='flex gap-2'>
            <div>
              <input type='checkbox' name='umkm' id='umkm' />
              <label htmlFor='umkm'>Umkm</label>
            </div>
            <div>
              <input type='checkbox' name='umkm' id='umkm' />
              <label htmlFor='umkm'>Umkm</label>
            </div>
            <div>
              <input type='checkbox' name='umkm' id='umkm' />
              <label htmlFor='umkm'>Umkm</label>
            </div>
          </div>
        </div>

        <h1 className='text-4xl font-bold mb-8'>UMKM</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {umkm.map((umkm) => (
            <Card key={umkm.id} umkm={umkm} />
          ))}
        </div>
      </div>
    </section>
  );
}
