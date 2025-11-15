'use client';

import MapSection from '@/components/MapSection';
import {
  ArrowRight,
  CheckCircle,
  Eye,
  Flag,
  Handshake,
  Heart,
  Lightbulb,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';

const Page = () => {
  return (
    <main className='min-h-screen bg-white pt-20'>
      {/* Improved Hero Section */}
      <section className='relative min-h-[80vh] flex items-center justify-center overflow-hidden'>
        {/* Background Gradient */}
        <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-secondary/5'></div>

        {/* Animated Background Elements */}
        <div className='absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl animate-pulse delay-500'></div>

        <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            {/* Text Content */}
            <div className='text-center lg:text-left space-y-8'>
              {/* Badge */}
              <div className='inline-flex items-center gap-2 bg-primary/10 text-primary-dark px-4 py-2 rounded-full text-sm font-medium mb-4'>
                <TrendingUp className='size-4' />
                <span>Platform UMKM Indonesia</span>
              </div>

              {/* Main Heading */}
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-primary-dark leading-tight'>
                Membangun{' '}
                <span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
                  Ekosistem UMKM
                </span>{' '}
                yang Kuat
              </h1>

              {/* Subheading */}
              <p className='text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl'>
                Wujudkan potensi bisnis lokal melalui platform digital yang
                menghubungkan, memberdayakan, dan mengembangkan UMKM di
                Indonesia
              </p>

              {/* CTA Buttons */}
              <div className='flex flex-col sm:flex-row gap-4 justify-self-center lg:justify-self-start'>
                <button className='bg-secondary max-w-max text-white py-2 px-4 md:py-4 md:px-8 rounded-full hover:-translate-y-1 hover:shadow-xl transition-all duration-300 hover:bg-secondary-dark flex items-center gap-3 group font-semibold text-lg'>
                  Mulai Jelajahi UMKM
                  <ArrowRight className='size-5 group-hover:translate-x-1 transition-transform duration-300' />
                </button>
              </div>
            </div>

            {/* Video/Image Content */}
            <div className='relative'>
              <div className='relative rounded-3xl overflow-hidden'>
                <video
                  src='/videos/video.mp4'
                  autoPlay
                  loop
                  muted
                  className='w-full h-full object-cover mix-blend-multiply'
                />
                <div className='absolute inset-0 bg-white -z-10'></div>
                {/* Overlay Gradient */}
                <div className='absolute inset-0 bg-linear-to-t from-primary-dark/80 via-transparent to-transparent'></div>

                {/* Floating Stats */}
                <div className='absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg hidden md:block'>
                  <div className='text-center'>
                    <div className='text-2xl font-bold text-primary-dark'>
                      10
                    </div>
                    <div className='text-xs text-gray-600'>UMKM Terdaftar</div>
                  </div>
                </div>

                <div className='absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg hidden md:block'>
                  <div className='text-center'>
                    <div className='text-2xl font-bold text-primary-dark'>
                      4.8
                    </div>
                    <div className='text-xs text-gray-600'>Rating</div>
                  </div>
                </div>

                {/* Bottom Content */}
                <div className='absolute bottom-6 left-6 right-6 hidden md:block'>
                  <div className='bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg'>
                    <h3 className='font-bold text-primary-dark text-lg mb-2'>
                      Ekosistem UMKM Banjar
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      Temukan dan dukung UMKM terbaik di Kota Banjar dalam satu
                      platform terintegrasi
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className='absolute -top-4 -right-4 w-24 h-24 bg-secondary/20 rounded-2xl transform rotate-12 animate-float'></div>
              <div className='absolute -bottom-4 -left-4 w-20 h-20 bg-primary/20 rounded-2xl transform -rotate-12 animate-float delay-1000'></div>
            </div>
          </div>
        </div>
      </section>

      {/* Improved Visi, Misi & Tujuan Section */}
      <section className='py-16 bg-muted/40 relative overflow-hidden'>
        {/* Background Pattern */}
        <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5'></div>

        <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          {/* Header Section */}
          <div className='text-center mb-16'>
            <div className='inline-flex items-center gap-2 bg-primary/10 text-primary-dark px-4 py-2 rounded-full text-sm font-medium mb-4'>
              <Target className='size-4' />
              <span>Strategi Kami</span>
            </div>
            <h1 className='text-4xl md:text-5xl font-bold text-primary-dark mb-4'>
              Visi, Misi & Tujuan
            </h1>
            <p className='text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed'>
              Panduan strategis kami dalam membangun ekosistem UMKM yang
              berkelanjutan dan berdampak positif bagi perekonomian Kota Banjar
            </p>
            <div className='w-24 h-1.5 bg-secondary mx-auto mt-8 rounded-full'></div>
          </div>

          {/* Cards Grid */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Visi Card */}
            <div className='group relative'>
              <div className='absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300'></div>
              <div className='relative bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 group-hover:-translate-y-2 h-full flex flex-col'>
                <div className='flex items-center gap-4 mb-6'>
                  <div className='p-3 bg-primary/20 rounded-2xl'>
                    <Eye className='size-8 text-primary-dark' />
                  </div>
                  <h2 className='text-2xl font-bold text-primary-dark'>
                    Visi Kami
                  </h2>
                </div>
                <div className='flex-1'>
                  <p className='text-gray-700 text-lg leading-relaxed mb-6'>
                    Menjadi platform terdepan dalam memberdayakan UMKM Kota
                    Banjar untuk bersaing di era digital dan menjadi motor
                    penggerak perekonomian lokal yang berkelanjutan.
                  </p>
                </div>
                <div className='mt-6 pt-6 border-t border-gray-100'>
                  <div className='flex items-center gap-2 text-primary-dark'>
                    <div className='w-2 h-2 bg-secondary rounded-full'></div>
                    <span className='text-sm font-medium'>Jangka Panjang</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Misi Card */}
            <div className='group relative'>
              <div className='absolute inset-0 bg-gradient-to-br from-secondary to-amber-500 rounded-3xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-300'></div>
              <div className='relative bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 group-hover:-translate-y-2 h-full flex flex-col'>
                <div className='flex items-center gap-4 mb-6'>
                  <div className='p-3 bg-secondary/20 rounded-2xl'>
                    <Target className='size-8 text-secondary-dark' />
                  </div>
                  <h2 className='text-2xl font-bold text-primary-dark'>
                    Misi Kami
                  </h2>
                </div>
                <div className='flex-1 space-y-4'>
                  {[
                    'Menyediakan platform digital yang mudah diakses oleh UMKM dan konsumen',
                    'Meningkatkan kapasitas dan kompetensi pelaku UMKM melalui pelatihan dan pendampingan',
                    'Memperluas jaringan pemasaran produk UMKM baik lokal maupun nasional',
                    'Menjalin kemitraan strategis dengan berbagai pihak untuk pengembangan UMKM',
                  ].map((item, index) => (
                    <div
                      key={index}
                      className='flex items-start gap-3 group/item'
                    >
                      <div className='flex-shrink-0 w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center mt-0.5'>
                        <CheckCircle className='size-4 text-secondary' />
                      </div>
                      <p className='text-gray-700 leading-relaxed group-hover/item:text-gray-900 transition-colors duration-200'>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
                <div className='mt-6 pt-6 border-t border-gray-100'>
                  <div className='flex items-center gap-2 text-primary-dark'>
                    <div className='w-2 h-2 bg-amber-500 rounded-full'></div>
                    <span className='text-sm font-medium'>Aksi Nyata</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tujuan Card */}
            <div className='group relative'>
              <div className='absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300'></div>
              <div className='relative bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 group-hover:-translate-y-2 h-full flex flex-col'>
                <div className='flex items-center gap-4 mb-6'>
                  <div className='p-3 bg-amber-500/20 rounded-2xl'>
                    <Flag className='size-8 text-amber-600' />
                  </div>
                  <h2 className='text-2xl font-bold text-primary-dark'>
                    Tujuan Kami
                  </h2>
                </div>
                <div className='flex-1'>
                  <div className='grid gap-4'>
                    {[
                      {
                        goal: '9+ UMKM Terdaftar',
                        desc: 'Meningkatkan jumlah UMKM yang terdaftar dan aktif di platform',
                      },
                      {
                        goal: '3% Peningkatan Omset',
                        desc: 'Meningkatkan omset dan perluasan pasar bagi UMKM binaan',
                      },
                      {
                        goal: 'Brand Awareness',
                        desc: 'Membangun brand awareness produk UMKM Kota Banjar',
                      },
                      {
                        goal: '1 Lapangan Kerja',
                        desc: 'Menciptakan lapangan kerja melalui pengembangan UMKM',
                      },
                      {
                        goal: 'Inovasi Produk',
                        desc: 'Mendorong inovasi dan kreativitas dalam produk UMKM lokal',
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className='p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:border-amber-200 transition-all duration-200 group/item'
                      >
                        <h4 className='font-bold text-primary-dark text-sm mb-1'>
                          {item.goal}
                        </h4>
                        <p className='text-xs text-gray-600 leading-relaxed'>
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='mt-6 pt-6 border-t border-gray-100'>
                  <div className='flex items-center gap-2 text-primary-dark'>
                    <div className='w-2 h-2 bg-orange-500 rounded-full'></div>
                    <span className='text-sm font-medium'>Target Terukur</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Improved Nilai-Nilai Kami Section */}
      <section className='py-16 bg-white relative overflow-hidden'>
        {/* Background Pattern */}

        <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          {/* Header Section */}
          <div className='text-center mb-16'>
            <div className='inline-flex items-center gap-2 bg-primary/10 text-primary-dark px-4 py-2 rounded-full text-sm font-medium mb-4'>
              <Sparkles className='size-4' />
              <span>Budaya Organisasi</span>
            </div>
            <h2 className='text-4xl md:text-5xl font-bold text-primary-dark mb-4'>
              Nilai-Nilai Kami
            </h2>
            <p className='text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed'>
              Prinsip fundamental yang menjadi pedoman dalam setiap langkah dan
              keputusan kami membangun ekosistem UMKM Kota Banjar
            </p>
            <div className='w-24 h-1.5 bg-secondary mx-auto mt-8 rounded-full'></div>
          </div>

          {/* Values Grid */}
          <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8'>
            {/* Kolaborasi Card */}
            <div className='group relative'>
              <div className='absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300'></div>
              <div className='relative bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 group-hover:-translate-y-2 h-full flex flex-col'>
                <div className='flex items-center gap-4 mb-6'>
                  <div className='p-3 bg-blue-500/20 rounded-2xl'>
                    <Handshake className='size-8 text-blue-600' />
                  </div>
                  <h2 className='text-2xl font-bold text-primary-dark'>
                    Kolaborasi
                  </h2>
                </div>
                <div className='flex-1'>
                  <p className='text-gray-700 text-lg leading-relaxed mb-6'>
                    Kami percaya bahwa kemajuan UMKM dapat dicapai melalui
                    kerjasama dan sinergi antara semua pemangku kepentingan.
                  </p>
                </div>
                <div className='mt-6 pt-6 border-t border-gray-100'>
                  <div className='flex items-center gap-2 text-primary-dark'>
                    <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                    <span className='text-sm font-medium'>Teamwork</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Inovasi Card */}
            <div className='group relative'>
              <div className='absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-300'></div>
              <div className='relative bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 group-hover:-translate-y-2 h-full flex flex-col'>
                <div className='flex items-center gap-4 mb-6'>
                  <div className='p-3 bg-purple-500/20 rounded-2xl'>
                    <Lightbulb className='size-8 text-purple-600' />
                  </div>
                  <h2 className='text-2xl font-bold text-primary-dark'>
                    Inovasi
                  </h2>
                </div>
                <div className='flex-1'>
                  <p className='text-gray-700 text-lg leading-relaxed mb-6'>
                    Terus berinovasi dalam menyediakan solusi dan layanan yang
                    relevan dengan kebutuhan UMKM di era digital.
                  </p>
                </div>
                <div className='mt-6 pt-6 border-t border-gray-100'>
                  <div className='flex items-center gap-2 text-primary-dark'>
                    <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
                    <span className='text-sm font-medium'>Kreativitas</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Integritas Card */}
            <div className='group relative'>
              <div className='absolute inset-0 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300'></div>
              <div className='relative bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 group-hover:-translate-y-2 h-full flex flex-col'>
                <div className='flex items-center gap-4 mb-6'>
                  <div className='p-3 bg-green-500/20 rounded-2xl'>
                    <Heart className='size-8 text-green-600' />
                  </div>
                  <h2 className='text-2xl font-bold text-primary-dark'>
                    Integritas
                  </h2>
                </div>
                <div className='flex-1'>
                  <p className='text-gray-700 text-lg leading-relaxed mb-6'>
                    Menjunjung tinggi kejujuran, transparansi, dan etika dalam
                    setiap interaksi dan layanan yang kami berikan.
                  </p>
                </div>
                <div className='mt-6 pt-6 border-t border-gray-100'>
                  <div className='flex items-center gap-2 text-primary-dark'>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    <span className='text-sm font-medium'>Kejujuran</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pemberdayaan Card */}
            <div className='group relative'>
              <div className='absolute inset-0 bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-300'></div>
              <div className='relative bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 group-hover:-translate-y-2 h-full flex flex-col'>
                <div className='flex items-center gap-4 mb-6'>
                  <div className='p-3 bg-amber-500/20 rounded-2xl'>
                    <Users className='size-8 text-amber-600' />
                  </div>
                  <h2 className='text-2xl font-bold text-primary-dark'>
                    Pemberdayaan
                  </h2>
                </div>
                <div className='flex-1'>
                  <p className='text-gray-700 text-lg leading-relaxed mb-6'>
                    Fokus pada peningkatan kapasitas dan kemandirian UMKM, bukan
                    sekadar memberikan bantuan.
                  </p>
                </div>
                <div className='mt-6 pt-6 border-t border-gray-100'>
                  <div className='flex items-center gap-2 text-primary-dark'>
                    <div className='w-2 h-2 bg-amber-500 rounded-full'></div>
                    <span className='text-sm font-medium'>Empowerment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
        </div>
      </section>

      <MapSection />

      <section className='text-center bg-primary py-20 px-6'>
        <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
          Bergabunglah dengan Gerakan Kami
        </h2>
        <p className='text-lg text-white max-w-3xl mx-auto mb-8'>
          Mari bersama-sama mendukung produk lokal dan menggerakkan roda
          perekonomian bangsa. Jelajahi direktori kami, temukan UMKM favoritmu,
          dan jadilah bagian dari perubahan.
        </p>
        <button className='bg-secondary text-white px-8 py-4 rounded-full max-w-max hover:-translate-y-1 hover:shadow-md transition-all duration-200 hover:bg-secondary-dark flex items-center gap-2 group mx-auto'>
          Daftarkan UMKM Anda
          <ArrowRight className='size-5 group-hover:translate-x-1 transition-transform duration-200' />
        </button>
      </section>
    </main>
  );
};

export default Page;
