export default function MapIframe({
  coordinates,
  name,
  height = 300,
  zoom = 15,
}) {
  if (!coordinates?.lat || !coordinates?.lng) {
    return <p className='text-gray-500'>Lokasi tidak tersedia</p>;
  }

  const mapSrc = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}&hl=id&z=${zoom}&output=embed`;

  return (
    <div className='rounded-xl overflow-hidden border border-gray-200 shadow-sm'>
      <iframe
        src={mapSrc}
        width='100%'
        height={height}
        style={{ border: 0 }}
        allowFullScreen
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
        title={`Lokasi ${name}`}
      ></iframe>
    </div>
  );
}
