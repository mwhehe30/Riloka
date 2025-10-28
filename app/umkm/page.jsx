'use client';

import Card from '@/components/Card';
import { getUmkm } from '@/lib/api';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const [allUMKM, setAllUMKM] = useState([]);
  const [displayedUMKM, setDisplayedUMKM] = useState([]); // UMKM yang ditampilkan per halaman
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  // State untuk pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Fixed 9 item per halaman, tidak bisa diubah

  const searchParams = useSearchParams();
  const [searchParamValue, setSearchParamValue] = useState('');
  const [categoryParamValue, setCategoryParamValue] = useState('');

  useEffect(() => {
    setSearchParamValue(searchParams.get('search') || '');
    setCategoryParamValue(searchParams.get('category') || '');
  }, [searchParams]);

  const categories = ['makanan', 'minuman', 'jasa', 'fashion', 'kerajinan'];

  // useEffect untuk load data dengan pagination
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUmkm();
      setAllUMKM(data);

      // Langsung set displayed UMKM untuk halaman pertama
      const initialItems = data.slice(0, itemsPerPage);
      setDisplayedUMKM(initialItems);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (categoryParamValue && allUMKM.length > 0) {
      const categoryLower = categoryParamValue.toLowerCase();
      setSelectedCategories([categoryLower]);
      handleSearchWithPagination(search, [categoryLower]);
      setCurrentPage(1);
    }
  }, [categoryParamValue, allUMKM]);

  // useEffect untuk filter kalo ada search param
  useEffect(() => {
    if (searchParamValue && allUMKM.length > 0) {
      setSearch(searchParamValue);
      handleSearchWithPagination(searchParamValue, []);
    }
  }, [searchParamValue, allUMKM]);

  // useEffect untuk mengupdate displayed UMKM berdasarkan halaman saat ini
  useEffect(() => {
    if (allUMKM.length > 0) {
      updateDisplayedUMKM();
    }
  }, [currentPage, allUMKM]);

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

    return result;
  };

  const updateDisplayedUMKM = () => {
    const filteredData = filterData();
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    setDisplayedUMKM(currentItems);
  };

  const handleSearchWithPagination = (searchValue, categoriesValue) => {
    setCurrentPage(1); // Selalu reset ke halaman 1 ketika search/filter
    const filteredData = filterData(searchValue, categoriesValue);
    const currentItems = filteredData.slice(0, itemsPerPage);
    setDisplayedUMKM(currentItems);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    handleSearchWithPagination(value, selectedCategories);
  };

  const handleCategoryChange = (category) => {
    let updated = [...selectedCategories];
    if (updated.includes(category)) {
      updated = updated.filter((c) => c !== category);
    } else {
      updated.push(category);
    }
    setSelectedCategories(updated);
    handleSearchWithPagination(search, updated);
  };

  const resetFilters = () => {
    setSearch('');
    setSelectedCategories([]);
    setCurrentPage(1);

    // Reset ke data awal halaman 1
    const initialItems = allUMKM.slice(0, itemsPerPage);
    setDisplayedUMKM(initialItems);

    if (typeof window !== 'undefined') {
      const url = new URL(window.location);
      url.searchParams.delete('search');
      window.history.replaceState({}, '', url);
    }
  };

  // Fungsi untuk pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    const filteredData = filterData();
    const indexOfLastItem = pageNumber * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    setDisplayedUMKM(currentItems);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      const nextPageNum = currentPage + 1;
      setCurrentPage(nextPageNum);
      const filteredData = filterData();
      const indexOfLastItem = nextPageNum * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = filteredData.slice(
        indexOfFirstItem,
        indexOfLastItem
      );
      setDisplayedUMKM(currentItems);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      const prevPageNum = currentPage - 1;
      setCurrentPage(prevPageNum);
      const filteredData = filterData();
      const indexOfLastItem = prevPageNum * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = filteredData.slice(
        indexOfFirstItem,
        indexOfLastItem
      );
      setDisplayedUMKM(currentItems);
    }
  };

  // Hitung total halaman berdasarkan data yang difilter
  const filteredUMKM = filterData();
  const totalPages = Math.ceil(filteredUMKM.length / itemsPerPage);

  // Generate array of page numbers untuk ditampilkan
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
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
              Menampilkan {displayedUMKM.length} dari {filteredUMKM.length} UMKM
              {totalPages > 1 && ` (Halaman ${currentPage} dari ${totalPages})`}
            </p>
          </div>
        </div>

        {/* Card List */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10'>
          {displayedUMKM.map((item) => (
            <Card key={item.id} umkm={item} />
          ))}
        </div>

        {/* Empty State */}
        {filteredUMKM.length === 0 && (
          <p className='text-center text-muted-foreground mt-10'>
            Tidak ada UMKM yang cocok dengan pencarian
          </p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className='flex flex-col sm:flex-row items-center justify-between gap-4 mt-8'>
            <div className='text-sm text-muted-foreground'>
              Menampilkan{' '}
              {Math.min(
                (currentPage - 1) * itemsPerPage + 1,
                filteredUMKM.length
              )}
              -{Math.min(currentPage * itemsPerPage, filteredUMKM.length)} dari{' '}
              {filteredUMKM.length} UMKM
            </div>

            <div className='flex items-center gap-1'>
              {/* Previous Button */}
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg border ${
                  currentPage === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-foreground hover:bg-accent hover:text-white'
                }`}
              >
                <ChevronLeft className='size-5' />
              </button>

              {/* Page Numbers - ukuran sama semua */}
              {getPageNumbers().map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg border text-sm font-medium ${
                    currentPage === number
                      ? 'bg-primary text-white border-primary-hover'
                      : 'border-muted-foreground text-foreground hover:bg-accent hover:text-white'
                  }`}
                >
                  {number}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg border ${
                  currentPage === totalPages
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-foreground hover:bg-accent hover:text-white'
                }`}
              >
                <ChevronRight className='size-5' />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
