'use client';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to handle map view updates
function MapUpdater({ center, zoom, bounds }) {
  const map = useMap();

  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (center) {
      const currentZoom = map.getZoom();
      const targetZoom = zoom || 15;
      // Use the greater of current zoom or target zoom to prevent zooming out
      const finalZoom = currentZoom > targetZoom ? currentZoom : targetZoom;
      map.flyTo(center, finalZoom);
    }
  }, [center, zoom, bounds, map]);

  return null;
}

const MapLeaflet = ({
  umkmData,
  selectedUmkm,
  onSelectUmkm,
  showDetailButton = true,
}) => {
  const defaultCenter = [-7.3745, 108.532]; // Center of Banjar City
  const defaultZoom = 13;

  // Calculate bounds if showing all
  const bounds =
    !selectedUmkm && umkmData.length > 0
      ? L.latLngBounds(umkmData.map((u) => [u.latitude, u.longitude]))
      : null;

  const center = selectedUmkm
    ? [selectedUmkm.latitude, selectedUmkm.longitude]
    : defaultCenter;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const zoom = selectedUmkm ? 16 : defaultZoom;

  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      className='w-full h-full'
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      <MapUpdater
        center={center}
        zoom={zoom}
        bounds={selectedUmkm ? null : bounds}
      />

      {umkmData.map((umkm) => (
        <Marker
          key={umkm.id}
          position={[umkm.latitude, umkm.longitude]}
          eventHandlers={{
            click: () => onSelectUmkm(umkm),
          }}
        >
          <Popup className='custom-popup'>
            <div className='w-[240px] p-0 overflow-hidden'>
              {/* Image Header */}
              <div className='relative h-32 w-full bg-gray-100'>
                <img
                  src={umkm.thumb || '/images/placeholder.jpg'}
                  alt={umkm.name}
                  className='w-full h-full object-cover rounded-t-lg'
                  onError={(e) => {
                    e.target.src =
                      'https://placehold.co/400x300/e2e8f0/1e293b?text=No+Image';
                  }}
                />
              </div>

              {/* Content */}
              <div className='p-3'>
                <div className='flex justify-between items-start mb-1'>
                  <h3 className='font-bold text-gray-900 text-sm leading-tight pr-2'>
                    {umkm.name}
                  </h3>
                  <div className='flex items-center gap-1 shrink-0 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100'>
                    <span className='text-amber-500 text-[10px]'>⭐</span>
                    <span className='text-xs font-bold text-gray-800'>
                      {umkm.rating}
                    </span>
                  </div>
                </div>

                <div className='flex flex-wrap gap-1 mb-2'>
                  {umkm.category.slice(0, 2).map((cat, idx) => (
                    <span
                      key={idx}
                      className='text-[10px] px-1.5 py-0.5 bg-green-50 text-green-700 rounded-md font-medium border border-green-100'
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                <p className='text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed'>
                  {umkm.description}
                </p>

                {showDetailButton && (
                  <Link
                    href={`/umkm/${umkm.slug}`}
                    className='flex items-center justify-center w-full gap-1 bg-green-600 hover:bg-green-700 !text-white text-xs font-medium py-2 rounded-lg transition-colors no-underline'
                  >
                    Lihat Detail
                  </Link>
                )}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapLeaflet;
