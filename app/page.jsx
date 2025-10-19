import NavBar from '@/components/NavBar';
import { Search, Sparkles } from 'lucide-react';


const kategori = [
  { name: "makanan", href: ""},
  { name: "minuman", href: ""},
  { name: "fashion", href: ""},
  { name: "kerajinan", href: ""},
  { name: "jasa", href: ""},
  { name: "Pertanian", href: ""},
]
const unggulan = [
  { 
    foto: "",
    nama: "Ratan Bakery",
    kategori: "makanan",
    Lokasi: "Cijurey",
  },
]


export default function Page() {
  return (
    <main className='min-h-screen'>
      <NavBar />
      <section className='relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center justify-center'>
        <div className='absolute inset-0 -z-10'>
          <div className='absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl' />
          <div className='absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl' />
        </div>

        <div className='max-w-5xl mx-auto text-center'>
          <div className='inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 font-medium text-sm'>
            <Sparkles className='w-4 h-4' />
            Temukan UMKM di Sekitar Anda
          </div>

          <h1 className='text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 leading-tight'>
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent'>
              Riloka
            </span>{' '}
            — Jelajahi Dunia UMKM Lokal
          </h1>

          <p className='text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed'>
            Platform pencarian UMKM yang memudahkan Anda menemukan produk, jasa,
            dan pelaku usaha lokal terbaik di seluruh Indonesia. Dukung bisnis
            kecil, gerakkan ekonomi besar.
          </p>

          <div className='relative max-w-2xl mx-auto mb-12'>
            <div className='absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-2xl' />
            <div className='relative flex items-center gap-3 bg-card border border-muted-foreground rounded-2xl px-6 py-4 shadow-lg hover:shadow-xl transition-shadow'>
              <Search className='w-5 h-5 text-muted-foreground flex-shrink-0' />
              <input
                type='text'
                placeholder='Cari UMKM, produk, atau jasa lokal...'
                className='w-full border-0 bg-transparent outline-0 ring-0 text-base placeholder:text-muted-foreground'
              />
            </div>
          </div>

          <p className='text-sm text-muted-foreground'>
            <em>Riloka — dari lokal, untuk semua.</em>
          </p>
        </div>
      </section>
        {/* Kategori, kalo dipencet ngarah ke filter umkm */}
        <section className='text-center py-12'>
          <h2 className='text-2xl font-bold mb-20'>Cari kebutuhan mu disini</h2>
          <div className='container mx-auto p-4'>
            <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4  mt-4'>
              {kategori.map((kat, index)=> {
                return (
                  <li key={index}>
                    <a href={kat.href} className="relative inline-block bg-gradient-to-r from-primary/20 to-accent/20 p-[2px] rounded-full hover:from-primary/80 hover:to-accent/80 hover:text-white transition duration-300 ease-in-out">
                      <span className='capitalize text-lg block rounded-full bg-white text-primary font-medium px-6 py-3 hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:text-white transition duration-300'>{kat.name}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
        {/* nanti disini ada umkm unggulan abistu langsung footer dan langsung pindah kerjain hal selanjutnya aja */}
    </main>
  );
}
