import photos from '../data/photos.json';

export type ImageSlot = 'equipe' | 'recrutement' | 'conformite' | 'paie';

type Photo = { avif: string; webp: string; fallback: string; width: number; height: number };
const manifest = photos as Partial<Record<ImageSlot, Photo>>;

/** Vrai si une photo réelle a été fournie pour cet emplacement (npm run images). */
export const hasPhoto = (slot: ImageSlot) => Boolean(manifest[slot]);

type SlotImageProps = {
  slot: ImageSlot;
  alt: string;
  className?: string;
  /** Image visible au chargement (pas de chargement différé) */
  priority?: boolean;
  sizes?: string;
};

/**
 * Affiche la photo de l'emplacement si elle existe (générée par `npm run images`
 * dans public/photos/), sinon l'illustration vectorielle correspondante.
 */
export default function SlotImage({ slot, alt, className = '', priority = false, sizes = '(min-width: 1024px) 560px, 100vw' }: SlotImageProps) {
  const photo = manifest[slot];
  const loading = priority ? 'eager' : 'lazy';

  if (photo) {
    return (
      <picture>
        <source type="image/avif" srcSet={photo.avif} sizes={sizes} />
        <source type="image/webp" srcSet={photo.webp} sizes={sizes} />
        <img
          src={photo.fallback}
          width={photo.width}
          height={photo.height}
          alt={alt}
          loading={loading}
          decoding="async"
          className={`h-auto w-full rounded-3xl object-cover ${className}`}
        />
      </picture>
    );
  }

  return (
    <img
      src={`/illustrations/${slot}.svg`}
      width={600}
      height={480}
      alt={alt}
      loading={loading}
      decoding="async"
      className={`h-auto w-full ${className}`}
    />
  );
}
