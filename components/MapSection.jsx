import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamically import MapLeaflet to avoid SSR issues
const MapLeaflet = dynamic(() => import('./MapLeaflet'), {
  ssr: false,
  loading: () => (
    <div className='w-full h-full flex items-center justify-center bg-gray-100'>
      <p className='text-gray-500'>Memuat Peta...</p>
    </div>
  ),
});

const MapSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedUmkm, setSelectedUmkm] = useState(null);
  const [filteredUmkm, setFilteredUmkm] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUmkmData = async () => {
      try {
        const response = await fetch('/data/umkm.json');
        const data = await response.json();
        setFilteredUmkm(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching UMKM data:', error);
        setLoading(false);
      }
    };

    fetchUmkmData();
  }, []);

  useEffect(() => {
    if (filteredUmkm.length === 0) return;

    if (selectedCategory === 'all') {
      setFilteredUmkmState(filteredUmkm);
      setSelectedUmkm(null); // Reset selection when showing all
    } else {
      const filtered = filteredUmkm.filter((umkm) =>
        umkm.category.includes(selectedCategory)
      );
      setFilteredUmkmState(filtered);
      // Auto-select first item when filtering by category
      if (filtered.length > 0) {
        setSelectedUmkm(filtered[0]);
      } else {
        setSelectedUmkm(null);
      }
    }
  }, [selectedCategory, filteredUmkm]);

  const [filteredUmkmState, setFilteredUmkmState] = useState([]);

  const handleUmkmSelect = (umkm) => {
    // If clicking the same UMKM, unselect it
    if (selectedUmkm?.id === umkm.id) {
      setSelectedUmkm(null);
    } else {
      setSelectedUmkm(umkm);
    }
  };

  return (
    <section className='bg-primary/5 py-12 lg:py-20 relative overflow-hidden'>
      <div className='container mx-auto px-4'>
        <div className='max-w-6xl mx-auto'>
          {/* Map Container */}
          <div className='bg-white rounded-3xl shadow-2xl overflow-hidden p-4 lg:p-8'>
            {/* Title Section */}
            <div className='text-center mb-8 lg:mb-12'>
              <h2 className='text-2xl lg:text-4xl font-bold text-green-800 mb-3 lg:mb-4'>
                Jelajahi Kekayaan Lokal Banjar
              </h2>
              <p className='text-gray-600 text-sm lg:text-lg max-w-2xl mx-auto'>
                Temukan UMKM terbaik di seluruh penjuru Kota Banjar
              </p>
            </div>

            {/* Desktop Layout - Popup di dalam map */}
            <div className='hidden lg:block relative rounded-2xl overflow-hidden shadow-xl mb-8 h-[500px]'>
              {/* Map Overlay */}
              <div className='absolute top-5 left-5 z-[1000] bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl max-w-xs border border-white/20'>
                <h3 className='text-xl font-bold text-green-800 mb-2'>
                  Kota Banjar
                </h3>
                <p className='text-gray-600 text-sm leading-relaxed'>
                  Pusat UMKM berkembang di daerah perkotaan dan sekitarnya.
                  Telusuri berbagai usaha lokal yang tersebar di seluruh
                  wilayah.
                </p>
              </div>

              {/* Map Controls */}
              <div className='absolute top-5 right-5 z-[1000] bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl max-w-xs border border-white/20'>
                {/* Category Filter */}
                <div className='flex flex-wrap gap-2 mb-4'>
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                      selectedCategory === 'all'
                        ? 'bg-green-700 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-green-50 hover:border-green-300'
                    }`}
                  >
                    Semua
                  </button>
                  <button
                    onClick={() => setSelectedCategory('makanan')}
                    className={`px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                      selectedCategory === 'makanan'
                        ? 'bg-green-700 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-green-50 hover:border-green-300'
                    }`}
                  >
                    Makanan
                  </button>
                  <button
                    onClick={() => setSelectedCategory('minuman')}
                    className={`px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                      selectedCategory === 'minuman'
                        ? 'bg-green-700 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-green-50 hover:border-green-300'
                    }`}
                  >
                    Minuman
                  </button>
                  <button
                    onClick={() => setSelectedCategory('jasa')}
                    className={`px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                      selectedCategory === 'jasa'
                        ? 'bg-green-700 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-green-50 hover:border-green-300'
                    }`}
                  >
                    Jasa
                  </button>
                </div>

                {/* UMKM List */}
                <div className='max-h-80 overflow-y-auto scrollbar-none'>
                  <div className='space-y-3'>
                    {loading ? (
                      <div className='text-center py-4'>
                        <p className='text-gray-600'>Memuat data UMKM...</p>
                      </div>
                    ) : (
                      filteredUmkmState.map((umkm) => (
                        <div
                          key={umkm.id}
                          onClick={() => handleUmkmSelect(umkm)}
                          className={`p-3 rounded-xl cursor-pointer transition-all duration-300 border ${
                            selectedUmkm?.id === umkm.id
                              ? 'bg-green-700 text-white border-green-700 shadow-lg transform -translate-y-1'
                              : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-green-300'
                          }`}
                        >
                          <div className='flex justify-between items-start mb-1'>
                            <h4 className='font-semibold text-xs'>
                              {umkm.name}
                            </h4>
                            <div className='flex items-center space-x-1'>
                              <span className='text-amber-500 text-xs'>⭐</span>
                              <span
                                className={`text-xs ${
                                  selectedUmkm?.id === umkm.id
                                    ? 'text-amber-300'
                                    : 'text-gray-600'
                                }`}
                              >
                                {umkm.rating}
                              </span>
                            </div>
                          </div>
                          <p className='text-xs opacity-90 line-clamp-2'>
                            {umkm.description}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Leaflet Map */}
              <MapLeaflet
                umkmData={filteredUmkmState}
                selectedUmkm={selectedUmkm}
                onSelectUmkm={handleUmkmSelect}
              />
            </div>

            {/* Mobile Layout - Popup di luar map */}
            <div className='lg:hidden space-y-4'>
              {/* Map Visualization */}
              <div className='relative rounded-2xl overflow-hidden shadow-xl h-[300px]'>
                <MapLeaflet
                  umkmData={filteredUmkmState}
                  selectedUmkm={selectedUmkm}
                  onSelectUmkm={handleUmkmSelect}
                />
              </div>

              {/* Mobile Controls - Di luar map */}
              <div className='bg-white rounded-2xl shadow-lg p-4 border border-gray-200'>
                {/* City Info */}
                <div className='mb-4 p-3 bg-green-50 rounded-xl border border-green-200'>
                  <h3 className='text-lg font-bold text-green-800 mb-1'>
                    Kota Banjar
                  </h3>
                  <p className='text-gray-600 text-sm'>
                    Pusat UMKM berkembang di daerah perkotaan dan sekitarnya.
                    Telusuri berbagai usaha lokal yang tersebar di seluruh
                    wilayah.
                  </p>
                </div>

                {/* Category Filter */}
                <div className='mb-4'>
                  <h4 className='font-semibold text-green-800 mb-2 text-sm'>
                    Filter Kategori
                  </h4>
                  <div className='flex flex-wrap gap-2'>
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                        selectedCategory === 'all'
                          ? 'bg-green-700 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-green-50 hover:border-green-300'
                      }`}
                    >
                      Semua
                    </button>
                    <button
                      onClick={() => setSelectedCategory('makanan')}
                      className={`px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                        selectedCategory === 'makanan'
                          ? 'bg-green-700 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-green-50 hover:border-green-300'
                      }`}
                    >
                      Makanan
                    </button>
                    <button
                      onClick={() => setSelectedCategory('minuman')}
                      className={`px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                        selectedCategory === 'minuman'
                          ? 'bg-green-700 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-green-50 hover:border-green-300'
                      }`}
                    >
                      Minuman
                    </button>
                    <button
                      onClick={() => setSelectedCategory('jasa')}
                      className={`px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                        selectedCategory === 'jasa'
                          ? 'bg-green-700 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-green-50 hover:border-green-300'
                      }`}
                    >
                      Jasa
                    </button>
                  </div>
                </div>

                {/* UMKM List */}
                <div>
                  <h4 className='font-semibold text-green-800 mb-3 text-sm'>
                    Daftar UMKM ({loading ? 0 : filteredUmkmState.length})
                  </h4>
                  <div className='max-h-60 overflow-y-auto space-y-2 scrollbar-none'>
                    {loading ? (
                      <div className='text-center py-4'>
                        <p className='text-gray-600'>Memuat data UMKM...</p>
                      </div>
                    ) : (
                      filteredUmkmState.map((umkm) => (
                        <div
                          key={umkm.id}
                          onClick={() => handleUmkmSelect(umkm)}
                          className={`p-3 rounded-xl cursor-pointer transition-all duration-300 border ${
                            selectedUmkm?.id === umkm.id
                              ? 'bg-green-700 text-white border-green-700 shadow-lg'
                              : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-green-300'
                          }`}
                        >
                          <div className='flex justify-between items-start mb-1'>
                            <h4 className='font-semibold text-sm'>
                              {umkm.name}
                            </h4>
                            <div className='flex items-center space-x-1'>
                              <span className='text-amber-500 text-xs'>⭐</span>
                              <span
                                className={`text-xs ${
                                  selectedUmkm?.id === umkm.id
                                    ? 'text-amber-300'
                                    : 'text-gray-600'
                                }`}
                              >
                                {umkm.rating}
                              </span>
                            </div>
                          </div>
                          <p className='text-xs opacity-90 line-clamp-2 mb-1'>
                            {umkm.description}
                          </p>
                          <div className='flex flex-wrap gap-1'>
                            {umkm.category.map((cat) => (
                              <span
                                key={cat}
                                className={`px-2 py-1 rounded-full text-xs ${
                                  selectedUmkm?.id === umkm.id
                                    ? 'bg-green-600 text-white'
                                    : 'bg-green-100 text-green-800'
                                }`}
                              >
                                {cat}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
