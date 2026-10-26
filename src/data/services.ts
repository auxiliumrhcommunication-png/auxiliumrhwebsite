import type { LucideIcon } from 'lucide-react';
import { BriefcaseBusiness, ShieldCheck, Wallet, Network, Scale, Handshake } from 'lucide-react';

export type Service = {
  id: string;
  icon: LucideIcon;
  title: string;
  /** Libellé court (accès rapide, menus) */
  navLabel: string;
  short: string;
  intro: string;
  items: string[];
};

// Les 6 domaines d'expertise (présentation institutionnelle Auxilium RH)
export const services: Service[] = [
  {
    id: 'recrutement',
    navLabel: 'Recrutement',
    icon: BriefcaseBusiness,
    title: 'Recrutement et mobilité professionnelle',
    short: 'Identification, évaluation et sélection des talents adaptés à vos besoins, jusqu\'à leur intégration.',
    intro: 'Nous accompagnons les entreprises dans l\'identification, l\'évaluation et la sélection de talents adaptés à leurs besoins.',
    items: [
      'Définition du besoin et du profil recherché.',
      'Sourcing et présélection des candidatures.',
      'Évaluation des compétences et des aptitudes.',
      'Organisation des tests et entretiens finaux.',
      'Accompagnement à la mobilité professionnelle et à l\'intégration.',
    ],
  },
  {
    id: 'audit',
    navLabel: 'Audit et conformité',
    icon: ShieldCheck,
    title: 'Audit, diagnostic et conformité RH',
    short: 'Analyse de vos pratiques pour identifier les risques, les écarts réglementaires et les axes d\'amélioration.',
    intro: 'Nous analysons les pratiques existantes afin d\'identifier les insuffisances, les risques et les axes d\'amélioration de votre gestion des ressources humaines.',
    items: [
      'Diagnostic et audit des pratiques RH.',
      'Vérification des dossiers individuels des salariés.',
      'Contrôle des contrats et documents administratifs.',
      'Identification des écarts réglementaires.',
      'Accompagnement à la régularisation des situations.',
      'Mise en place de procédures RH adaptées.',
    ],
  },
  {
    id: 'paie',
    navLabel: 'Administration et paie',
    icon: Wallet,
    title: 'Administration du personnel et gestion de la paie',
    short: 'Contrats, dossiers salariés, paie, CNSS et déclarations sociales : des processus fiables et suivis.',
    intro: 'Nous aidons les entreprises à fiabiliser leurs processus administratifs et à assurer un suivi rigoureux de leurs obligations sociales.',
    items: [
      'Rédaction et suivi des contrats : CDD, CDI, stages et contrats adaptés aux situations concernées.',
      'Constitution et actualisation des dossiers salariés.',
      'Gestion des absences, congés et mouvements du personnel.',
      'Préparation et gestion de la paie.',
      'Accompagnement dans les démarches d\'immatriculation auprès de la CNSS.',
      'Préparation et suivi des déclarations sociales, notamment la DTS.',
      'Suivi des documents et échéances administratives.',
    ],
  },
  {
    id: 'strategie',
    navLabel: 'Stratégie RH',
    icon: Network,
    title: 'Conseil en organisation et stratégie RH',
    short: 'Stratégie RH, fiches de poste, organigrammes, procédures internes et tableaux de bord.',
    intro: 'Nous accompagnons les dirigeants dans la structuration de leur fonction RH et l\'amélioration de leur organisation interne.',
    items: [
      'Définition de la stratégie RH.',
      'Élaboration des fiches de poste et des organigrammes.',
      'Clarification des responsabilités et des processus.',
      'Mise en place de procédures internes.',
      'Gestion des compétences et des parcours professionnels.',
      'Accompagnement au changement organisationnel.',
      'Élaboration d\'indicateurs et de tableaux de bord RH.',
    ],
  },
  {
    id: 'droit',
    navLabel: 'Droit du travail',
    icon: Scale,
    title: 'Conseil en droit du travail et conformité sociale',
    short: 'Comprendre et appliquer les règles encadrant les relations professionnelles au Gabon.',
    intro: 'Nous accompagnons les employeurs dans la compréhension et l\'application des règles encadrant les relations professionnelles au Gabon.',
    items: [
      'Information sur les obligations de l\'employeur.',
      'Accompagnement à la conformité des contrats et pratiques RH.',
      'Prévention des risques liés aux relations de travail.',
      'Suivi des obligations sociales et réglementaires.',
      'Accompagnement dans la gestion documentaire et les procédures internes.',
      'Sensibilisation aux droits et obligations des employeurs et des salariés.',
    ],
  },
  {
    id: 'externalisation',
    navLabel: 'Externalisation',
    icon: Handshake,
    title: 'Externalisation des fonctions RH',
    short: 'Une prise en charge de vos missions RH, ponctuelle ou régulière, adaptée à vos ressources.',
    intro: 'Pour les structures qui ne disposent pas d\'un service RH suffisamment développé, nous proposons un accompagnement adapté à leurs besoins et à leurs ressources.',
    items: [
      'Prise en charge de missions RH définies avec le client.',
      'Assistance dans la gestion administrative du personnel.',
      'Appui à la gestion de la paie et des déclarations sociales.',
      'Suivi des échéances et des dossiers RH.',
      'Mise en place d\'outils de suivi et de reporting.',
      'Accompagnement ponctuel ou régulier selon les besoins.',
    ],
  },
];
