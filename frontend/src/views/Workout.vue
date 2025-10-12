<!-- src/features/workout/pages/WorkoutPage.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, TrendingUp } from 'lucide-vue-next'
import ActiveWorkoutCard from '@/components/pages/Workout/components/cards/ActiveWorkoutCard.vue'
import { useWorkout } from '@/components/pages/Workout/composables/useWorkout.ts'
import WorkoutTemplates from '@/components/pages/Workout/components/cards/workout_template_card.vue'
import WorkoutOrdner from '@/components/pages/Workout/components/cards/workout_ordner_card.vue'

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
        Hey <span class="font-bold text-indigo-500 hover:text-indigo-600 hover:drop-shadow-indigo-500 transition-all duration-200">{{ userName }}</span>,
        starte dein Training oder wähle ein Workout-Template.
      </p>
    </div>
    <div class="flex flex-col  gap-6">
      <ActiveWorkoutCard v-if="w.isWorkoutActive"/>
      
      <WorkoutTemplates/>

      <WorkoutOrdner/>
    </div>
  </div>
</template>
