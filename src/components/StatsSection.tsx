import { useRef } from 'react';
import { stats, impactStats, type Stat } from '../data/proof';
import { gsap, useGSAP, FULL_MOTION } from '../design/gsap';
import { countersEnabled } from '../design';
import Reveal, { RevealGroup } from './Reveal';

/** Valeur chiffrée : compte à rebours de 0 à la valeur à l'arrivée à l'écran (si --motion ≥ 4). */
function StatValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const target = /^\d+$/.test(value) ? Number(value) : null;

  useGSAP(() => {
    if (target === null || !countersEnabled) return;
    const mm = gsap.matchMedia();
    mm.add(FULL_MOTION, () => {
      const counter = { n: 0 };
      gsap.to(counter, {
        n: target,
        duration: 1.2,
        ease: 'power2.out',
        snap: { n: 1 },
        onUpdate: () => { if (ref.current) ref.current.textContent = String(counter.n); },
        scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
      });
    });
  }, { scope: ref });

  return <span ref={ref}>{value}</span>;
}

function StatCard({ stat }: { stat: Stat }) {
  return (
    <li className="rounded-2xl border border-white/10 bg-white/[0.04] p-ds-md">
      <p className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"><StatValue value={stat.value} /></p>
      <p className="mt-1 font-bold text-accent-400">{stat.label}</p>
      <p className="mt-3 text-sm leading-relaxed text-slate-300">{stat.detail}</p>
    </li>
  );
}

/**
 * Chiffres clés sur fond bleu nuit.
 * La rangée « Impact » ne s'affiche que si de vrais chiffres sont renseignés
 * dans src/data/proof.ts (impactStats).
 */
export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-night-900 py-ds-2xl text-white lg:py-ds-3xl" aria-labelledby="chiffres-title">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_400px_at_10%_100%,rgba(3,51,179,0.5),transparent_70%)]" />
      <div className="container-site relative">
        <Reveal className="mb-ds-xl max-w-2xl">
          <p className="eyebrow text-accent-400">Auxilium RH en chiffres</p>
          <h2 id="chiffres-title" className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Une offre complète pour sécuriser et piloter vos RH
          </h2>
        </Reveal>

        <RevealGroup as="ul" className="grid gap-ds-md sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => <StatCard key={s.label} stat={s} />)}
        </RevealGroup>

        {impactStats.length > 0 && (
          <>
            <h3 className="mb-6 mt-ds-2xl text-xl font-bold">Notre impact</h3>
            <RevealGroup as="ul" className="grid gap-ds-md sm:grid-cols-2 lg:grid-cols-4">
              {impactStats.map((s) => <StatCard key={s.label} stat={s} />)}
            </RevealGroup>
          </>
        )}
      </div>
    </section>
  );
}
