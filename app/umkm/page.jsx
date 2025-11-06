'use client';

import Card from '@/components/Card';
import UMKMListSkeleton from '@/components/UMKMListSkeleton';
import { getUmkm } from '@/lib/api';
import {
  ChevronLeft,
  ChevronRight,
  Coffee,
  Filter,
  Hammer,
  MapPin,
  Scissors,
  Search,
  Shirt,
  Sparkles,
  Star,
  Utensils,
  X,
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useState } from 'react';

// Main content component that uses useSearchParams
const UMKMContent = () => {
  const [allUMKM, setAllUMKM] = useState([]);
  const [displayedUMKM, setDisplayedUMKM] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const searchParams = useSearchParams();
  const router = useRouter();

  // State untuk menangani input search sementara
  const [tempSearch, setTempSearch] = useState('');

  const categories = [
    {
      name: 'makanan',
      icon: Utensils,
      color: 'bg-category-makanan',
      hoverColor: 'hover:bg-category-makanan/90',
    },
    {
      name: 'minuman',
      icon: Coffee,
      color: 'bg-category-minuman',
      hoverColor: 'hover:bg-category-minuman/90',
    },
    {
      name: 'jasa',
      icon: Scissors,
      color: 'bg-category-jasa',
      hoverColor: 'hover:bg-category-jasa/90',
    },
    {
      name: 'fashion',
      icon: Shirt,
      color: 'bg-category-fashion',
      hoverColor: 'hover:bg-category-fashion/90',
    },
    {
      name: 'kerajinan',
      icon: Hammer,
      color: 'bg-category-kerajinan',
      hoverColor: 'hover:bg-category-kerajinan/90',
    },
  ];

  const sanitizeCategories = (item) => {
    if (Array.isArray(item.category)) {
      return item.category.map((c) => c.toLowerCase());
    }
    return [String(item.category || '').toLowerCase()];
  };

  // Fungsi untuk update URL dengan search params
  const updateURLParams = useCallback(
    (newSearch, newCategories) => {
      const params = new URLSearchParams();

      if (newSearch) {
        params.set('search', newSearch);
      }

      if (newCategories.length > 0) {
        params.set('category', newCategories.join(','));
      }

      const newUrl = params.toString() ? `?${params.toString()}` : '/umkm';
      router.replace(newUrl, { scroll: false });
    },
    [router]
  );

  // Fungsi filterData yang sederhana dan efektif
  const filterData = useCallback(
    (searchValue, categoriesValue, data = allUMKM) => {
      let result = data;

      // Filter by search
      if (searchValue && searchValue.trim() !== '') {
        const lowerSearch = searchValue.toLowerCase();
        result = result.filter((item) => {
          const nameMatch = item.name?.toLowerCase().includes(lowerSearch);
          const descMatch = item.description
            ?.toLowerCase()
            .includes(lowerSearch);
          const menuMatch = Array.isArray(item.products)
            ? item.products.some((product) =>
                product.name?.toLowerCase().includes(lowerSearch)
              )
            : false;

          return nameMatch || descMatch || menuMatch;
        });
      }

      // Filter by categories
      if (categoriesValue && categoriesValue.length > 0) {
        result = result.filter((item) => {
          const itemCategories = sanitizeCategories(item);
          return itemCategories.some((cat) => categoriesValue.includes(cat));
        });
      }

      return result;
    },
    [allUMKM]
  );

  // Fungsi untuk apply filter dan update displayed UMKM
  const applyFilters = useCallback(
    (
      searchValue = search,
      categoriesValue = selectedCategories,
      page = currentPage
    ) => {
      const filteredData = filterData(searchValue, categoriesValue);
      const indexOfLastItem = page * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = filteredData.slice(
        indexOfFirstItem,
        indexOfLastItem
      );

      setDisplayedUMKM(currentItems);
    },
    [filterData, itemsPerPage, search, selectedCategories, currentPage]
  );

  // Initialize dari URL parameters
  useEffect(() => {
    const searchFromUrl = searchParams.get('search') || '';
    const categoryFromUrl = searchParams.get('category') || '';

    setSearch(searchFromUrl);
    setTempSearch(searchFromUrl);

    if (categoryFromUrl) {
      const categories = categoryFromUrl.toLowerCase().split(',');
      setSelectedCategories(categories);
    }
  }, [searchParams]);

  // useEffect untuk load data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getUmkm();
        setAllUMKM(data);
      } catch (error) {
        console.error('Error fetching UMKM data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Apply filters ketika allUMKM berubah (data pertama kali load)
  useEffect(() => {
    if (allUMKM.length > 0) {
      applyFilters();
    }
  }, [allUMKM.length, applyFilters]); // ← PERBAIKAN: tambah allUMKM.length

  // Apply filters ketika search atau selectedCategories berubah
  useEffect(() => {
    if (allUMKM.length > 0) {
      setCurrentPage(1); // Reset ke halaman 1 ketika filter berubah
      applyFilters(search, selectedCategories, 1);
    }
  }, [search, selectedCategories, allUMKM.length, applyFilters]); // ← PERBAIKAN: tambah semua dependencies

  // Update displayed UMKM ketika page berubah
  useEffect(() => {
    if (allUMKM.length > 0) {
      applyFilters(search, selectedCategories, currentPage);
    }
  }, [currentPage, search, selectedCategories, allUMKM.length, applyFilters]); // ← PERBAIKAN: tambah semua dependencies

  // Fungsi untuk handle search dengan tombol
  const handleSearchSubmit = () => {
    setSearch(tempSearch);
    updateURLParams(tempSearch, selectedCategories);
  };

  // Fungsi untuk handle input change (hanya update temp search)
  const handleTempSearchChange = (e) => {
    setTempSearch(e.target.value);
  };

  // Fungsi untuk handle enter key di input search
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const handleCategoryChange = (category) => {
    let updated = [...selectedCategories];
    if (updated.includes(category)) {
      updated = updated.filter((c) => c !== category);
    } else {
      updated.push(category);
    }
    setSelectedCategories(updated);
    updateURLParams(search, updated);
  };

  const resetFilters = () => {
    setSearch('');
    setTempSearch('');
    setSelectedCategories([]);
    setCurrentPage(1);
    setIsFilterOpen(false);
    router.push('/umkm', { scroll: false });
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredUMKM = filterData(search, selectedCategories);
  const totalPages = Math.ceil(filteredUMKM.length / itemsPerPage);

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

  // Show skeleton while loading
  if (isLoading && allUMKM.length === 0) {
    return <UMKMListSkeleton />;
  }

  return (
    <section className='min-h-screen bg-white'>
      {/* Header Section */}
      <div className='bg-linear-to-br from-primary via-primary/90 to-accent pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden'>
        {/* Background Pattern */}
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute top-10 left-10 w-20 h-20 bg-white rounded-full'></div>
          <div className='absolute top-32 right-20 w-16 h-16 bg-white rounded-full'></div>
          <div className='absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full'></div>
        </div>

        <div className='container mx-auto text-center relative z-10 py-8'>
          <div className='flex justify-center items-center mb-4'>
            <Sparkles className='w-8 h-8 text-secondary mr-3' />
            <h1 className='text-4xl lg:text-5xl font-bold text-white mb-3 font-montserrat'>
              Jelajahi UMKM Lokal
            </h1>
            <Sparkles className='w-8 h-8 text-secondary ml-3' />
          </div>
          <p className='text-lg lg:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed'>
            Temukan{' '}
            <span className='font-semibold text-secondary'>
              produk dan layanan eksklusif
            </span>{' '}
            dari pelaku UMKM terbaik di sekitarmu
          </p>
        </div>
      </div>

      {/* Search & Filter Section */}
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10'>
        <div className='bg-white rounded-2xl p-6 mb-8'>
          <div className='flex flex-col lg:flex-row gap-4'>
            {/* Search Input dengan Tombol */}
            <div className='flex-1 relative flex gap-3'>
              <div className='flex flex-9 items-center gap-3 bg-muted/50 border border-border/80 rounded-lg px-5 py-4 shadow-lg transition-shadow focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20'>
                <Search className='w-5 h-5 text-muted-foreground' />
                <input
                  type='text'
                  value={tempSearch}
                  onChange={handleTempSearchChange}
                  onKeyPress={handleKeyPress}
                  placeholder='Cari UMKM, menu, atau produk lokal...'
                  className='w-full bg-transparent outline-none placeholder-muted-foreground text-foreground'
                />
              </div>
              <button
                onClick={handleSearchSubmit}
                className='px-4 py-2 bg-primary flex-1 text-white shadow-lg rounded-lg hover:bg-primary-hover transition-all flex items-center gap-2 justify-center font-medium'
              >
                <Search className='w-4 h-4' />
                Cari
              </button>
            </div>

            {/* Filter Button untuk Mobile */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className='lg:hidden px-6 py-4 rounded-2xl bg-primary text-white shadow-lg hover:bg-primary-hover transition-all flex items-center gap-2 font-medium'
            >
              <Filter className='w-5 h-5' />
              Filter
            </button>
          </div>

          {/* Filter Categories */}
          <div className={`mt-6 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <h3 className='font-semibold text-lg mb-4 text-foreground flex items-center gap-2'>
              <Filter className='w-5 h-5 text-primary' />
              Filter Kategori
            </h3>
            <div className='flex flex-wrap gap-3'>
              {categories.map(({ name, icon: Icon, color }) => {
                const isSelected = selectedCategories.includes(name);
                return (
                  <button
                    key={name}
                    onClick={() => handleCategoryChange(name)}
                    className={`group relative overflow-hidden px-5 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                      isSelected
                        ? `${color} text-white shadow-lg scale-105`
                        : 'bg-white text-foreground border border-border hover:shadow-md'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${
                        isSelected ? 'text-white' : 'text-muted-foreground'
                      }`}
                    />
                    <span className='capitalize'>{name}</span>

                    {/* Hover effect */}
                    {!isSelected && (
                      <div
                        className={`absolute inset-0 ${color} opacity-0 group-hover:opacity-10 transition-opacity`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8'>
          <div>
            <h2 className='text-2xl lg:text-3xl font-bold text-foreground mb-2 font-montserrat'>
              {search || selectedCategories.length > 0
                ? 'Hasil Pencarian'
                : 'Semua UMKM Terbaik'}
            </h2>
            <p className='text-muted-foreground flex items-center gap-2 flex-wrap'>
              <MapPin className='w-4 h-4 text-primary' />
              Menampilkan{' '}
              <span className='font-semibold text-primary'>
                {displayedUMKM.length}
              </span>{' '}
              dari{' '}
              <span className='font-semibold text-primary'>
                {filteredUMKM.length}
              </span>{' '}
              UMKM
              {totalPages > 1 && (
                <span className='flex items-center gap-1'>
                  <Star className='w-4 h-4 text-secondary' />
                  Halaman {currentPage} dari {totalPages}
                </span>
              )}
            </p>
          </div>

          {/* Active Filters */}
          {(search || selectedCategories.length > 0) && (
            <div className='flex flex-wrap gap-2 mt-3 sm:mt-0'>
              {search && (
                <span className='px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-1 border border-primary/20'>
                  "{search}"
                  <button
                    onClick={() => {
                      setSearch('');
                      setTempSearch('');
                      updateURLParams('', selectedCategories);
                    }}
                    className='ml-1 hover:text-primary-hover'
                  >
                    <X className='w-3 h-3' />
                  </button>
                </span>
              )}
              {selectedCategories.map((category) => {
                const categoryConfig = categories.find(
                  (cat) => cat.name === category
                );
                return (
                  <span
                    key={category}
                    className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 border ${
                      categoryConfig
                        ? `${categoryConfig.color} text-white border-transparent`
                        : 'bg-muted text-foreground border-border'
                    }`}
                  >
                    {category}
                    <button
                      onClick={() => handleCategoryChange(category)}
                      className='ml-1 opacity-80 hover:opacity-100'
                    >
                      <X className='w-3 h-3' />
                    </button>
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* Card Grid */}
        {!isLoading && displayedUMKM.length === 0 ? (
          /* Empty State - TAMPIL ketika TIDAK loading dan TIDAK ada UMKM */
          <div className='text-center py-16'>
            <div className='max-w-md mx-auto'>
              <div className='w-20 h-20 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center'>
                <Search className='w-8 h-8 text-muted-foreground' />
              </div>
              <h3 className='text-xl font-bold text-foreground mb-2 font-montserrat'>
                Tidak Ada Hasil Ditemukan
              </h3>
              <p className='text-muted-foreground mb-6'>
                Coba ubah kata kunci pencarian atau filter kategori untuk
                menemukan UMKM yang Anda cari.
              </p>
              <button
                onClick={resetFilters}
                className='px-6 py-3 bg-primary text-white rounded-xl shadow-lg hover:bg-primary-hover transition-all font-medium'
              >
                Tampilkan Semua UMKM
              </button>
            </div>
          </div>
        ) : (
          /* Card Grid - TAMPIL ketika loading ATAU ada UMKM */
          <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
              {isLoading
                ? // Show skeleton cards while loading
                  [...Array(6)].map((_, index) => (
                    <div key={index} className='animate-pulse'>
                      <div className='flex flex-col overflow-hidden border border-surface bg-white shadow-lg shadow-black/5 h-full rounded-2xl'>
                        <div className='relative overflow-hidden aspect-video'>
                          <div className='w-full h-full bg-muted rounded-md' />
                        </div>
                        <div className='flex flex-col flex-1 p-6 space-y-4'>
                          <div className='h-4 w-3/4 bg-muted rounded' />
                          <div className='flex justify-between items-center'>
                            <div className='h-4 w-1/4 bg-muted rounded' />
                            <div className='h-4 w-1/3 bg-muted rounded' />
                          </div>
                          <div className='mt-auto flex flex-col sm:flex-row items-start gap-4 sm:items-center justify-between pt-3 border-t border-surface'>
                            <div className='h-4 w-1/3 bg-muted rounded' />
                            <div className='h-4 w-1/4 bg-muted rounded' />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : displayedUMKM.map((item, index) => (
                    <div
                      key={item.id}
                      className='animate-slideIn'
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animationFillMode: 'both',
                      }}
                    >
                      <Card umkm={item} />
                    </div>
                  ))}
            </div>

            {/* Pagination - HANYA tampil ketika ada UMKM dan totalPages > 1 */}
            {!isLoading && totalPages > 1 && (
              <div className='flex flex-col sm:flex-row items-center justify-between gap-6 mb-12'>
                <div className='text-muted-foreground font-medium'>
                  Menampilkan{' '}
                  <span className='text-primary font-bold'>
                    {Math.min(
                      (currentPage - 1) * itemsPerPage + 1,
                      filteredUMKM.length
                    )}
                  </span>
                  -
                  <span className='text-primary font-bold'>
                    {Math.min(currentPage * itemsPerPage, filteredUMKM.length)}
                  </span>{' '}
                  dari{' '}
                  <span className='text-primary font-bold'>
                    {filteredUMKM.length}
                  </span>{' '}
                  UMKM
                </div>

                <div className='flex items-center gap-2'>
                  {/* Previous Button */}
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`p-3 rounded-lg border-2 font-semibold transition-all ${
                      currentPage === 1
                        ? 'text-muted-foreground border-border cursor-not-allowed'
                        : 'text-foreground border-border hover:bg-primary hover:text-white hover:border-primary transform hover:scale-105'
                    }`}
                  >
                    <ChevronLeft className='w-5 h-5' />
                  </button>

                  {/* Page Numbers */}
                  {getPageNumbers().map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg border-2 text-sm font-bold transition-all ${
                        currentPage === number
                          ? 'bg-primary text-white border-primary shadow-lg'
                          : 'border-border text-foreground hover:bg-primary hover:text-white hover:border-primary'
                      }`}
                    >
                      {number}
                    </button>
                  ))}

                  {/* Next Button */}
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`p-3 rounded-lg border-2 font-semibold transition-all ${
                      currentPage === totalPages
                        ? 'text-muted-foreground border-border cursor-not-allowed'
                        : 'text-foreground border-border hover:bg-primary hover:text-white hover:border-primary transform hover:scale-105'
                    }`}
                  >
                    <ChevronRight className='w-5 h-5' />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

// Main page component with Suspense
const Page = () => {
  return (
    <Suspense fallback={<UMKMListSkeleton />}>
      <UMKMContent />
    </Suspense>
  );
};

export default Page;
