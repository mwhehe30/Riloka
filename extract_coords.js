const fs = require('fs');
const path = require('path');

const umkmPath = path.join(__dirname, 'public', 'data', 'umkm.json');
const umkmData = JSON.parse(fs.readFileSync(umkmPath, 'utf8'));

function extractCoordinates(url) {
  // Regex to match coordinates in Google Maps Embed URL
  // Example: ...!2d108.60267127605066!3d-7.394265972800987!2m3...
  const regex = /!2d([\d.]+)!3d(-?[\d.]+)/;
  const match = url.match(regex);

  if (match) {
    return {
      longitude: parseFloat(match[1]),
      latitude: parseFloat(match[2]),
    };
  }
  return null;
}

const updatedData = umkmData.map((umkm) => {
  if (umkm.map && umkm.map.url) {
    const coords = extractCoordinates(umkm.map.url);
    if (coords) {
      return {
        ...umkm,
        latitude: coords.latitude,
        longitude: coords.longitude,
      };
    } else {
      console.warn(`Could not extract coordinates for ${umkm.name}`);
    }
  }
  return umkm;
});

fs.writeFileSync(umkmPath, JSON.stringify(updatedData, null, 2));
console.log('Successfully updated umkm.json with coordinates.');
