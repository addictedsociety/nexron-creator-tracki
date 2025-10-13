<!-- src/features/workout/components/ActiveWorkoutCard.vue -->

<script setup lang="ts">

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Pause, Play, Square, Plus, Trash2 } from 'lucide-vue-next'
import ExerciseCard from './../ExerciseCard.vue'
import AddExerciseDialog from './/../AddExerciseDialog.vue'
import { useWorkout } from '@/components/pages/Workout/composables/useWorkout.ts'

const w = useWorkout()

</script>

<template>
  <Card class="w-full border-primary shadow-lg shadow-indigo-500/20" v-if="w.isWorkoutActive">
    <CardHeader>
      <div class="flex items-center justify-between">
        <div>
          <CardTitle class="text-lg sm:text-xl text-primary">Aktives Workout</CardTitle>
          <CardDescription>{{ w.currentWorkout.name || 'Aktuelles Training' }}</CardDescription>
        </div>
        <div class="text-right">
          <div class="text-2xl sm:text-3xl font-mono font-bold text-primary">{{ w.workoutDurationFormatted }}</div>
          <div class="text-sm text-muted-foreground">{{ w.totalSetsCompleted }}/{{ w.totalSets }} Sätze</div>
        </div>
      </div>
    </CardHeader>

    <CardContent class="space-y-4">
      
      <div class="flex gap-2 items-center justify-center flex-wrap">
        <Button @click="w.pauseWorkout" variant="outline" size="sm"><Pause class="h-4 w-4 mr-2" />Pausieren</Button>
        <Button @click="w.resumeWorkout" variant="outline" size="sm"><Play class="h-4 w-4 mr-2" />Fortsetzen</Button>
        <Button @click="w.finishWorkout" variant="destructive" size="sm"><Square class="h-4 w-4 mr-2" />Beenden</Button>
      </div>

      <AddExerciseDialog>
        <Button class="w-full sm:w-auto"><Plus class="h-4 w-4 mr-2" />Übung hinzufügen</Button>
      </AddExerciseDialog>

      <div class="space-y-3" v-if="(w.currentWorkout?.exercises ?? []).length > 0">
        <h3 class="font-semibold">Übungen</h3>
        <div class="space-y-3">
          <ExerciseCard v-for="ex in (w.currentWorkout?.exercises ?? [])"
            :key="ex.id"
            :exercise="ex"
            @remove="w.removeExercise(ex.id)"
            @toggle="(setId: string) => w.toggleSetCompletion(ex.id, setId)"
            @addSet="() => w.addSet(ex.id)"
          />
        </div>
      </div>
    </CardContent>
  </Card>
</template>
