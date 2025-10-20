import NavBar from '@/components/NavBar';
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
        {children}
      </body>
    </html>
  );
}
