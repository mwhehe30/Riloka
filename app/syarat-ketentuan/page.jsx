import React from 'react';

const TermsAndConditionsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">
        Syarat dan Ketentuan
      </h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 mb-6">
          Selamat datang di Riloka! Dengan mengakses dan menggunakan layanan 
          kami, Anda menyetujui untuk terikat oleh syarat dan ketentuan berikut. 
          Silakan baca dengan seksama sebelum menggunakan layanan kami.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Persetujuan Penggunaan</h2>
          <p className="text-gray-700 mb-4">
            Dengan menggunakan layanan kami, Anda menyatakan bahwa:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Anda berusia minimal 18 tahun atau memiliki izin hukum untuk menggunakan layanan ini</li>
            <li>Informasi yang Anda berikan adalah benar dan akurat</li>
            <li>Anda akan menggunakan layanan kami secara bertanggung jawab</li>
            <li>Anda setuju untuk tidak melakukan tindakan yang merugikan pengguna lain</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Layanan Kami</h2>
          <p className="text-gray-700 mb-4">
            Riloka menyediakan platform untuk:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Mencari dan menemukan UMKM lokal di sekitar Anda</li>
            <li>Memberikan informasi dan ulasan tentang UMKM</li>
            <li>Menyediakan informasi produk dan layanan dari UMKM</li>
            <li>Membantu membangun komunitas antara pelanggan dan UMKM</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Hak dan Kewajiban Pengguna</h2>
          <h3 className="text-xl font-medium mb-2 text-gray-700">Hak Pengguna:</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>Mengakses informasi UMKM secara gratis</li>
            <li>Memberikan ulasan dan penilaian secara objektif</li>
            <li>Melaporkan konten yang tidak pantas atau tidak akurat</li>
            <li>Mengelola informasi akun pribadi Anda</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-2 text-gray-700">Kewajiban Pengguna:</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Memberikan informasi yang akurat dan terbaru</li>
            <li>Menggunakan layanan dengan itikad baik dan tidak menipu</li>
            <li>Menghormati hak dan reputasi UMKM serta pengguna lain</li>
            <li>Tidak menyebarkan informasi yang menyesatkan atau mencemarkan nama baik</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Konten Pengguna</h2>
          <p className="text-gray-700 mb-4">
            Anda bertanggung jawab atas semua konten yang Anda kirimkan, 
            termasuk ulasan, komentar, dan informasi lainnya. Anda setuju bahwa:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Konten tidak melanggar hak kekayaan intelektual pihak ketiga</li>
            <li>Konten tidak mengandung informasi yang menyesatkan atau tidak akurat</li>
            <li>Konten tidak mengandung konten yang tidak senonoh, menghina, atau menakutkan</li>
            <li>Kami berhak menghapus konten yang melanggar ketentuan ini</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Pembatasan Tanggung Jawab</h2>
          <p className="text-gray-700 mb-4">
            Riloka tidak bertanggung jawab atas:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Keakuratan informasi yang disediakan oleh UMKM atau pengguna</li>
            <li>Kualitas atau ketersediaan produk dan layanan UMKM</li>
            <li>Kerugian yang timbul akibat penggunaan layanan kami</li>
            <li>Transaksi langsung antara pengguna dan UMKM</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Perubahan Syarat dan Ketentuan</h2>
          <p className="text-gray-700 mb-4">
            Kami dapat memperbarui syarat dan ketentuan ini kapan saja. 
            Perubahan akan diumumkan di website kami dan tanggal diperbarui 
            akan ditampilkan di atas. Penggunaan layanan setelah perubahan 
            berarti Anda menerima syarat dan ketentuan yang baru.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Penyelesaian Sengketa</h2>
          <p className="text-gray-700">
            Setiap sengketa yang timbul dari penggunaan layanan ini akan 
            diselesaikan secara musyawarah untuk mufakat. Jika tidak tercapai 
            kesepakatan, sengketa akan diselesaikan melalui pengadilan yang 
            berwenang di wilayah hukum Indonesia.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;