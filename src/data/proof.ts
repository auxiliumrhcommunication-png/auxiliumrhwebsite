// Chiffres clés et témoignages.
//
// IMPORTANT : n'afficher ici que des informations réelles et vérifiables.
// Des chiffres ou des témoignages inventés publiés sur le site seraient
// trompeurs pour les prospects (et contraires aux règles de la publicité).

export type Stat = { value: string; label: string; detail: string };

// Indicateurs factuels issus de la présentation du cabinet.
export const stats: Stat[] = [
  { value: '6', label: 'domaines d\'expertise', detail: 'Du recrutement à l\'externalisation complète de la fonction RH.' },
  { value: '4', label: 'étapes d\'accompagnement', detail: 'Comprendre, diagnostiquer, structurer, suivre.' },
  { value: 'CNSS · DTS', label: 'obligations sociales', detail: 'Immatriculation et déclarations sociales accompagnées.' },
  { value: 'TPE → Groupe', label: 'toutes tailles', detail: 'Une approche adaptée au niveau de structuration de chaque organisation.' },
];

// Chiffres d'impact (talents placés, entreprises accompagnées…) :
// à remplir avec les vrais chiffres du cabinet. Tant que la liste est vide,
// la rangée « Impact » n'est pas affichée.
// Exemple : { value: '120', label: 'talents placés', detail: 'depuis 2023' }
export const impactStats: Stat[] = [];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

// Témoignages clients : uniquement avec l'accord écrit des personnes citées.
// Tant que la liste est vide, la section « Ils nous font confiance » n'est pas affichée.
export const testimonials: Testimonial[] = [];
