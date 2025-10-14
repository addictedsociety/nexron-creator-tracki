// src/features/workout/data/templates.ts
export const workoutTemplates = [
  { id: '1', name: 'Push (Brust, Schultern, Trizeps)', exercises: ['Bankdrücken', 'Schulterdrücken', 'Trizeps Dips'] },
  { id: '2', name: 'Pull (Rücken, Bizeps)', exercises: ['Klimmzüge', 'Rudern', 'Bizeps Curls'] },
  { id: '3', name: 'Legs (Beine, Waden)', exercises: ['Kniebeugen', 'Beinpresse', 'Wadenheben'] },
] as const;
