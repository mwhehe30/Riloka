'use client';

import { getUmkmById } from '@/lib/api';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const { id } = useParams();
  const [detailUmkm, setDetailUmkm] = useState([]);
  useEffect(() => {
    // dapetin data detail umkm
    async function detailUmkm() {
      const res = await getUmkmById(Number(id));
      setDetailUmkm(res);
      console.log(res);
    }
    detailUmkm();
  }, []);
  return <div>{detailUmkm.name}</div>;
}
