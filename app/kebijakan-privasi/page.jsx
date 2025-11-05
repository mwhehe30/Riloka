const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">
        Kebijakan Privasi
      </h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 mb-6">
          Kebijakan privasi ini menjelaskan bagaimana Riloka mengumpulkan,
          menggunakan, dan melindungi informasi pribadi Anda saat menggunakan
          layanan kami. Kami berkomitmen untuk menjaga privasi dan keamanan
          data Anda.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Informasi yang Kami Kumpulkan</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Informasi akun yang Anda berikan saat mendaftar</li>
            <li>Informasi penggunaan layanan dan preferensi Anda</li>
            <li>Data perangkat dan informasi teknis yang relevan</li>
            <li>Informasi lokasi untuk membantu penelusuran UMKM terdekat</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Penggunaan Informasi</h2>
          <p className="text-gray-700 mb-4">
            Kami menggunakan informasi Anda untuk:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Menyediakan dan meningkatkan layanan kami</li>
            <li>Menyesuaikan pengalaman pengguna Anda</li>
            <li>Menghubungi Anda tentang akun atau layanan kami</li>
            <li>Menganalisis penggunaan layanan untuk perbaikan</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Perlindungan Data</h2>
          <p className="text-gray-700 mb-4">
            Kami menerapkan berbagai langkah keamanan untuk melindungi informasi
            Anda dari akses, perubahan, pengungkapan, atau penghancuran yang tidak sah.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Kebijakan Cookie</h2>
          <p className="text-gray-700 mb-4">
            Kami menggunakan cookie untuk meningkatkan pengalaman pengguna dan
            menganalisis lalu lintas website. Anda dapat memilih untuk menerima
            atau menolak cookie tersebut.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Perubahan Kebijakan</h2>
          <p className="text-gray-700 mb-4">
            Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu.
            Perubahan akan diumumkan di website kami dan tanggal diperbarui
            akan ditampilkan di atas.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Hubungi Kami</h2>
          <p className="text-gray-700">
            Jika Anda memiliki pertanyaan tentang kebijakan privasi ini,
            silakan hubungi kami melalui informasi kontak yang tersedia
            di halaman "Tentang" atau melalui email resmi kami.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;