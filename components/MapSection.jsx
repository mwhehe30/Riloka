import { ChevronDown, ChevronUp } from 'lucide-react';
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
  const [isListExpanded, setIsListExpanded] = useState(true);

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
    // Only update if selecting a different UMKM
    if (selectedUmkm?.id !== umkm.id) {
      setSelectedUmkm(umkm);
    }
  };

  return (
    <section className='w-full h-full relative overflow-hidden'>
      {/* Map Background - Full Screen */}
      <div className='absolute inset-0 z-0'>
        <MapLeaflet
          umkmData={filteredUmkmState}
          selectedUmkm={selectedUmkm}
          onSelectUmkm={handleUmkmSelect}
        />
      </div>

      {/* Floating Controls Container - Responsive */}
      <div className='absolute top-0 left-0 right-0 bottom-0 z-10 pointer-events-none p-4 md:p-6 flex flex-col justify-between'>
        {/* Top Section: Category Filter (Centered) */}
        <div className='flex justify-center w-full pointer-events-auto'>
          <div className='bg-white/90 backdrop-blur-md rounded-full p-1.5 shadow-lg border border-white/20 overflow-x-auto max-w-full'>
            <div className='flex gap-1 whitespace-nowrap'>
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                  selectedCategory === 'all'
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setSelectedCategory('makanan')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                  selectedCategory === 'makanan'
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Makanan
              </button>
              <button
                onClick={() => setSelectedCategory('minuman')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                  selectedCategory === 'minuman'
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Minuman
              </button>
              <button
                onClick={() => setSelectedCategory('jasa')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                  selectedCategory === 'jasa'
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Jasa
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section: UMKM List (Desktop Right Bottom, Mobile Bottom Sheet style) */}
        <div className='pointer-events-auto self-end md:self-end w-full md:w-80 transition-all duration-300 ease-in-out'>
          <div className='bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 flex flex-col overflow-hidden'>
            {/* Header with Toggle */}
            <div
              className='p-4 flex justify-between items-center cursor-pointer bg-white/50 hover:bg-white/80 transition-colors'
              onClick={() => setIsListExpanded(!isListExpanded)}
            >
              <h4 className='font-semibold text-green-800 text-sm'>
                Daftar UMKM ({loading ? 0 : filteredUmkmState.length})
              </h4>
              <button className='p-1 rounded-full hover:bg-gray-100 transition-colors'>
                {isListExpanded ? (
                  <ChevronDown className='w-5 h-5 text-gray-600' />
                ) : (
                  <ChevronUp className='w-5 h-5 text-gray-600' />
                )}
              </button>
            </div>

            {/* List Content */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                isListExpanded
                  ? 'max-h-[40vh] md:max-h-[60vh] opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              <div className='p-4 pt-0 overflow-y-auto scrollbar-none space-y-3 max-h-[40vh] md:max-h-[60vh]'>
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
                        <h4 className='font-semibold text-xs'>{umkm.name}</h4>
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
        </div>
      </div>
    </section>
  );
};

export default MapSection;
