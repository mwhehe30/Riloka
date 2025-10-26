'use client';

import Card from '@/components/Card';
import { getUmkm } from '@/lib/api';
import { Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const [allUMKM, setAllUMKM] = useState([]);
  const [filteredUMKM, setFilteredUMKM] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const searchParams = useSearchParams();
  // Tambahkan reaktifitas terhadap searchParams
  const [searchParamValue, setSearchParamValue] = useState("");
  useEffect(()=> {
    setSearchParamValue(searchParams.get("search") || "");
  }, [searchParams])

  const categories = ['makanan', 'minuman', 'jasa', 'fashion', 'kerajinan'];

  // useeffect pertama nampilin smua data dlu
  useEffect(()=> {
    const fetchData = async ()=> {
      const data = await getUmkm();
      setAllUMKM(data);
      setFilteredUMKM(data);
    }
    fetchData();
  }, []);

  // useeffect kedua buat filter kalo ada search param
  useEffect(()=> {
    if ( searchParamValue && allUMKM.length > 0) {
      setSearch(searchParamValue);
      filterData(searchParamValue, []);
    }
  }, [searchParamValue, allUMKM]);

  const sanitizeCategories = (item) => {
    if (Array.isArray(item.category)) {
      return item.category.map((c) => c.toLowerCase());
    }
    return [String(item.category || '').toLowerCase()];
  };

  const filterData = (
    searchValue = search,
    categoriesValue = selectedCategories
  ) => {
    let result = allUMKM;

    const lowerSearch = searchValue.toLowerCase();

    if (lowerSearch.trim() !== '') {
      result = result.filter((item) => {
        const nameMatch = item.name?.toLowerCase().includes(lowerSearch);
        const descMatch = item.description?.toLowerCase().includes(lowerSearch);

        const menuMatch = Array.isArray(item.products)
          ? item.products.some((product) =>
              product.name?.toLowerCase().includes(lowerSearch)
            )
          : false;

        return nameMatch || descMatch || menuMatch;
      });
    }

    if (categoriesValue.length > 0) {
      result = result.filter((item) => {
        const itemCategories = sanitizeCategories(item);
        return itemCategories.some((cat) => categoriesValue.includes(cat));
      });
    }

    setFilteredUMKM(result);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    filterData(value, selectedCategories);
  };

  const handleCategoryChange = (category) => {
    let updated = [...selectedCategories];
    if (updated.includes(category)) {
      updated = updated.filter((c) => c !== category);
    } else {
      updated.push(category);
    }
    setSelectedCategories(updated);
    filterData(search, updated);
  };

  const resetFilters = () => {
    setSearch('');
    setSelectedCategories([]);
    setFilteredUMKM(allUMKM);

    // Juga reset URL tanpa parameter search
    if (typeof window !== 'undefined') {
      const url = new URL(window.location);
      url.searchParams.delete('search');
      window.history.replaceState({}, '', url);
    }
  };

  return (
    <section className='container mx-auto pt-24 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex justify-center'>
      <div className='w-full'>
        <div className='mb-10'>
          <h1 className='text-4xl font-bold mb-3'>Jelajahi UMKM Lokal</h1>
          <p className='text-muted-foreground text-lg'>
            Temukan produk dan layanan dari UMKM terbaik di sekitar Anda
          </p>
        </div>

        {/* Search */}
        <div className='flex gap-3 mb-8'>
          <div className='flex w-full items-center gap-3 bg-card border border-muted-foreground rounded-2xl px-5 py-4 shadow-md'>
            <Search className='size-5 text-muted-foreground' />
            <input
              type='text'
              value={search}
              onChange={handleSearch}
              placeholder='Cari UMKM, menu, atau produk lokal...'
              className='w-full bg-transparent outline-none'
            />
          </div>

          <button
            type='button'
            onClick={resetFilters}
            className='px-6 py-3 rounded-2xl bg-primary text-white shadow-md hover:bg-primary-hover'
          >
            Reset
          </button>
        </div>

        {/* Filter */}
        <div className='mb-10'>
          <h3 className='font-semibold text-lg mb-3'>Filter Kategori</h3>
          <div className='flex flex-wrap gap-3'>
            {categories.map((category) => (
              <label
                key={category}
                className={`px-4 py-2 rounded-xl border cursor-pointer text-sm font-medium transition-all ${
                  selectedCategories.includes(category)
                    ? 'bg-primary text-white border-primary-hover'
                    : 'border-muted-foreground text-foreground hover:bg-accent hover:text-white hover:border-accent-hover'
                }`}
              >
                <input
                  type='checkbox'
                  className='hidden'
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                {category[0].toUpperCase() + category.slice(1)}
              </label>
            ))}
          </div>
        </div>

        <div className='flex items-center justify-between mb-6'>
          <div>
            <h2 className='text-2xl font-bold mb-1'>
              {search || selectedCategories.length > 0
                ? 'Hasil Pencarian'
                : 'Semua UMKM'}
            </h2>
            <p className='text-sm text-muted-foreground'>
              Menampilkan {filteredUMKM.length} dari {allUMKM.length} UMKM
            </p>
          </div>
        </div>

        {/* Card List */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredUMKM.map((item) => (
            <Card key={item.id} umkm={item} />
          ))}
        </div>

        {/* Empty State */}
        {filteredUMKM.length === 0 && (
          <p className='text-center text-muted-foreground mt-10'>
            Tidak ada UMKM yang cocok dengan pencarian
          </p>
        )}
      </div>
    </section>
  );
}
