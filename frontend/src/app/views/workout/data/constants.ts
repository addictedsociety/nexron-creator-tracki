// src/features/workout/data/constants.ts
export const exerciseCategories = [
  'Brust', 'Rücken', 'Beine', 'Schultern', 'Arme', 'Bauch', 'Cardio',
] as const;

export const exerciseLibrary: Record<string, string[]> = {
  Brust: ['Bankdrücken', 'Schrägbankdrücken', 'Liegestütze', 'Fliegende'],
  Rücken: ['Klimmzüge', 'Rudern', 'Kreuzheben', 'Latziehen'],
  Beine: ['Kniebeugen', 'Beinpresse', 'Ausfallschritte', 'Wadenheben'],
  Schultern: ['Schulterdrücken', 'Seitheben', 'Frontheben', 'Reverse Flys'],
  Arme: ['Bizeps Curls', 'Trizeps Dips', 'Hammercurls', 'Trizepsdrücken'],
  Bauch: ['Crunches', 'Plank', 'Russian Twists', 'Beinheben'],
  Cardio: ['Laufband', 'Fahrrad', 'Rudergerät', 'Elliptical'],
};
