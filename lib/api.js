export async function getUmkm() {
  try {
    const res = await fetch('/data/umkm.json');
    if (!res.ok) {
      throw new Error(`Failed to fetch UMKM data: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error loading UMKM data:', err);
    return [];
  }
}

export async function getUmkmById(id) {
  try {
    const res = await fetch('/data/umkm.json');
    if (!res.ok) {
      throw new Error(`Failed to fetch UMKM data: ${res.statusText}`);
    }
    const data = await res.json();
    return data.find((umkm) => umkm.id === id);
  } catch (err) {
    console.error('Error loading UMKM data:', err);
    return null;
  }
}

export async function getUmkmBySlug(slug) {
  try {
    const res = await fetch('/data/umkm.json');
    if (!res.ok) {
      throw new Error(`Failed to fetch UMKM data: ${res.statusText}`);
    }
    const data = await res.json();
    return data.find((umkm) => umkm.slug === slug);
  } catch (err) {
    console.error('Error loading UMKM data:', err);
    return null;
  }
}

export async function getPromo() {
  try {
    const res = await fetch('/data/promo.json');
    if (!res.ok) {
      throw new Error(`Failed to fetch promo data: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error loading promo data:', err);
    return [];
  }
}
