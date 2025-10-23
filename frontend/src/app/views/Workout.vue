<!-- src/features/workout/pages/WorkoutPage.vue -->
<script setup lang="ts">
import ActiveWorkoutCard from '@/app/views/workout/components/cards/ActiveWorkoutCard.vue'
import WorkoutOrdner from '@/app/views/workout/components/cards/workout_ordner_card/workout.ordner.card.vue'
import WorkoutTemplates from '@/app/views/workout/components/cards/workout_template_card/workout.template.card.vue'
import { useWorkout } from '@/app/views/workout/composables/useWorkout'
import { computed } from 'vue'
const w = useWorkout()

const userName = computed(() => {
  const user = (window as any).Clerk?.user
  return user ? user.firstName || user.fullName || 'User' : 'Guest'
})

const formatDateDE = (d: unknown) => {
  const dt = d instanceof Date ? d : new Date(String(d ?? ''));
  return isNaN(+dt) ? '—' : dt.toLocaleDateString('de-DE');
};

</script>

<template>
  <div class="space-y-6 w-full sm:w-3/4 mx-auto">

    <div class="text-center sm:text-left">
      <h1 class="text-2xl sm:text-3xl font-bold">Workout</h1>
      <p class="text-muted-foreground mt-1">
        Hey <span
          class="font-bold text-indigo-500 hover:text-indigo-600 hover:drop-shadow-indigo-800 transition-all duration-200">{{
          userName }}</span>,
        starte dein Training oder wähle ein Workout-Template.
      </p>
    </div>
    <div class="flex flex-col  gap-6">

      <ActiveWorkoutCard v-if="w.isWorkoutActive" />

      <WorkoutOrdner />

      <WorkoutTemplates />

      
    </div>
  </div>
</template>
