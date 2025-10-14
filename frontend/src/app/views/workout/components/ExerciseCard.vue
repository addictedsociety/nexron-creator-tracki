<!-- src/features/workout/components/ExerciseCard.vue -->
<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Plus, Trash2 } from 'lucide-vue-next'
import SetRow from './SetRow.vue'
import type { ExerciseItem } from '../types'

const props = defineProps<{ exercise: ExerciseItem }>()
const emit = defineEmits<{ (e: 'remove'): void; (e: 'toggle', setId: string): void; (e: 'addSet'): void }>()
</script>

<template>
  <Card class="border">
    <CardHeader class="pb-3">
      <div class="flex items-center justify-between">
        <div>
          <CardTitle class="text-base">{{ props.exercise.name }}</CardTitle>
          <CardDescription>{{ props.exercise.category }}</CardDescription>
        </div>
        <Button @click="emit('remove')" variant="ghost" size="sm"><Trash2 class="h-4 w-4"/></Button>
      </div>
    </CardHeader>

    <CardContent class="space-y-2">
      <div class="space-y-1">
        <SetRow
          v-for="(set, i) in props.exercise.sets"
          :key="set.id"
          :index="i"
          v-model:reps="set.reps"
          v-model:weight="set.weight"
          :completed="set.completed"
          @toggle="emit('toggle', set.id)"
        />
      </div>
      <Button @click="emit('addSet')" variant="outline" size="sm" class="w-full">
        <Plus class="h-4 w-4 mr-2" /> Satz hinzufügen
      </Button>
    </CardContent>
  </Card>
</template>
