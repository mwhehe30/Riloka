import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <main className='min-h-screen'>
      <section className='relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center'>
        <div className='absolute inset-0 -z-10'>
          <div className='absolute top-20 right-0 size-36 md:size-64 lg:size-96 bg-primary/20 lg:bg-primary/10 rounded-full blur-3xl' />
          <div className='absolute bottom-0 left-0 size-36 md:size-64 lg:size-96 bg-accent/20 lg:bg-accent/10 rounded-full blur-3xl' />
        </div>

        <div className='max-w-5xl mx-auto text-center'>
          <div className='inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 font-medium text-sm'>
            <Sparkles className='size-4' />
            Mengenal Riloka Lebih Dekat
          </div>

          <h1 className='text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 leading-tight font-montserrat'>
            Tentang{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent'>
              Riloka
            </span>
          </h1>

          <p className='text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed'>
            Riloka adalah platform direktori UMKM yang lahir dari semangat untuk
            mendukung dan memajukan usaha mikro, kecil, dan menengah di seluruh
            Indonesia. Kami percaya bahwa UMKM adalah tulang punggung
            perekonomian bangsa yang perlu mendapatkan sorotan lebih.
          </p>
        </div>
      </section>

      <div className='container mx-auto px-6 lg:px-12 py-12 md:py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
          <div className='text-left'>
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
          <div className='text-left md:text-right'>
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

        <div className='text-center mt-20'>
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
            className='px-8 py-4 font-medium text-white bg-primary rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl'
          >
            Jelajahi UMKM Sekarang
          </Link>
        </div>
      </div>
    </main>
  );
}
