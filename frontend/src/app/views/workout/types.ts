
export type SetItem = {
  id: string;
  reps: number;
  weight: number;
  completed: boolean;
};

export type ExerciseItem = {
  id: string;
  name: string;
  category: string;
  sets: SetItem[];
};

export type Workout = {
  name: string;
  exercises: ExerciseItem[];
};

export type RecentWorkout = {
  id: string;
  name: string;
  date: Date;
  duration: number; 
  exercises: number;
};
