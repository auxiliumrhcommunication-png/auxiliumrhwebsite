/**
 * Visuel de marque du hero, en attendant une photo réelle : aplat bleu,
 * anneau ouvert repris du logo, secondaire « L'humain au centre des organisations ».
 */
export default function BrandPanel() {
  return (
    <figure className="on-dark relative flex aspect-[4/5] w-full flex-col justify-end overflow-hidden rounded-lg bg-brand-800 p-ds-lg text-white sm:aspect-[5/4] lg:aspect-[4/5]">
      <svg aria-hidden="true" viewBox="0 0 400 400" className="absolute -right-24 -top-24 w-[120%] max-w-none" fill="none">
        {/* Anneau ouvert du logo, terminé par une pointe (en haut à droite) */}
        <path d="M300 92A150 150 0 1 0 348 200" stroke="#0C37C7" strokeWidth="30" strokeLinecap="round" />
        <path d="M282 64l68 4-32 58z" fill="#0C37C7" />
        {/* Anneau intérieur, plus discret */}
        <circle cx="200" cy="200" r="92" stroke="#0A2DA3" strokeWidth="2" />
      </svg>
      <blockquote className="relative font-display text-display-md font-semibold leading-tight text-white">
        L'humain au centre des organisations.
      </blockquote>
      <figcaption className="relative mt-4 text-sm font-semibold uppercase tracking-[0.08em] text-brand-100">
        Auxilium RH · Libreville
      </figcaption>
    </figure>
  );
}
