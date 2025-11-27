'use client';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import { useEffect } from 'react';
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
      map.flyTo(center, zoom || 15);
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
          <Popup>
            <div className='text-center'>
              <h3 className='font-bold text-sm mb-1'>{umkm.name}</h3>
              <p className='text-xs text-gray-600 mb-2'>
                {umkm.category.join(', ')}
              </p>
              {showDetailButton && (
                <Link
                  href={`/umkm/${umkm.slug}`}
                  className='text-xs bg-green-600 text-white! px-2 py-1 rounded hover:bg-green-700 inline-block no-underline'
                >
                  Lihat Detail
                </Link>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapLeaflet;
