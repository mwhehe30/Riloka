import { Award, Globe, Heart, Sparkles, Users } from 'lucide-react';
import Link from 'next/link';

const Page = () => {
  return (
    <main className='min-h-screen'>
      <section className='relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center'>
        <div className='absolute inset-0 -z-10 overflow-hidden'>
          <div className='absolute top-20 right-0 size-36 md:size-64 lg:size-96 bg-primary/20 lg:bg-primary/10 rounded-full blur-3xl' />
          <div className='absolute bottom-0 left-0 size-36 md:size-64 lg:size-96 bg-accent/20 lg:bg-accent/10 rounded-full blur-3xl' />
        </div>

        <div className='max-w-5xl mx-auto text-center relative z-10'>
          <div
            className={`inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 font-medium text-sm `}
          >
            <Sparkles className={`size-4`} />
            Mengenal Riloka Lebih Dekat
          </div>

          <h1
            className={`text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 leading-tight font-montserrat`}
          >
            Tentang{' '}
            <span
              className={`text-transparent bg-clip-text bg-linear-to-r from-primary to-accent`}
            >
              Riloka
            </span>
          </h1>

          <p
            className={`text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed`}
          >
            Riloka adalah platform direktori UMKM yang lahir dari semangat untuk
            mendukung dan memajukan usaha mikro, kecil, dan menengah di seluruh
            Indonesia. Kami percaya bahwa UMKM adalah tulang punggung
            perekonomian bangsa yang perlu mendapatkan sorotan lebih.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <div className='py-16 bg-muted/20'>
        <div className='container mx-auto px-6 lg:px-12'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
            <div
              className={`p-6 hover:scale-105 transition-transform duration-300`}
            >
              <div
                className={`text-4xl md:text-5xl font-bold text-primary mb-2`}
              >
                10
              </div>
              <div className='text-muted-foreground'>UMKM Terdaftar</div>
            </div>
            <div
              className={`p-6 hover:scale-105 transition-transform duration-300`}
            >
              <div
                className={`text-4xl md:text-5xl font-bold text-primary mb-2`}
              >
                3
              </div>
              <div className='text-muted-foreground'>Pelanggan Aktif</div>
            </div>
            <div
              className={`p-6 hover:scale-105 transition-transform duration-300`}
            >
              <div
                className={`text-4xl md:text-5xl font-bold text-primary mb-2`}
              >
                1
              </div>
              <div className='text-muted-foreground'>Kota di Indonesia</div>
            </div>
            <div
              className={`p-6 hover:scale-105 transition-transform duration-300`}
            >
              <div
                className={`text-4xl md:text-5xl font-bold text-primary mb-2`}
              >
                1
              </div>
              <div className='text-muted-foreground'>Tahun Pengalaman</div>
            </div>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-6 lg:px-12 py-12 md:py-16'>
        {/* Mission and Vision */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20`}
        >
          <div className='text-left hover:translate-y-[-5px] transition-transform duration-300'>
            <h2 className='text-3xl md:text-4xl font-bold text-foreground mb-4'>
              Misi Kami
            </h2>
            <p className='text-lg text-muted-foreground leading-relaxed'>
              Misi kami adalah memberikan panggung digital bagi para pelaku UMKM
              untuk menampilkan produk dan jasa terbaik mereka. Kami ingin
              memudahkan masyarakat menemukan dan terhubung dengan UMKM lokal
              berkualitas, serta mendorong pertumbuhan ekonomi lokal yang
              berkelanjutan.
            </p>
          </div>
          <div className='text-left md:text-right hover:translate-y-[-5px] transition-transform duration-300'>
            <h2 className='text-3xl md:text-4xl font-bold text-foreground mb-4'>
              Visi Kami
            </h2>
            <p className='text-lg text-muted-foreground leading-relaxed'>
              Visi kami adalah menjadi jembatan utama yang menghubungkan UMKM
              dengan pasar yang lebih luas, baik domestik maupun global. Kami
              bermimpi untuk menciptakan ekosistem di mana setiap UMKM dapat
              berkembang dan berdaya saing tinggi di era digital.
            </p>
          </div>
        </div>

        {/* Our Values */}
        <div className={`mb-20 `}>
          <h2 className='text-3xl md:text-4xl font-bold text-foreground mb-12 text-center'>
            Nilai-Nilai Kami
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div
              className={`bg-card p-8 rounded-xl shadow-sm border border-border text-center hover:shadow-lg transition-shadow duration-300`}
            >
              <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Heart className='size-8 text-primary' />
              </div>
              <h3 className='text-xl font-bold mb-3'>Penuh Empati</h3>
              <p className='text-muted-foreground'>
                Kami memahami tantangan yang dihadapi pelaku UMKM dan berusaha
                menjadi solusi terbaik untuk mereka.
              </p>
            </div>
            <div
              className={`bg-card p-8 rounded-xl shadow-sm border border-border text-center hover:shadow-lg transition-shadow duration-300`}
            >
              <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Globe className='size-8 text-primary' />
              </div>
              <h3 className='text-xl font-bold mb-3'>Berorientasi Global</h3>
              <p className='text-muted-foreground'>
                Kami membantu UMKM lokal bersaing di pasar global dengan
                memanfaatkan teknologi digital.
              </p>
            </div>
            <div
              className={`bg-card p-8 rounded-xl shadow-sm border border-border text-center hover:shadow-lg transition-shadow duration-300`}
            >
              <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Award className='size-8 text-primary' />
              </div>
              <h3 className='text-xl font-bold mb-3'>Komitmen Kualitas</h3>
              <p className='text-muted-foreground'>
                Kami menjamin kualitas UMKM yang terdaftar di platform kami
                melalui proses verifikasi yang ketat.
              </p>
            </div>
          </div>
        </div>

        {/* Our Team */}
        <div className={`mb-20`}>
          <h2 className='text-3xl md:text-4xl font-bold text-foreground mb-4 text-center'>
            Tim Kami
          </h2>
          <p className='text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto'>
            Kami adalah tim yang terdiri dari para profesional muda yang
            memiliki semangat tinggi terhadap perkembangan UMKM di Indonesia.
          </p>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {[
              {
                name: 'Zaky Mubarok',
                role: 'Web Developer',
              },
              {
                name: 'Dhanis Fathan Gunawan',
                role: 'Designer',
              },
              {
                name: 'Wisnu Nugroho',
                role: 'Data Researcher',
              },
            ].map((item) => (
              <div
                key={item.name}
                className={`text-center group hover:translate-y-[-10px] transition-transform duration-300`}
              >
                <div className='w-32 h-32 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300'>
                  <Users className='size-12 text-muted-foreground' />
                </div>
                <h3 className='text-xl font-bold'>{item.name}</h3>
                <p className='text-muted-foreground'>{item.role}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={`text-center`}>
          <h2 className='text-3xl md:text-4xl font-bold text-foreground mb-4'>
            Bergabunglah dengan Gerakan Kami
          </h2>
          <p className='text-lg text-muted-foreground max-w-3xl mx-auto mb-8'>
            Mari bersama-sama mendukung produk lokal dan menggerakkan roda
            perekonomian bangsa. Jelajahi direktori kami, temukan UMKM
            favoritmu, dan jadilah bagian dari perubahan.
          </p>
          <Link
            href='/umkm'
            className='px-8 py-4 font-medium text-white bg-primary rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105'
          >
            Jelajahi UMKM Sekarang
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Page;
