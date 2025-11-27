'use client';

import {
  ClipboardCheck,
  Clock,
  GraduationCap,
  Mail,
  Megaphone,
  Phone,
  ShieldCheck,
  Store,
  TrendingUp,
  Users,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const RegistrationModal = ({ isOpen, onClose }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  const steps = [
    {
      icon: ClipboardCheck,
      title: 'Isi Formulir Pendaftaran',
      desc: 'Lengkapi formulir pendaftaran online dengan data usaha Anda yang valid dan terbaru.',
    },
    {
      icon: ShieldCheck,
      title: 'Verifikasi Data',
      desc: 'Tim kami akan memverifikasi data usaha Anda dalam waktu 1-2 hari kerja.',
    },
    {
      icon: GraduationCap,
      title: 'Pelatihan Singkat',
      desc: 'Ikuti sesi orientasi dan pelatihan singkat untuk memaksimalkan manfaat platform.',
    },
    {
      icon: Store,
      title: 'Aktif di Platform',
      desc: 'Usaha Anda akan terdaftar dan dapat diakses oleh ribuan pengguna platform Banjar UMKM.',
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Peningkatan Penjualan',
      desc: 'Akses ke ribuan calon pelanggan di platform Banjar UMKM.',
    },
    {
      icon: Users,
      title: 'Jaringan yang Luas',
      desc: 'Terhubung dengan pelaku UMKM lainnya dan mitra strategis.',
    },
    {
      icon: GraduationCap,
      title: 'Pelatihan Berkala',
      desc: 'Akses ke berbagai pelatihan untuk meningkatkan kapasitas usaha.',
    },
    {
      icon: Megaphone,
      title: 'Promosi Gratis',
      desc: 'Manfaatkan berbagai program promosi yang disediakan platform.',
    },
  ];

  return createPortal(
    <div className='fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6'>
      <div
        className='absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity'
        onClick={onClose}
      />
      <div className='relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50'>
          <div>
            <h2 className='text-2xl font-bold text-primary-dark'>
              Daftarkan UMKM Anda
            </h2>
            <p className='text-gray-600 text-sm mt-1'>
              Bergabunglah dengan platform Banjar UMKM dalam 4 langkah mudah
            </p>
          </div>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700'
          >
            <X className='size-6' />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className='overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-primary scrollbar-track-white'>
          {/* Steps Section */}
          <section>
            <h3 className='text-lg font-bold text-primary-dark mb-4 flex items-center gap-2'>
              <span className='flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs'>
                1
              </span>
              Langkah Pendaftaran
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className='bg-gray-50 p-4 rounded-xl border border-gray-100 relative group hover:border-primary/20 transition-colors'
                >
                  <div className='absolute -top-3 -left-3 w-8 h-8 bg-white rounded-full border border-gray-100 flex items-center justify-center font-bold text-primary shadow-sm group-hover:scale-110 transition-transform'>
                    {idx + 1}
                  </div>
                  <div className='mb-3 mt-2 text-primary'>
                    <step.icon className='size-6' />
                  </div>
                  <h4 className='font-bold text-gray-900 mb-2 text-sm'>
                    {step.title}
                  </h4>
                  <p className='text-xs text-gray-600 leading-relaxed'>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Benefits Section */}
          <section>
            <h3 className='text-lg font-bold text-primary-dark mb-4 flex items-center gap-2'>
              <span className='flex items-center justify-center w-6 h-6 rounded-full bg-secondary/10 text-secondary text-xs'>
                2
              </span>
              Manfaat Bergabung
            </h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className='flex gap-4 p-4 rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 hover:shadow-md transition-shadow'
                >
                  <div className='shrink-0 p-3 bg-secondary/10 rounded-lg h-fit'>
                    <benefit.icon className='size-5 text-secondary' />
                  </div>
                  <div>
                    <h4 className='font-bold text-gray-900 mb-1'>
                      {benefit.title}
                    </h4>
                    <p className='text-sm text-gray-600 leading-relaxed'>
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section className='bg-primary/5 rounded-xl p-6 border border-primary/10'>
            <h3 className='text-lg font-bold text-primary-dark mb-4'>
              Butuh bantuan? Hubungi tim kami:
            </h3>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
              <div className='flex items-center gap-3'>
                <div className='p-2 bg-white rounded-full shadow-sm text-primary'>
                  <Phone className='size-5' />
                </div>
                <div>
                  <div className='text-xs text-gray-500 font-medium'>
                    Telepon
                  </div>
                  <div className='font-semibold text-gray-900'>
                    (0265) 741234
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <div className='p-2 bg-white rounded-full shadow-sm text-primary'>
                  <Mail className='size-5' />
                </div>
                <div>
                  <div className='text-xs text-gray-500 font-medium'>Email</div>
                  <div className='font-semibold text-gray-900'>
                    halo@riloka.id
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <div className='p-2 bg-white rounded-full shadow-sm text-primary'>
                  <Clock className='size-5' />
                </div>
                <div>
                  <div className='text-xs text-gray-500 font-medium'>
                    Jam Operasional
                  </div>
                  <div className='font-semibold text-gray-900'>
                    Senin-Jumat, 09:00-17:00
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Actions */}
        <div className='p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3'>
          <button
            onClick={onClose}
            className='px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors'
          >
            Tutup
          </button>
          <button
            onClick={() => {
              // Handle registration action
              onClose();
            }}
            className='px-6 py-2.5 rounded-full bg-primary text-white font-medium hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20'
          >
            Daftar Sekarang
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default RegistrationModal;
