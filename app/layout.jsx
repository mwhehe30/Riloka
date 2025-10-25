import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});
const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});
export const metadata = {
  title: 'Riloka',
  description: 'Website untuk memudahkan pencarian UMKM',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} ${montserrat.variable} antialiased`}>
        <NavBar />
        <main className="pt-20 pb-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
