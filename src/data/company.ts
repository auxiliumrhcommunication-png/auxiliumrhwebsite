import type { LucideIcon } from 'lucide-react';
import {
  Store, Building2, Factory, Rocket,
  Wrench, Target, ShieldCheck, Globe2, Lock, TriangleAlert,
} from 'lucide-react';

// image : illustration décorative (public/illustrations/)
export const sectors: { icon: LucideIcon; title: string; text: string; image: string }[] = [
  {
    icon: Store,
    title: 'TPE et PME',
    image: '/illustrations/secteur-tpe.svg',
    text: 'Pour structurer la gestion du personnel, formaliser les contrats, respecter les obligations sociales et disposer de procédures RH fiables sans nécessairement créer un service interne complet.',
  },
  {
    icon: Building2,
    title: 'Grandes entreprises et groupes',
    image: '/illustrations/secteur-groupe.svg',
    text: 'Pour renforcer les dispositifs RH existants, réaliser des audits, accompagner les recrutements et améliorer le suivi administratif et réglementaire.',
  },
  {
    icon: Factory,
    title: 'Industries et entreprises de services',
    image: '/illustrations/secteur-industrie.svg',
    text: 'Pour répondre aux enjeux de gestion des effectifs, de suivi contractuel, de recrutement, d\'organisation du travail et de conformité sociale.',
  },
  {
    icon: Rocket,
    title: 'Entrepreneurs et organisations en développement',
    image: '/illustrations/secteur-entrepreneur.svg',
    text: 'Pour mettre en place les bases d\'une gestion RH structurée dès les premières étapes de croissance.',
  },
];

export const steps = [
  { title: 'Comprendre', text: 'Nous échangeons avec vous pour comprendre votre organisation, vos besoins et les difficultés rencontrées.' },
  { title: 'Diagnostiquer', text: 'Nous analysons les pratiques existantes, identifions les écarts et déterminons les priorités d\'action.' },
  { title: 'Structurer et accompagner', text: 'Nous proposons des solutions concrètes et vous accompagnons dans leur mise en œuvre.' },
  { title: 'Suivre et améliorer', text: 'Nous favorisons le suivi des actions engagées et l\'amélioration continue de vos pratiques RH.' },
];

export const reasons: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Wrench, title: 'Une expertise RH de terrain', text: 'Une approche concrète des problématiques rencontrées par les employeurs et les salariés.' },
  { icon: Target, title: 'Une approche personnalisée', text: 'Des solutions adaptées à la taille, aux moyens et aux objectifs de chaque organisation.' },
  { icon: ShieldCheck, title: 'La conformité comme priorité', text: 'Une attention particulière portée aux obligations administratives, sociales et réglementaires.' },
  { icon: Globe2, title: 'Une vision globale des RH', text: 'Du recrutement à la gestion quotidienne du personnel, en passant par la stratégie RH.' },
  { icon: Lock, title: 'Proximité et confidentialité', text: 'Un accompagnement professionnel fondé sur l\'écoute et la discrétion.' },
  { icon: TriangleAlert, title: 'Une logique de prévention', text: 'Identifier les risques et corriger les insuffisances avant qu\'ils ne deviennent des difficultés majeures.' },
];

export const commitments = [
  'Accompagner les organisations avec rigueur et professionnalisme.',
  'Promouvoir des pratiques RH structurées et conformes.',
  'Contribuer à des relations de travail plus équilibrées et responsables.',
  'Aider les entreprises à mieux gérer leur capital humain pour améliorer leur performance.',
];
