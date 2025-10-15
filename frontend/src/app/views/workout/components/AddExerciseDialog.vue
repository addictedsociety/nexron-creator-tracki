<!-- src/features/workout/components/AddExerciseDialog.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { exerciseCategories, exerciseLibrary } from '../data/constants'
import { useWorkout } from '@/app/views/workout/composables/useWorkout'
const open = ref(false)
const form = ref({ name: '', category: '', sets: 3, reps: 10, weight: 50 })
const w = useWorkout()

function add() {
  if (!form.value.name || !form.value.category) return
  w.addExercise(form.value.name, form.value.category, form.value)
  form.value = { name: '', category: '', sets: 3, reps: 10, weight: 50 }
  open.value = false
}
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>

    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Neue Übung hinzufügen</DialogTitle>
        <DialogDescription>Wähle eine Übung aus oder erstelle eine neue.</DialogDescription>
      </DialogHeader>

      <div class="space-y-4">
        <div class="space-y-2">
          <Label>Kategorie</Label>
          <Select v-model="form.category">
            <SelectTrigger><SelectValue placeholder="Kategorie wählen" /></SelectTrigger>
            <SelectContent>
              <SelectItem v-for="c in exerciseCategories" :key="c" :value="c">{{ c }}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="space-y-2" v-if="form.category">
          <Label>Übung</Label>
          <Select v-model="form.name">
            <SelectTrigger><SelectValue placeholder="Übung wählen" /></SelectTrigger>
            <SelectContent>
              <SelectItem v-for="ex in exerciseLibrary[form.category]" :key="ex" :value="ex">{{ ex }}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="grid grid-cols-3 gap-2">
          <div class="space-y-2"><Label>Sätze</Label><Input v-model.number="form.sets" type="number" min="1" max="10" /></div>
          <div class="space-y-2"><Label>Wdh.</Label><Input v-model.number="form.reps" type="number" min="1" /></div>
          <div class="space-y-2"><Label>Gewicht (kg)</Label><Input v-model.number="form.weight" type="number" min="0" step="0.5" /></div>
        </div>
      </div>

      <DialogFooter>
        <Button :disabled="!form.name" @click="add">Hinzufügen</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
