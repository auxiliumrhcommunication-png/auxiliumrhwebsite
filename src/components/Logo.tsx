import { Link } from 'react-router-dom';

type LogoProps = {
  /** Sur fond sombre, le logo est posé sur une pastille blanche (le « RH » est noir). */
  onDark?: boolean;
  className?: string;
};

/** Logo officiel Auxilium RH (public/logo-auxilium-rh.png, fond transparent). */
export default function Logo({ onDark = false, className = '' }: LogoProps) {
  return (
    <Link
      to="/"
      aria-label="Auxilium RH, retour à l'accueil"
      className={`inline-flex shrink-0 items-center rounded-lg ${onDark ? 'bg-white px-3 py-2' : ''} ${className}`}
    >
      <img
        src="/logo-auxilium-rh.png"
        srcSet="/logo-auxilium-rh.png 1x, /logo-auxilium-rh@2x.png 2x"
        width={278}
        height={112}
        alt="Auxilium RH"
        className="h-10 w-auto sm:h-11"
      />
    </Link>
  );
}
