import { reasons } from '../data/company';

/** « Pourquoi Auxilium RH » : conviction à gauche, 6 atouts en liste à filets à droite. */
export default function ReasonsSection() {
  return (
    <section className="section bg-mist" aria-labelledby="pourquoi-title">
      <div className="container-site grid gap-ds-xl lg:grid-cols-[1fr_1.5fr] lg:gap-ds-2xl">
        <div>
          <p className="eyebrow">Pourquoi Auxilium RH</p>
          <h2 id="pourquoi-title" className="title-md">L'humain au centre des organisations</h2>
          <p className="mt-ds-md max-w-prose text-lead text-ink-700">
            La performance durable d'une entreprise passe par une gestion efficace, responsable et structurée de ses ressources
            humaines.
          </p>
        </div>
        <ul className="grid gap-x-ds-lg sm:grid-cols-2">
          {reasons.map((r) => (
            <li key={r.title} className="border-t border-line py-ds-md">
              <h3 className="text-lg font-semibold text-ink">{r.title}</h3>
              <p className="mt-1 text-ink-700">{r.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
