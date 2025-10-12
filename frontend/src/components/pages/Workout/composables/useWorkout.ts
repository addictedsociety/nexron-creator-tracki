// src/features/workout/composables/useWorkout.ts
import { ref, computed } from 'vue';
import type { ExerciseItem, Workout, RecentWorkout } from '../types';
import { exerciseLibrary } from '../data/constants';
import { workoutTemplates } from '../data/templates';

const isWorkoutActive = ref(false);
const workoutStartTime = ref<Date | null>(null);
const currentWorkoutDuration = ref(0); // seconds
const workoutInterval = ref<number | null>(null);

const currentWorkout = ref<Workout>({ name: '', exercises: [] })

const recentWorkouts = ref<RecentWorkout[]>([
  { id: '1', name: 'Push Day', date: new Date('2024-10-01'), duration: 75, exercises: 6 },
  { id: '2', name: 'Pull Day', date: new Date('2024-09-29'), duration: 68, exercises: 5 },
  { id: '3', name: 'Leg Day', date: new Date('2024-09-27'), duration: 82, exercises: 7 },
]);

const workoutDurationFormatted = computed(() => {
  const m = Math.floor(currentWorkoutDuration.value / 60).toString().padStart(2, '0');
  const s = (currentWorkoutDuration.value % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
});

const totalSetsCompleted = computed(() =>
  currentWorkout.value.exercises.reduce((t, ex) => t + ex.sets.filter(s => s.completed).length, 0)
);

const totalSets = computed(() =>
  currentWorkout.value.exercises.reduce((t, ex) => t + ex.sets.length, 0)
);

function startWorkout(templateId?: string) {
  if (templateId) {
    const t = workoutTemplates.find(x => x.id === templateId);
    if (t) {
      currentWorkout.value.name = t.name;
      t.exercises.forEach(name => addExercise(name, getCategoryForExercise(name), { sets: 3, reps: 10, weight: 50 }));
    }
  }
  isWorkoutActive.value = true;
  workoutStartTime.value = new Date();
  currentWorkoutDuration.value = 0;
  workoutInterval.value = window.setInterval(() => currentWorkoutDuration.value++, 1000);
}

function pauseWorkout() {
  if (workoutInterval.value) {
    clearInterval(workoutInterval.value);
    workoutInterval.value = null;
  }
}

function resumeWorkout() {
  if (!workoutInterval.value) {
    workoutInterval.value = window.setInterval(() => currentWorkoutDuration.value++, 1000);
  }
}

function finishWorkout() {
  pauseWorkout();
  recentWorkouts.value.unshift({
    id: Date.now().toString(),
    name: currentWorkout.value.name || 'Workout',
    date: new Date(),
    duration: Math.floor(currentWorkoutDuration.value / 60),
    exercises: currentWorkout.value.exercises.length,
  });
  resetWorkout();
}

function resetWorkout() {
  isWorkoutActive.value = false;
  workoutStartTime.value = null;
  currentWorkoutDuration.value = 0;
  currentWorkout.value = { name: '', exercises: [] }
}

function getCategoryForExercise(exerciseName: string): string {
  for (const [cat, list] of Object.entries(exerciseLibrary)) if (list.includes(exerciseName)) return cat;
  return 'Sonstiges';
}

function addExercise(
  name: string,
  category: string,
  opts: { sets: number; reps: number; weight: number }
) {
  if (!Array.isArray(currentWorkout.value.exercises)) currentWorkout.value.exercises = []
  const idBase = Date.now().toString();
  const ex: ExerciseItem = {
    id: idBase,
    name,
    category,
    sets: Array.from({ length: opts.sets }, (_, i) => ({
      id: `${idBase}-${i}`,
      reps: opts.reps,
      weight: opts.weight,
      completed: false,
    })),
  };
  currentWorkout.value.exercises.push(ex);
}

function removeExercise(exerciseId: string) {
  currentWorkout.value.exercises = currentWorkout.value.exercises.filter(ex => ex.id !== exerciseId);
}

function toggleSetCompletion(exerciseId: string, setId: string) {
  const ex = currentWorkout.value.exercises.find(e => e.id === exerciseId);
  if (!ex) return;
  const s = ex.sets.find(s => s.id === setId);
  if (s) s.completed = !s.completed;
}

function addSet(exerciseId: string) {
  const ex = currentWorkout.value.exercises.find(e => e.id === exerciseId);
  if (!ex) return;
  const last = ex.sets[ex.sets.length - 1];
  ex.sets.push({
    id: `${Date.now()}-${ex.sets.length}`,
    reps: last?.reps ?? 10,
    weight: last?.weight ?? 50,
    completed: false,
  });
}

export function useWorkout() {
  return {
    // state
    isWorkoutActive,
    workoutStartTime,
    currentWorkoutDuration,
    currentWorkout,
    recentWorkouts,
    // computed
    workoutDurationFormatted,
    totalSetsCompleted,
    totalSets,
    // actions
    startWorkout,
    pauseWorkout,
    resumeWorkout,
    finishWorkout,
    addExercise,
    removeExercise,
    toggleSetCompletion,
    addSet,
    getCategoryForExercise,
  };
}
