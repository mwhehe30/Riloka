# Penjelasan Konsep Website Riloka

Berikut adalah penjelasan mengenai konsep website Riloka yang mencakup latar belakang, tujuan, sitemap, wireframe, dan fitur utama.

## 1. Konsep Singkat Website

*   **Latar Belakang Ide:** Usaha Mikro, Kecil, dan Menengah (UMKM) merupakan pilar penting dalam perekonomian Indonesia. Namun, banyak UMKM yang masih menghadapi tantangan dalam hal visibilitas dan pemasaran digital. Di sisi lain, konsumen seringkali kesulitan untuk menemukan produk atau jasa UMKM yang berkualitas dan terpercaya di sekitar mereka.

*   **Tujuan:** Riloka hadir sebagai platform direktori yang bertujuan untuk menghubungkan UMKM dengan calon konsumen secara lebih mudah dan efektif. Website ini diharapkan dapat menjadi jembatan digital bagi UMKM untuk memperluas jangkauan pasar mereka dan meningkatkan penjualan.

*   **Masalah yang Ingin Diselesaikan:**
    *   Meningkatkan visibilitas online bagi UMKM yang belum terdigitalisasi.
    *   Menyediakan pusat informasi yang terstruktur dan terpercaya bagi konsumen untuk menemukan UMKM lokal.
    *   Mendorong pertumbuhan ekonomi lokal dengan mempromosikan produk dan jasa dari UMKM.

## 2. Sitemap (Peta Situs)

Struktur halaman website Riloka dirancang agar sederhana dan mudah dinavigasi oleh pengguna.

```
- / (Halaman Utama)
  - /umkm (Halaman Daftar UMKM)
    - /umkm/[slug] (Halaman Detail untuk setiap UMKM)
  - /tentang (Halaman Tentang Riloka)
```

*   **Halaman Utama (`/`):** Berisi pengenalan singkat, fitur pencarian utama, dan menampilkan beberapa UMKM unggulan atau promosi terkini.
*   **Halaman Daftar UMKM (`/umkm`):** Menampilkan semua UMKM yang terdaftar dalam format daftar atau kartu, dilengkapi dengan fitur filter dan pencarian.
*   **Halaman Detail UMKM (`/umkm/[slug]`):** Halaman spesifik untuk satu UMKM, berisi semua informasi detail.
*   **Halaman Tentang (`/tentang`):** Menjelaskan visi, misi, dan informasi mengenai platform Riloka.

## 3. Wireframe Tampilan Utama

Berikut adalah mockup sederhana dalam bentuk teks yang menggambarkan tata letak halaman utama.

```
+------------------------------------------------------+
| NavBar (Logo, Beranda, UMKM, Tentang)       [Cari...] |
+------------------------------------------------------+
|                                                      |
|                  [ Hero Image/Banner ]               |
|         "Jelajahi dan Dukung UMKM Lokal"             |
|                                                      |
+------------------------------------------------------+
|                                                      |
|                [ UMKM Unggulan ]                     |
|                                                      |
|      +-------------+  +-------------+  +-------------+  |
|      | [Gambar]    |  | [Gambar]    |  | [Gambar]    |  |
|      | Nama UMKM 1 |  | Nama UMKM 2 |  | Nama UMKM 3 |  |
|      | Kategori    |  | Kategori    |  | Kategori    |  |
|      +-------------+  +-------------+  +-------------+  |
|                                                      |
+------------------------------------------------------+
|                                                      |
|                  [ Promosi Terbaru ]                 |
|                                                      |
|      +------------------+  +------------------+      |
|      | [Promo 1]        |  | [Promo 2]        |      |
|      +------------------+  +------------------+      |
|                                                      |
+------------------------------------------------------+
|                                                      |
|                      [ Footer ]                      |
|                                                      |
+------------------------------------------------------+
```

## 4. Penjelasan Fitur Utama

Fitur-fitur utama yang direncanakan untuk dikembangkan pada website Riloka adalah:

*   **Pencarian Cerdas:** Pengguna dapat mencari UMKM berdasarkan nama, kategori produk/jasa (misal: kuliner, fashion, kerajinan), atau lokasi (kota/kabupaten).
*   **Direktori UMKM dengan Filter:** Halaman daftar UMKM yang memungkinkan pengguna untuk memfilter berdasarkan kategori, rating, atau jarak terdekat (fitur masa depan).
*   **Halaman Profil UMKM yang Komprehensif:** Setiap UMKM akan memiliki halaman profil sendiri yang menampilkan:
    *   Deskripsi lengkap usaha.
    *   Galeri foto produk atau tempat usaha.
    *   Daftar produk/jasa beserta harganya.
    *   Alamat, titik lokasi di peta, dan jam operasional.
    *   Informasi kontak (nomor telepon, media sosial).
*   **Sistem Ulasan dan Rating:** Pengguna yang telah bertransaksi dapat memberikan rating (bintang 1-5) dan menulis ulasan untuk membantu UMKM mendapatkan kepercayaan dan sebagai masukan untuk perbaikan.
*   **Fitur Promosi:** Memberikan ruang bagi UMKM untuk membuat dan menampilkan promosi, diskon, atau acara khusus untuk menarik pelanggan.
