<div className='bg-surface'>
  <section className='container mx-auto px-6 lg:px-12 py-16 md:py-20'>
    <div className='flex justify-center items-center flex-col gap-4'>
      <div className='text-center'>
        <div className='inline-flex items-center text-center gap-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 text-yellow-700 px-4 py-2 rounded-full mb-4 font-medium text-sm'>
          <Award className='size-4' />
          Pilihan Terbaik
        </div>
        <h2 className='text-4xl md:text-5xl font-bold text-foreground mb-3'>
          UMKM Rekomendasi
        </h2>
        <p className='text-lg text-muted-foreground'>
          Dipilih khusus untuk Anda berdasarkan kualitas dan rating tertinggi
        </p>
      </div>

      <HorizontalScroll>
        {featuredUmkm.map((item) => (
          <div key={item.id} className='flex-none w-80 md:w-96 snap-center'>
            <Card umkm={item} />
          </div>
        ))}
      </HorizontalScroll>

      <Link
        href='/umkm'
        className='flex bg-primary items-center gap-2 rounded-full px-6 py-4 shadow-lg hover:shadow-xl  text-white font-semibold hover:gap-3 transition-all group'
      >
        Lihat Semua
        <ArrowRight className='size-5 group-hover:translate-x-1 transition-transform' />
      </Link>
    </div>
  </section>
</div>;
