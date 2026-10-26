import type { BlogPost } from './blog';

// BROUILLONS : visibles uniquement avec `npm run dev`, jamais publiés ni listés dans le plan du site.
// Avant publication : faire relire, traiter la liste `verify`, fixer la date, puis déplacer
// l'article dans src/data/articles.ts.
//
// Règle de rédaction : décrire des démarches et des bonnes pratiques ; ne citer aucun article de loi,
// taux, délai ou montant sans source vérifiée.

export const drafts: BlogPost[] = [
  {
    slug: 'dossier-individuel-du-salarie',
    title: 'Le dossier individuel du salarié : pourquoi et comment le tenir à jour',
    excerpt:
      'Contrats, avenants, pièces administratives, éléments de paie : un dossier salarié complet facilite la gestion quotidienne et sécurise l\'employeur.',
    date: '2026-10-26',
    category: 'Conformité',
    cover: '/illustrations/conformite.svg',
    author: 'Auxilium RH',
    services: ['audit-conformite', 'paie-administration'],
    verify: [
      'Liste des documents légalement obligatoires dans le dossier du salarié au Gabon.',
      'Durées de conservation applicables aux documents du personnel.',
    ],
    content: [
      { type: 'p', text: 'Le dossier individuel rassemble l\'ensemble des documents qui retracent la relation de travail entre l\'employeur et chaque salarié. Lorsqu\'il est incomplet ou dispersé, les difficultés apparaissent au moment où l\'on en a le plus besoin : contrôle, litige, départ d\'un collaborateur ou changement de responsable RH.' },
      { type: 'h2', text: 'Pourquoi un dossier à jour est essentiel' },
      { type: 'list', items: [
        'Il permet de retrouver rapidement l\'historique d\'un salarié : embauche, évolutions de poste, rémunération, absences.',
        'Il assure la continuité lorsque la gestion du personnel change de main.',
        'Il facilite la préparation de la paie et des déclarations sociales.',
        'Il constitue une base solide en cas de contrôle ou de désaccord.',
      ] },
      { type: 'h2', text: 'Ce que l\'on y trouve généralement' },
      { type: 'p', text: 'La liste exacte dépend des obligations applicables et des pratiques de l\'organisation. À titre indicatif, un dossier comprend souvent :' },
      { type: 'list', items: [
        'les pièces d\'identité et les coordonnées du salarié ;',
        'le contrat de travail et ses avenants ;',
        'la fiche de poste et les éventuels changements de fonction ;',
        'les justificatifs de qualification utiles au poste ;',
        'les documents liés à l\'immatriculation et à la couverture sociale ;',
        'les éléments de rémunération, les congés et les absences ;',
        'les comptes rendus d\'entretiens et d\'évaluations.',
      ] },
      { type: 'h2', text: 'Organiser la tenue du dossier' },
      { type: 'list', items: [
        'Utiliser une liste de contrôle identique pour tous les salariés.',
        'Mettre à jour le dossier à chaque événement : avenant, promotion, changement d\'adresse, absence longue.',
        'Limiter l\'accès aux seules personnes habilitées : ces documents sont confidentiels.',
        'Vérifier périodiquement que chaque dossier est complet.',
      ] },
      { type: 'p', text: 'Un audit des dossiers du personnel permet d\'identifier rapidement les pièces manquantes et de prioriser les régularisations.' },
    ],
  },
  {
    slug: 'recruter-definir-le-besoin',
    title: 'Recruter : bien définir le besoin avant de publier une offre',
    excerpt:
      'La qualité d\'un recrutement se joue souvent avant la première candidature : analyse du besoin, fiche de poste, critères d\'évaluation.',
    date: '2026-10-26',
    category: 'Recrutement',
    cover: '/illustrations/recrutement.svg',
    author: 'Auxilium RH',
    services: ['recrutement', 'strategie-rh'],
    verify: ['Mentions éventuellement obligatoires dans une offre d\'emploi au Gabon.'],
    content: [
      { type: 'p', text: 'Face à un départ ou à une surcharge d\'activité, la tentation est grande de publier rapidement une offre. Pourtant, un besoin mal défini conduit souvent à des candidatures inadaptées, à des entretiens peu concluants et parfois à un recrutement à refaire.' },
      { type: 'h2', text: 'Analyser le besoin réel' },
      { type: 'list', items: [
        'S\'agit-il d\'un remplacement à l\'identique, d\'une création de poste ou d\'une réorganisation ?',
        'Une mobilité interne est-elle possible ?',
        'Quelles missions doivent être assurées, et avec quel niveau d\'autonomie ?',
      ] },
      { type: 'h2', text: 'Formaliser la fiche de poste' },
      { type: 'p', text: 'La fiche de poste décrit les missions, les responsabilités, le rattachement hiérarchique, les compétences attendues et les conditions d\'exercice. Elle sert de référence pendant tout le processus, puis lors de l\'intégration et des évaluations.' },
      { type: 'h2', text: 'Distinguer l\'indispensable du souhaitable' },
      { type: 'p', text: 'Classer les critères permet d\'éviter de rechercher un profil introuvable. Les exigences indispensables doivent rester peu nombreuses et directement liées aux missions.' },
      { type: 'h2', text: 'Préparer l\'évaluation et l\'intégration' },
      { type: 'list', items: [
        'Définir à l\'avance les critères d\'évaluation et les étapes (présélection, tests, entretiens).',
        'Choisir les canaux de diffusion adaptés au profil recherché.',
        'Prévoir l\'accueil et les premières semaines du futur collaborateur.',
      ] },
    ],
  },
  {
    slug: 'audit-rh-questions-pour-faire-le-point',
    title: 'Audit RH : les questions à se poser pour faire le point',
    excerpt:
      'Contrats, dossiers, paie, organisation : quelques questions simples pour repérer les écarts et fixer des priorités d\'action.',
    date: '2026-10-26',
    category: 'Stratégie RH',
    cover: '/illustrations/conformite.svg',
    author: 'Auxilium RH',
    services: ['audit-conformite', 'strategie-rh'],
    verify: [],
    content: [
      { type: 'p', text: 'Un audit RH n\'a pas pour objet de juger l\'organisation, mais d\'obtenir une vision claire de ses pratiques afin de corriger les insuffisances avant qu\'elles ne deviennent des difficultés. Ces questions permettent d\'amorcer la démarche.' },
      { type: 'h2', text: 'Contrats et dossiers du personnel' },
      { type: 'list', items: [
        'Chaque salarié dispose-t-il d\'un contrat écrit, signé et à jour ?',
        'Les avenants reflètent-ils les changements de poste ou de rémunération ?',
        'Les dossiers individuels sont-ils complets et rangés de la même façon ?',
      ] },
      { type: 'h2', text: 'Paie et obligations sociales' },
      { type: 'list', items: [
        'Les éléments variables (absences, heures, primes) sont-ils transmis à temps et contrôlés ?',
        'Les déclarations sociales suivent-elles un calendrier connu de tous ?',
        'Les justificatifs sont-ils archivés et faciles à retrouver ?',
      ] },
      { type: 'h2', text: 'Organisation et pilotage' },
      { type: 'list', items: [
        'Les fiches de poste et l\'organigramme existent-ils et sont-ils à jour ?',
        'Les procédures internes (congés, absences, recrutement) sont-elles écrites et partagées ?',
        'Disposez-vous de quelques indicateurs simples sur vos effectifs ?',
      ] },
      { type: 'h2', text: 'Passer du constat au plan d\'action' },
      { type: 'p', text: 'Les réponses font apparaître des écarts de nature et d\'urgence différentes. L\'étape suivante consiste à les classer : ce qui expose l\'organisation à un risque, ce qui pèse sur le fonctionnement quotidien, et ce qui relève de l\'amélioration continue.' },
    ],
  },
  {
    slug: 'cnss-declarations-sociales-organiser-le-suivi',
    title: 'CNSS et déclarations sociales : organiser un suivi rigoureux',
    excerpt:
      'Échéances, contrôles, justificatifs : une organisation simple pour tenir les obligations sociales sans urgence de dernière minute.',
    date: '2026-10-26',
    category: 'Paie',
    cover: '/illustrations/paie.svg',
    author: 'Auxilium RH',
    services: ['paie-administration', 'externalisation'],
    verify: [
      'Échéances, taux et modalités de déclaration en vigueur auprès de la CNSS.',
      'Périodicité et contenu exacts de la DTS et des autres déclarations sociales.',
      'Démarches d\'immatriculation des nouveaux salariés et de déclaration des départs.',
    ],
    content: [
      { type: 'p', text: 'Les obligations sociales reviennent à intervalles réguliers et reposent sur des informations issues de la paie et de la gestion du personnel. Sans organisation claire, elles se préparent dans l\'urgence, avec un risque d\'erreur ou de retard.' },
      { type: 'h2', text: 'Établir un calendrier partagé' },
      { type: 'p', text: 'Recensez l\'ensemble des déclarations et paiements qui concernent votre organisation, avec leurs échéances, et inscrivez-les dans un calendrier connu des personnes concernées. Prévoyez une date de préparation interne en amont de chaque échéance.' },
      { type: 'h2', text: 'Désigner un responsable' },
      { type: 'p', text: 'Une personne identifiée suit les échéances, collecte les informations et s\'assure que chaque déclaration est faite. Une suppléance évite les oublis pendant les congés.' },
      { type: 'h2', text: 'Contrôler avant de déclarer' },
      { type: 'list', items: [
        'Vérifier la cohérence entre la paie et l\'effectif du mois.',
        'Intégrer les entrées et les sorties de personnel de la période.',
        'Contrôler les éléments variables et les absences.',
      ] },
      { type: 'h2', text: 'Conserver les justificatifs' },
      { type: 'p', text: 'Archivez les déclarations, les accusés de réception et les preuves de paiement de façon ordonnée. En cas de question ou de contrôle, ces documents permettent de répondre rapidement.' },
      { type: 'p', text: 'Pour les structures qui ne disposent pas d\'un service RH étoffé, ce suivi peut être confié en tout ou partie à un prestataire spécialisé.' },
    ],
  },
];
