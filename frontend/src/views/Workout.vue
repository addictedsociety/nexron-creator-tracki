<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Play, Pause, Square, TrendingUp, Trash2 } from 'lucide-vue-next'

// Workout state
const isWorkoutActive = ref(false)
const workoutStartTime = ref<Date | null>(null)
const currentWorkoutDuration = ref(0)
const workoutInterval = ref<number | null>(null)

// Exercise types and categories
const exerciseCategories = ref([
  'Brust', 'Rücken', 'Beine', 'Schultern', 'Arme', 'Bauch', 'Cardio'
])

const exerciseLibrary = ref<Record<string, string[]>>({
  'Brust': ['Bankdrücken', 'Schrägbankdrücken', 'Liegestütze', 'Fliegende'],
  'Rücken': ['Klimmzüge', 'Rudern', 'Kreuzheben', 'Latziehen'],
  'Beine': ['Kniebeugen', 'Beinpresse', 'Ausfallschritte', 'Wadenheben'],
  'Schultern': ['Schulterdrücken', 'Seitheben', 'Frontheben', 'Reverse Flys'],
  'Arme': ['Bizeps Curls', 'Trizeps Dips', 'Hammercurls', 'Trizepsdrücken'],
  'Bauch': ['Crunches', 'Plank', 'Russian Twists', 'Beinheben'],
  'Cardio': ['Laufband', 'Fahrrad', 'Rudergerät', 'Elliptical']
})

// Current workout data
const currentWorkout = ref({
  name: '',
  exercises: [] as Array<{
    id: string
    name: string
    category: string
    sets: Array<{
      id: string
      reps: number
      weight: number
      completed: boolean
    }>
  }>
})

// Form states
const newExerciseDialog = ref(false)
const newExerciseForm = ref({
  name: '',
  category: '',
  sets: 3,
  reps: 10,
  weight: 50
})

// Recent workouts
const recentWorkouts = ref([
  {
    id: '1',
    name: 'Push Day',
    date: new Date('2024-10-01'),
    duration: 75,
    exercises: 6
  },
  {
    id: '2', 
    name: 'Pull Day',
    date: new Date('2024-09-29'),
    duration: 68,
    exercises: 5
  },
  {
    id: '3',
    name: 'Leg Day',
    date: new Date('2024-09-27'),
    duration: 82,
    exercises: 7
  }
])

// Workout templates
const workoutTemplates = ref([
  {
    id: '1',
    name: 'Push (Brust, Schultern, Trizeps)',
    exercises: ['Bankdrücken', 'Schulterdrücken', 'Trizeps Dips']
  },
  {
    id: '2',
    name: 'Pull (Rücken, Bizeps)',
    exercises: ['Klimmzüge', 'Rudern', 'Bizeps Curls']
  },
  {
    id: '3',
    name: 'Legs (Beine, Waden)',
    exercises: ['Kniebeugen', 'Beinpresse', 'Wadenheben']
  }
])

