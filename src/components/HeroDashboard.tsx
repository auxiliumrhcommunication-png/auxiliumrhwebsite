import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { CheckCircle2, AlertTriangle, Clock3, ShieldCheck, Wallet, Users } from 'lucide-react';

// Aperçu interactif façon « tableau de bord » : montre à quoi ressemble la
// restitution d'un diagnostic RH. Données d'exemple, signalées comme telles.

type Status = 'ok' | 'warn' | 'todo';
type Row = { label: string; status: Status };
type Tab = { id: string; label: string; icon: typeof ShieldCheck; score: number; rows: Row[] };

const tabs: Tab[] = [
  {
    id: 'conformite',
    label: 'Conformité',
    icon: ShieldCheck,
    score: 72,
    rows: [
      { label: 'Contrats de travail (CDD, CDI)', status: 'ok' },
      { label: 'Dossiers individuels des salariés', status: 'warn' },
      { label: 'Immatriculation CNSS', status: 'ok' },
      { label: 'Déclaration DTS', status: 'todo' },
    ],
  },
  {
    id: 'paie',
    label: 'Paie',
    icon: Wallet,
    score: 85,
    rows: [
      { label: 'Bulletins de paie', status: 'ok' },
      { label: 'Gestion des absences et congés', status: 'ok' },
      { label: 'Déclarations sociales', status: 'warn' },
      { label: 'Échéances administratives', status: 'ok' },
    ],
  },
  {
    id: 'recrutement',
    label: 'Recrutement',
    icon: Users,
    score: 60,
    rows: [
      { label: 'Fiches de poste à jour', status: 'warn' },
      { label: 'Processus de sélection', status: 'ok' },
      { label: 'Parcours d\'intégration', status: 'todo' },
      { label: 'Organigramme', status: 'ok' },
    ],
  },
];

const statusMeta: Record<Status, { text: string; icon: typeof CheckCircle2; className: string }> = {
  ok: { text: 'Conforme', icon: CheckCircle2, className: 'bg-emerald-50 text-emerald-700' },
  warn: { text: 'À régulariser', icon: AlertTriangle, className: 'bg-accent-50 text-accent-700' },
  todo: { text: 'À planifier', icon: Clock3, className: 'bg-slate-100 text-slate-600' },
};

export default function HeroDashboard() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();
  const tab = tabs[active];

  // Navigation au clavier dans les onglets (flèches gauche/droite)
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (active + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="relative">
      {/* Halo décoratif */}
      <div aria-hidden="true" className="absolute -inset-6 rounded-[2rem] bg-brand-600/30 blur-3xl" />

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white text-ink shadow-widget">
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-slate-50 px-5 py-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">Exemple de diagnostic RH</p>
        </div>

        <div className="p-5 sm:p-6">
          <div role="tablist" aria-label="Domaines du diagnostic" className="mb-5 grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1">
            {tabs.map((t, i) => {
              const Icon = t.icon;
              const selected = i === active;
              return (
                <button
                  key={t.id}
                  ref={(el) => (tabRefs.current[i] = el)}
                  role="tab"
                  type="button"
                  id={`${uid}-tab-${t.id}`}
                  aria-selected={selected}
                  aria-controls={`${uid}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={onKeyDown}
                  className={`flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg px-1.5 text-[0.8rem] font-bold sm:px-2 sm:text-sm transition-colors duration-200 ${
                    selected ? 'bg-white text-brand-600 shadow-sm' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  <Icon className="hidden h-4 w-4 sm:block" aria-hidden="true" />
                  {t.label}
                </button>
              );
            })}
          </div>

          <div role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-tab-${tab.id}`}>
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-ink-muted">Niveau de conformité</p>
                <p className="text-4xl font-extrabold tracking-tight text-night-950">
                  {tab.score}
                  <span className="text-xl text-ink-subtle">/100</span>
                </p>
              </div>
              <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
                {tab.rows.filter((r) => r.status !== 'ok').length} action(s)
              </span>
            </div>

            <div className="mb-6 h-2.5 overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
              <div
                key={tab.id}
                className="h-full origin-left animate-fill-bar rounded-full bg-gradient-to-r from-brand-600 to-brand-400"
                style={{ width: `${tab.score}%` }}
              />
            </div>

            <ul className="space-y-2.5">
              {tab.rows.map((row) => {
                const meta = statusMeta[row.status];
                const StatusIcon = meta.icon;
                return (
                  <li key={row.label} className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 px-3.5 py-3">
                    <span className="text-sm font-semibold text-ink">{row.label}</span>
                    <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${meta.className}`}>
                      <StatusIcon className="h-3.5 w-3.5" aria-hidden="true" />
                      {meta.text}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
