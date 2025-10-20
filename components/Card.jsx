import Link from 'next/link';

// komponen kartu buat grid umkm
// props itu umkm/item
export default function Card({ props }) {
  return (
    <Link href={`/umkm/${props.id}`}>
      <article>
        <figure>
          <img src={props.images[0]} alt={props.name} />
        </figure>
        <figcaption>
          <h2>{props.name}</h2>
          <p className='text-muted-foreground truncate'>{props.description}</p>
        </figcaption>
      </article>
    </Link>
  );
}