// Computed
const workoutDurationFormatted = computed(() => {
  const minutes = Math.floor(currentWorkoutDuration.value / 60)
  const seconds = currentWorkoutDuration.value % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

const totalSetsCompleted = computed(() => {
  return currentWorkout.value.exercises.reduce((total, exercise) => {
    return total + exercise.sets.filter(set => set.completed).length
  }, 0)
})

const totalSets = computed(() => {
  return currentWorkout.value.exercises.reduce((total, exercise) => {
    return total + exercise.sets.length
  }, 0)
})

// Functions
const startWorkout = (templateId?: string) => {
  if (templateId) {
    const template = workoutTemplates.value.find(t => t.id === templateId)
    if (template) {
      currentWorkout.value.name = template.name
      // Add template exercises to current workout
      template.exercises.forEach(exerciseName => {
        addExercise(exerciseName, getCategoryForExercise(exerciseName))
      })
    }
  }
  
  isWorkoutActive.value = true
  workoutStartTime.value = new Date()
  currentWorkoutDuration.value = 0
  
  workoutInterval.value = setInterval(() => {
    currentWorkoutDuration.value++
  }, 1000)
}

const pauseWorkout = () => {
  if (workoutInterval.value) {
    clearInterval(workoutInterval.value)
    workoutInterval.value = null
  }
}

const resumeWorkout = () => {
  if (!workoutInterval.value) {
    workoutInterval.value = setInterval(() => {
      currentWorkoutDuration.value++
    }, 1000)
  }
}

const finishWorkout = () => {
  pauseWorkout()
  
  // Save workout to recent workouts
  recentWorkouts.value.unshift({
    id: Date.now().toString(),
    name: currentWorkout.value.name || 'Workout',
    date: new Date(),
    duration: Math.floor(currentWorkoutDuration.value / 60),
    exercises: currentWorkout.value.exercises.length
  })
  
  // Reset workout state
  isWorkoutActive.value = false
  workoutStartTime.value = null
  currentWorkoutDuration.value = 0
  currentWorkout.value = { name: '', exercises: [] }
}

const addExercise = (name: string, category: string) => {
  const newExercise = {
    id: Date.now().toString(),
    name,
    category,
    sets: Array.from({ length: newExerciseForm.value.sets }, (_, i) => ({
      id: `${Date.now()}-${i}`,
      reps: newExerciseForm.value.reps,
      weight: newExerciseForm.value.weight,
      completed: false
    }))
  }
  
  currentWorkout.value.exercises.push(newExercise)
  resetNewExerciseForm()
}

const addExerciseFromForm = () => {
  if (newExerciseForm.value.name && newExerciseForm.value.category) {
    addExercise(newExerciseForm.value.name, newExerciseForm.value.category)
    newExerciseDialog.value = false
  }
}

const removeExercise = (exerciseId: string) => {
  currentWorkout.value.exercises = currentWorkout.value.exercises.filter(ex => ex.id !== exerciseId)
}

const toggleSetCompletion = (exerciseId: string, setId: string) => {
  const exercise = currentWorkout.value.exercises.find(ex => ex.id === exerciseId)
  if (exercise) {
    const set = exercise.sets.find(s => s.id === setId)
    if (set) {
      set.completed = !set.completed
    }
  }
}

const addSet = (exerciseId: string) => {
  const exercise = currentWorkout.value.exercises.find(ex => ex.id === exerciseId)
  if (exercise) {
    const lastSet = exercise.sets[exercise.sets.length - 1]
    exercise.sets.push({
      id: `${Date.now()}-${exercise.sets.length}`,
      reps: lastSet?.reps || 10,
      weight: lastSet?.weight || 50,
      completed: false
    })
  }
}

const getCategoryForExercise = (exerciseName: string): string => {
  for (const [category, exercises] of Object.entries(exerciseLibrary.value)) {
    if (exercises.includes(exerciseName)) {
      return category
    }
  }
  return 'Sonstiges'
}

const resetNewExerciseForm = () => {
  newExerciseForm.value = {
    name: '',
    category: '',
    sets: 3,
    reps: 10,
    weight: 50
  }
}

const userName = computed(() => {
  const user = (window as any).Clerk?.user
  return user ? user.firstName || user.fullName || 'User' : 'Guest'
})


</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="text-center sm:text-left">
      <h1 class="text-2xl sm:text-3xl font-bold">Workout</h1>
      <p class="text-muted-foreground mt-1">Hey <span class="font-bold text-indigo-500 hover:text-indigo-600 hover:drop-shadow-indigo-500 transition-all duration-200">{{ userName }}</span>, starte dein Training oder wähle ein Workout-Template.</p>
    </div>

    <!-- Active Workout Card -->
    <Card v-if="isWorkoutActive" class="w-full border-primary">
      <CardHeader>
        <div class="flex items-center justify-between">
          <div>
            <CardTitle class="text-lg sm:text-xl text-primary">Aktives Workout</CardTitle>
            <CardDescription>{{ currentWorkout.name || 'Aktuelles Training' }}</CardDescription>
          </div>
          <div class="text-right">
            <div class="text-2xl sm:text-3xl font-mono font-bold text-primary">
              {{ workoutDurationFormatted }}
            </div>
            <div class="text-sm text-muted-foreground">
              {{ totalSetsCompleted }}/{{ totalSets }} Sätze
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent class="space-y-4">
        <!-- Workout Controls -->
        <div class="flex gap-2 flex-wrap">
          <Button @click="pauseWorkout" variant="outline" size="sm">
            <Pause class="h-4 w-4 mr-2" />
            Pausieren
          </Button>
          <Button @click="resumeWorkout" variant="outline" size="sm">
            <Play class="h-4 w-4 mr-2" />
            Fortsetzen
          </Button>
          <Button @click="finishWorkout" variant="destructive" size="sm">
            <Square class="h-4 w-4 mr-2" />
            Beenden
          </Button>
        </div>

        <!-- Add Exercise Button -->
        <Dialog v-model:open="newExerciseDialog">
          <DialogTrigger as-child>
            <Button class="w-full sm:w-auto">
              <Plus class="h-4 w-4 mr-2" />
              Übung hinzufügen
            </Button>
          </DialogTrigger>
          <DialogContent class="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Neue Übung hinzufügen</DialogTitle>
              <DialogDescription>
                Wähle eine Übung aus oder erstelle eine neue.
              </DialogDescription>
            </DialogHeader>
            <div class="space-y-4">
              <div class="space-y-2">
                <Label for="exercise-category">Kategorie</Label>
                <Select v-model="newExerciseForm.category">
                  <SelectTrigger>
                    <SelectValue placeholder="Kategorie wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem v-for="category in exerciseCategories" :key="category" :value="category">
                      {{ category }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div class="space-y-2" v-if="newExerciseForm.category">
                <Label for="exercise-name">Übung</Label>
                <Select v-model="newExerciseForm.name">
                  <SelectTrigger>
                    <SelectValue placeholder="Übung wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem 
                      v-for="exercise in exerciseLibrary[newExerciseForm.category]" 
                      :key="exercise" 
                      :value="exercise"
                    >
                      {{ exercise }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div class="grid grid-cols-3 gap-2">
                <div class="space-y-2">
                  <Label for="sets">Sätze</Label>
                  <Input id="sets" v-model.number="newExerciseForm.sets" type="number" min="1" max="10" />
                </div>
                <div class="space-y-2">
                  <Label for="reps">Wdh.</Label>
                  <Input id="reps" v-model.number="newExerciseForm.reps" type="number" min="1" />
                </div>
                <div class="space-y-2">
                  <Label for="weight">Gewicht (kg)</Label>
                  <Input id="weight" v-model.number="newExerciseForm.weight" type="number" min="0" step="0.5" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button @click="addExerciseFromForm" :disabled="!newExerciseForm.name">
                Hinzufügen
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <!-- Current Exercises -->
        <div class="space-y-3" v-if="currentWorkout.exercises.length > 0">
          <h3 class="font-semibold">Übungen</h3>
          <div class="space-y-3">
            <Card v-for="exercise in currentWorkout.exercises" :key="exercise.id" class="border">
              <CardHeader class="pb-3">
                <div class="flex items-center justify-between">
                  <div>
                    <CardTitle class="text-base">{{ exercise.name }}</CardTitle>
                    <CardDescription>{{ exercise.category }}</CardDescription>
                  </div>
                  <Button @click="removeExercise(exercise.id)" variant="ghost" size="sm">
                    <Trash2 class="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent class="space-y-2">
                <div class="space-y-1">
                  <div 
                    v-for="(set, index) in exercise.sets" 
                    :key="set.id"
                    class="flex items-center gap-2 p-2 rounded border"
                    :class="set.completed ? 'bg-green-50 border-green-200 dark:bg-green-950/20' : ''"
                  >
                    <span class="text-sm font-medium w-8">{{ index + 1 }}</span>
                    <Input 
                      v-model.number="set.weight" 
                      type="number" 
                      step="0.5"
                      class="w-20 h-8 text-sm"
                      placeholder="kg"
                    />
                    <span class="text-sm text-muted-foreground">kg ×</span>
                    <Input 
                      v-model.number="set.reps" 
                      type="number"
                      class="w-16 h-8 text-sm"
                      placeholder="reps"
                    />
                    <Button 
                      @click="toggleSetCompletion(exercise.id, set.id)"
                      :variant="set.completed ? 'default' : 'outline'"
                      size="sm"
                      class="ml-auto"
                    >
                      {{ set.completed ? '✓' : '○' }}
                    </Button>
                  </div>
                </div>
                <Button @click="addSet(exercise.id)" variant="outline" size="sm" class="w-full">
                  <Plus class="h-4 w-4 mr-2" />
                  Satz hinzufügen
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Start Workout Section -->
    <div v-if="!isWorkoutActive">
      <Tabs default-value="templates" class="w-full">
        <TabsList class="grid w-full grid-cols-2">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="history">Verlauf</TabsTrigger>
        </TabsList>
        
        <!-- Workout Templates -->
        <TabsContent value="templates" class="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle class="text-lg sm:text-xl">Workout Templates</CardTitle>
              <CardDescription>Wähle ein vorgefertigtes Workout oder starte ein leeres Training.</CardDescription>
            </CardHeader>
            <CardContent class="space-y-3">
              <!-- Quick Start -->
              <Button @click="startWorkout()" class="w-full" size="lg">
                <Play class="h-4 w-4 mr-2" />
                Leeres Workout starten
              </Button>
              
              <!-- Template List -->
              <div class="space-y-2">
                <h4 class="font-medium text-sm">Vorgefertigte Workouts:</h4>
                <div class="space-y-2">
                  <Card v-for="template in workoutTemplates" :key="template.id" class="cursor-pointer hover:bg-accent">
                    <CardContent class="p-4" @click="startWorkout(template.id)">
                      <div class="flex items-center justify-between">
                        <div>
                          <div class="font-medium">{{ template.name }}</div>
                          <div class="text-sm text-muted-foreground">
                            {{ template.exercises.join(', ') }}
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Play class="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <!-- Workout History -->
        <TabsContent value="history" class="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle class="text-lg sm:text-xl">Workout Verlauf</CardTitle>
              <CardDescription>Deine letzten Trainingseinheiten.</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="space-y-3">
                <Card v-for="workout in recentWorkouts" :key="workout.id" class="border">
                  <CardContent class="p-4">
                    <div class="flex items-center justify-between">
                      <div>
                        <div class="font-medium">{{ workout.name }}</div>
                        <div class="text-sm text-muted-foreground">
                          {{ workout.date.toLocaleDateString('de-DE') }} • 
                          {{ workout.duration }} Min • 
                          {{ workout.exercises }} Übungen
                        </div>
                      </div>
                      <div class="flex gap-2">
                        <Button size="sm" variant="outline">
                          <TrendingUp class="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          Wiederholen
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  </div>
</template>