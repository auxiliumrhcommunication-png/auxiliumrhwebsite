import { stats, impactStats, type Stat } from '../data/proof';
import Reveal from './Reveal';

function StatCard({ stat, delay }: { stat: Stat; delay: number }) {
  return (
    <Reveal as="li" delay={delay} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      <p className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{stat.value}</p>
      <p className="mt-1 font-bold text-accent-400">{stat.label}</p>
      <p className="mt-3 text-sm leading-relaxed text-slate-300">{stat.detail}</p>
    </Reveal>
  );
}

/**
 * Chiffres clés sur fond bleu nuit.
 * La rangée « Impact » ne s'affiche que si de vrais chiffres sont renseignés
 * dans src/data/proof.ts (impactStats).
 */
export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-night-900 py-20 text-white sm:py-24" aria-labelledby="chiffres-title">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_400px_at_10%_100%,rgba(3,51,179,0.5),transparent_70%)]" />
      <div className="container-site relative">
        <Reveal className="mb-12 max-w-2xl">
          <p className="eyebrow text-accent-400">Auxilium RH en chiffres</p>
          <h2 id="chiffres-title" className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Une offre complète pour sécuriser et piloter vos RH
          </h2>
        </Reveal>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => <StatCard key={s.label} stat={s} delay={i * 80} />)}
        </ul>

        {impactStats.length > 0 && (
          <>
            <h3 className="mb-6 mt-14 text-xl font-bold">Notre impact</h3>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {impactStats.map((s, i) => <StatCard key={s.label} stat={s} delay={i * 80} />)}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
