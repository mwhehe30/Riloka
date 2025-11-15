// components/CTABanjarDetailedMap.jsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Landmark, MapPin, Navigation, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const CTABanjarDetailedMap = () => {
  const [activePin, setActivePin] = useState(0);
  const [umkmData, setUmkmData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load data dari JSON
  useEffect(() => {
    const fetchUmkmData = async () => {
      try {
        const response = await fetch('/data/umkm.json');
        const data = await response.json();
        setUmkmData(data);

        // Generate area data dari UMKM
        const areas = generateAreasFromUmkm(data);
        setBanjarAreas(areas);
      } catch (error) {
        console.error('Error loading UMKM data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUmkmData();
  }, []);

  // Generate area data dari UMKM
  const generateAreasFromUmkm = (umkmList) => {
    const areaTypes = {
      'pasar-tradisional': ['Ratan Bakery', 'Waroeng Seblak Dhero'],
      'pusat-bisnis': ['Kedai Fukunobu', 'Steak Batmans', 'Papito Barbershop'],
      kuliner: ['Rindu Rasa Kuliner', 'Dapur Mak Ndut'],
      kerajinan: [],
      jasa: ['Papito Barbershop'],
      'wisata-kuliner': ['Otakiri', 'Diatas Meja', 'LeBiru Banjar'],
    };

    const coordinates = [
      { x: 30, y: 60 }, // Pasar Banjar
      { x: 65, y: 45 }, // Otto Iskandardinata
      { x: 40, y: 70 }, // DR. Soetomo
      { x: 75, y: 75 }, // Hegarsari
      { x: 20, y: 50 }, // Sudirman
      { x: 55, y: 30 }, // Pataruman
    ];

    let areas = [];
    let coordIndex = 0;

    Object.entries(areaTypes).forEach(([type, umkmNames]) => {
      if (umkmNames.length > 0 && coordIndex < coordinates.length) {
        const umkmInArea = umkmList.filter((umkm) =>
          umkmNames.includes(umkm.name)
        );

        if (umkmInArea.length > 0) {
          areas.push({
            name: getAreaName(type),
            type: type,
            description: getAreaDescription(type, umkmInArea),
            x: coordinates[coordIndex].x,
            y: coordinates[coordIndex].y,
            umkmCount: umkmInArea.length,
            landmark: getLandmarkIcon(type),
            umkmList: umkmInArea.slice(0, 3), // Ambil 3 UMKM pertama untuk display
          });
          coordIndex++;
        }
      }
    });

    return areas;
  };

  // Helper functions
  const getAreaName = (type) => {
    const names = {
      'pasar-tradisional': 'Pasar Banjar',
      'pusat-bisnis': 'Jl. Otto Iskandardinata',
      kuliner: 'Jl. DR. Soetomo',
      kerajinan: 'Kawasan Hegarsari',
      jasa: 'Jl. Jendral Sudirman',
      'wisata-kuliner': 'Pataruman',
    };
    return names[type] || 'Kawasan UMKM';
  };

  const getAreaDescription = (type, umkmList) => {
    const baseDescriptions = {
      'pasar-tradisional': 'Pusat UMKM kuliner dan kerajinan tradisional',
      'pusat-bisnis': 'Kawasan fashion, jasa modern, dan retail terpadu',
      kuliner: 'Surga jajanan khas Banjar dan makanan lokal autentik',
      kerajinan: 'Sentra kerajinan tangan, batik khas, dan souvenir',
      jasa: 'Berbagai layanan jasa, reparasi, dan konsultan',
      'wisata-kuliner': 'Tempat nongkrong dan cafe kekinian anak muda',
    };

    const umkmNames = umkmList.map((umkm) => umkm.name).join(', ');
    return `${baseDescriptions[type]}. Menampilkan: ${umkmNames}`;
  };

  const getLandmarkIcon = (type) => {
    const icons = {
      'pasar-tradisional': '🏪',
      'pusat-bisnis': '🏢',
      kuliner: '🍜',
      kerajinan: '🎨',
      jasa: '🔧',
      'wisata-kuliner': '☕',
    };
    return icons[type] || '📍';
  };

  const [banjarAreas, setBanjarAreas] = useState([]);

  useEffect(() => {
    if (banjarAreas.length > 0) {
      const interval = setInterval(() => {
        setActivePin((prev) => (prev + 1) % banjarAreas.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [banjarAreas]);

  const getPinColor = (type) => {
    const colors = {
      'pasar-tradisional': 'text-orange-400',
      'pusat-bisnis': 'text-blue-400',
      kuliner: 'text-red-400',
      kerajinan: 'text-purple-400',
      jasa: 'text-green-400',
      'wisata-kuliner': 'text-pink-400',
    };
    return colors[type] || 'text-gray-400';
  };

  // Hitung total stats dari data UMKM
  const totalStats = {
    umkmCount: umkmData.length,
    categories: new Set(umkmData.flatMap((umkm) => umkm.category)).size,
    avgRating:
      umkmData.length > 0
        ? (
            umkmData.reduce((sum, umkm) => sum + parseFloat(umkm.rating), 0) /
            umkmData.length
          ).toFixed(1)
        : '0.0',
  };

  if (isLoading) {
    return (
      <section className='bg-linear-to-br from-primary via-primary to-primary-dark py-20'>
        <div className='container mx-auto px-6'>
          <div className='grid lg:grid-cols-2 gap-12 items-center'>
            <div className='relative h-96 bg-white/5 rounded-2xl animate-pulse'></div>
            <div className='text-white'>
              <div className='h-12 bg-white/10 rounded mb-6 animate-pulse'></div>
              <div className='h-24 bg-white/10 rounded mb-8 animate-pulse'></div>
              <div className='h-32 bg-white/10 rounded mb-8 animate-pulse'></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='bg-linear-to-br from-primary via-primary to-primary-dark py-12 md:py-20'>
      <div className='container mx-auto px-4 sm:px-6'>
        <div className='grid lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
          {/* Left: Detailed Stylized Banjar Map */}
          <div className='relative h-80 sm:h-96 bg-white/5 rounded-2xl p-4 sm:p-6 backdrop-blur-sm border border-white/20 overflow-hidden'>
            {/* Map Container dengan background texture */}
            <div className='absolute inset-0 bg-gradient-to-br from-blue-50/5 via-green-50/5 to-purple-50/5'>
              {/* Detailed SVG Map Kota Banjar */}
              <svg viewBox='0 0 100 100' className='w-full h-full'>
                <defs>
                  {/* Gradients */}
                  <linearGradient
                    id='landGradient'
                    x1='0%'
                    y1='0%'
                    x2='100%'
                    y2='100%'
                  >
                    <stop offset='0%' stopColor='#10B981' stopOpacity='0.3' />
                    <stop offset='100%' stopColor='#059669' stopOpacity='0.1' />
                  </linearGradient>

                  <linearGradient
                    id='waterGradient'
                    x1='0%'
                    y1='0%'
                    x2='100%'
                    y2='100%'
                  >
                    <stop offset='0%' stopColor='#3B82F6' stopOpacity='0.4' />
                    <stop offset='100%' stopColor='#1D4ED8' stopOpacity='0.2' />
                  </linearGradient>

                  <pattern
                    id='grid'
                    width='10'
                    height='10'
                    patternUnits='userSpaceOnUse'
                  >
                    <path
                      d='M 10 0 L 0 0 0 10'
                      fill='none'
                      stroke='white'
                      strokeWidth='0.5'
                      strokeOpacity='0.1'
                    />
                  </pattern>
                </defs>

                {/* Background Grid */}
                <rect width='100' height='100' fill='url(#grid)' />

                {/* Main Land Area */}
                <path
                  d='M10,10 Q30,5 40,15 Q60,20 70,10 Q85,15 90,25 Q95,40 85,60 Q75,80 60,85 Q40,90 25,80 Q15,70 10,50 Q5,30 10,10'
                  fill='url(#landGradient)'
                  stroke='#10B981'
                  strokeWidth='0.3'
                  strokeOpacity='0.5'
                />

                {/* Citanduy River */}
                <path
                  d='M5,25 Q15,30 20,35 Q25,45 30,50 Q35,60 40,65 Q50,70 60,68 Q70,65 75,60 Q80,55 85,50 Q90,45 95,40'
                  fill='url(#waterGradient)'
                  stroke='#3B82F6'
                  strokeWidth='0.8'
                  strokeOpacity='0.6'
                />

                {/* Main Roads */}
                <path
                  d='M15,30 L45,30 L55,40 L75,40 M30,15 L30,45 L35,55 L35,75 M60,20 L60,60 L65,70'
                  stroke='white'
                  strokeWidth='0.8'
                  strokeOpacity='0.4'
                  strokeDasharray='1.5 1.5'
                  fill='none'
                />

                {/* Secondary Roads */}
                <path
                  d='M20,25 L35,25 M25,35 L40,35 M50,25 L65,25 M55,50 L70,50 M40,65 L55,65'
                  stroke='white'
                  strokeWidth='0.4'
                  strokeOpacity='0.3'
                  strokeDasharray='1 1'
                  fill='none'
                />

                {/* Green Areas/Parks */}
                <circle
                  cx='25'
                  cy='25'
                  r='3'
                  fill='#22C55E'
                  fillOpacity='0.3'
                  stroke='#22C55E'
                  strokeWidth='0.2'
                />
                <circle
                  cx='65'
                  cy='35'
                  r='2.5'
                  fill='#22C55E'
                  fillOpacity='0.3'
                  stroke='#22C55E'
                  strokeWidth='0.2'
                />
                <circle
                  cx='45'
                  cy='65'
                  r='2'
                  fill='#22C55E'
                  fillOpacity='0.3'
                  stroke='#22C55E'
                  strokeWidth='0.2'
                />

                {/* Landmark Icons */}
                <text
                  x='30'
                  y='60'
                  fontSize='3'
                  fill='white'
                  fillOpacity='0.6'
                  textAnchor='middle'
                >
                  🏪
                </text>
                <text
                  x='65'
                  y='45'
                  fontSize='3'
                  fill='white'
                  fillOpacity='0.6'
                  textAnchor='middle'
                >
                  🏢
                </text>
                <text
                  x='40'
                  y='70'
                  fontSize='3'
                  fill='white'
                  fillOpacity='0.6'
                  textAnchor='middle'
                >
                  🍜
                </text>
                <text
                  x='75'
                  y='75'
                  fontSize='3'
                  fill='white'
                  fillOpacity='0.6'
                  textAnchor='middle'
                >
                  🎨
                </text>
                <text
                  x='20'
                  y='50'
                  fontSize='3'
                  fill='white'
                  fillOpacity='0.6'
                  textAnchor='middle'
                >
                  🔧
                </text>
                <text
                  x='55'
                  y='30'
                  fontSize='3'
                  fill='white'
                  fillOpacity='0.6'
                  textAnchor='middle'
                >
                  ☕
                </text>

                {/* Area Labels */}
                <text
                  x='30'
                  y='63'
                  fontSize='1.5'
                  fill='white'
                  fillOpacity='0.8'
                  textAnchor='middle'
                >
                  Pasar
                </text>
                <text
                  x='65'
                  y='48'
                  fontSize='1.5'
                  fill='white'
                  fillOpacity='0.8'
                  textAnchor='middle'
                >
                  Otto
                </text>
                <text
                  x='40'
                  y='73'
                  fontSize='1.5'
                  fill='white'
                  fillOpacity='0.8'
                  textAnchor='middle'
                >
                  Soetomo
                </text>
                <text
                  x='75'
                  y='78'
                  fontSize='1.5'
                  fill='white'
                  fillOpacity='0.8'
                  textAnchor='middle'
                >
                  Hegarsari
                </text>
                <text
                  x='20'
                  y='53'
                  fontSize='1.5'
                  fill='white'
                  fillOpacity='0.8'
                  textAnchor='middle'
                >
                  Sudirman
                </text>
                <text
                  x='55'
                  y='33'
                  fontSize='1.5'
                  fill='white'
                  fillOpacity='0.8'
                  textAnchor='middle'
                >
                  Pataruman
                </text>
              </svg>

              {/* Interactive Pins */}
              {banjarAreas.map((area, index) => (
                <motion.div
                  key={index}
                  className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                    activePin === index ? 'z-20' : 'z-10'
                  }`}
                  style={{
                    left: `${area.x}%`,
                    top: `${area.y}%`,
                  }}
                  initial={{ scale: 0 }}
                  animate={{
                    scale: activePin === index ? 1.4 : 0.9,
                    opacity: activePin === index ? 1 : 0.8,
                  }}
                  whileHover={{ scale: 1.5 }}
                  onClick={() => setActivePin(index)}
                >
                  <motion.div
                    animate={{
                      y: activePin === index ? [0, -6, 0] : 0,
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: activePin === index ? Infinity : 0,
                    }}
                    className='relative'
                  >
                    {/* Animated Pin */}
                    <MapPin
                      size={28}
                      className={`${getPinColor(
                        area.type
                      )} drop-shadow-lg filter brightness-125`}
                      fill='currentColor'
                    />

                    {/* Floating Icon */}
                    <motion.div
                      className='absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-lg'
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: 'reverse',
                      }}
                    >
                      <span className='text-xs'>{area.landmark}</span>
                    </motion.div>
                  </motion.div>

                  {/* Pulse Effect */}
                  {activePin === index && (
                    <motion.div
                      className='absolute inset-0 rounded-full bg-current opacity-30'
                      animate={{ scale: [1, 3], opacity: [0.3, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              ))}

              {/* Animated Connection Lines */}
              <svg className='absolute inset-0 w-full h-full'>
                {banjarAreas.map((area, index) => (
                  <motion.line
                    key={index}
                    x1='50%'
                    y1='50%'
                    x2={`${area.x}%`}
                    y2={`${area.y}%`}
                    stroke='white'
                    strokeWidth='0.8'
                    strokeDasharray='4 4'
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{
                      opacity: activePin === index ? 0.6 : 0,
                      pathLength: activePin === index ? 1 : 0,
                    }}
                    transition={{ duration: 1.2 }}
                  />
                ))}
              </svg>
            </div>

            {/* Map Title */}
            <div className='absolute top-3 left-3 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1'>
              <div className='text-white font-semibold text-xs flex items-center gap-1'>
                <MapPin size={12} />
                <span className='hidden sm:inline'>Peta UMKM Kota Banjar</span>
                <span className='sm:hidden'>Peta UMKM</span>
              </div>
            </div>

            {/* Map Legend - Hide on mobile, show on medium screens and up */}
            <div className='absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm rounded-lg p-2 text-white text-xs max-w-40 hidden md:block'>
              <div className='font-semibold mb-1 flex items-center gap-1'>
                <Landmark size={10} />
                <span>Legenda:</span>
              </div>
              <div className='grid grid-cols-2 gap-0.5'>
                <div className='flex items-center gap-1'>
                  <div className='w-1.5 h-1.5 bg-orange-400 rounded-full'></div>
                  <span>Pasar</span>
                </div>
                <div className='flex items-center gap-1'>
                  <div className='w-1.5 h-1.5 bg-blue-400 rounded-full'></div>
                  <span>Bisnis</span>
                </div>
                <div className='flex items-center gap-1'>
                  <div className='w-1.5 h-1.5 bg-red-400 rounded-full'></div>
                  <span>Kuliner</span>
                </div>
              </div>
            </div>

            {/* Watermark */}
            <div className='absolute bottom-3 right-3 text-white/40 text-xs'>
              <span className='hidden sm:inline'>Kota Banjar, Jawa Barat</span>
              <span className='sm:hidden'>Banjar</span>
            </div>
          </div>

          {/* Right: Content Area */}
          <div className='text-white'>
            <motion.h2
              className='text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6'
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Jelajahi <span className='text-secondary'>Kekayaan Lokal</span>{' '}
              Banjar
            </motion.h2>

            <AnimatePresence mode='wait'>
              <motion.div
                key={activePin}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className='mb-6 sm:mb-8 bg-white/10 rounded-xl p-4 sm:p-6 backdrop-blur-sm border border-white/20'
              >
                <div className='flex items-start gap-3 sm:gap-4'>
                  <div className='text-2xl sm:text-3xl'>
                    {banjarAreas[activePin]?.landmark}
                  </div>
                  <div className='flex-1'>
                    <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2'>
                      <h3 className='text-lg sm:text-xl font-semibold'>
                        {banjarAreas[activePin]?.name}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${
                          banjarAreas[activePin]?.type === 'pasar-tradisional'
                            ? 'bg-orange-500/20 text-orange-300'
                            : banjarAreas[activePin]?.type === 'pusat-bisnis'
                            ? 'bg-blue-500/20 text-blue-300'
                            : banjarAreas[activePin]?.type === 'kuliner'
                            ? 'bg-red-500/20 text-red-300'
                            : banjarAreas[activePin]?.type === 'kerajinan'
                            ? 'bg-purple-500/20 text-purple-300'
                            : banjarAreas[activePin]?.type === 'jasa'
                            ? 'bg-green-500/20 text-green-300'
                            : 'bg-pink-500/20 text-pink-300'
                        }`}
                      >
                        {banjarAreas[activePin]?.type.split('-').join(' ')}
                      </span>
                    </div>
                    <p className='text-white/80 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base'>
                      {banjarAreas[activePin]?.description}
                    </p>

                    {/* Daftar UMKM di area ini */}
                    {banjarAreas[activePin]?.umkmList && (
                      <div className='mb-3'>
                        <p className='text-white/70 text-sm mb-2'>
                          UMKM di area ini:
                        </p>
                        <div className='flex flex-wrap gap-1'>
                          {banjarAreas[activePin].umkmList.map((umkm, idx) => (
                            <span
                              key={idx}
                              className='bg-white/10 px-2 py-1 rounded text-xs'
                            >
                              {umkm.name}
                            </span>
                          ))}
                          {banjarAreas[activePin].umkmCount > 3 && (
                            <span className='bg-white/10 px-2 py-1 rounded text-xs'>
                              +{banjarAreas[activePin].umkmCount - 3} lainnya
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className='flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/70'>
                      <div className='flex items-center gap-1 sm:gap-2'>
                        <Users size={14} className='sm:w-4 sm:h-4' />
                        <span>{banjarAreas[activePin]?.umkmCount}+ UMKM</span>
                      </div>
                      <div className='flex items-center gap-1 sm:gap-2'>
                        <TrendingUp size={14} className='sm:w-4 sm:h-4' />
                        <span>Aktif</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* CTA Buttons */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='flex gap-3 sm:gap-4'
            >
              <Link
                href='/umkm'
                className='flex-1 flex items-center justify-center gap-2 sm:gap-3 bg-secondary hover:bg-secondary-dark text-white font-semibold px-4 sm:px-6 py-3 sm:py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base'
              >
                <Navigation size={18} className='sm:w-5 sm:h-5' />
                Jelajahi Semua UMKM
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanjarDetailedMap;
