<!-- src/features/workout/components/SetRow.vue -->
<script setup lang="ts">
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'

const props = defineProps<{
  index: number;
  completed: boolean;
  reps: number;
  weight: number;
}>()

const emit = defineEmits<{
  (e: 'update:reps', v: number): void;
  (e: 'update:weight', v: number): void;
  (e: 'toggle'): void;
}>()
</script>

<template>
  <div class="flex items-center gap-2 p-2 rounded border" :class="completed ? 'bg-green-50 border-green-200 dark:bg-green-950/20' : ''">
    <span class="text-sm font-medium w-8">{{ index + 1 }}</span>
    <Input :value="weight" @input="emit('update:weight', Number(($event.target as HTMLInputElement).value))" type="number" step="0.5" class="w-20 h-8 text-sm" placeholder="kg" />
    <span class="text-sm text-muted-foreground">kg ×</span>
    <Input :value="reps" @input="emit('update:reps', Number(($event.target as HTMLInputElement).value))" type="number" class="w-16 h-8 text-sm" placeholder="reps" />
    <Button @click="emit('toggle')" :variant="completed ? 'default' : 'outline'" size="sm" class="ml-auto">
      {{ completed ? '✓' : '○' }}
    </Button>
  </div>
</template>
