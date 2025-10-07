<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Play, Pause, BarChart3, Calendar } from 'lucide-vue-next'
import { computed } from 'vue'
// Timer state
const isTimerRunning = ref(false)
const timerSeconds = ref(0)
const timerInterval = ref<number | null>(null)

// Current workout state
const currentWorkout = ref({
  name: 'Aktuelles Workout',
  exercise: 'das gestartet wurde mit Übung',
  startTime: null as Date | null
})

// Dashboard stats
const stats = ref({
  weeklyWorkouts: 4,
  totalWorkouts: 127,
  currentWeight: 85,
  targetWeight: 80
})

// Timer functions
const startTimer = () => {
  if (!isTimerRunning.value) {
    isTimerRunning.value = true
    currentWorkout.value.startTime = new Date()
    timerInterval.value = setInterval(() => {
      timerSeconds.value++
    }, 1000)
  }
}

const pauseTimer = () => {
  isTimerRunning.value = false
  if (timerInterval.value) {
    clearInterval(timerInterval.value)
    timerInterval.value = null
  }
}

const resetTimer = () => {
  pauseTimer()
  timerSeconds.value = 0
  currentWorkout.value.startTime = null
}

const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  
  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

onMounted(() => {
  // Cleanup interval on unmount
  return () => {
    if (timerInterval.value) {
      clearInterval(timerInterval.value)
    }
  }
})

// User Name from Clerk
const userName = computed(() => {
  const user = (window as any).Clerk?.user
  return user ? user.firstName || user.fullName || 'User' : 'Guest'
})


</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="text-center sm:text-left">
      <h1 class="text-2xl sm:text-3xl font-bold">Dashboard</h1>
      <p class="text-muted-foreground mt-1">
        Willkommen <span class="font-bold text-indigo-500 hover:text-indigo-600 hover:drop-shadow-indigo-500 transition-all duration-200">{{ userName }}</span> zurück! Hier ist dein Überblick.
      </p>
    </div>

    <!-- Timer Card -->
    <Card class="w-full shadow-lg shadow-indigo-500/20">

      <CardHeader class="text-center">
        <CardTitle class="text-lg sm:text-xl">TIMER</CardTitle>
      </CardHeader>

      <CardContent class="space-y-4 w-full sm:w-1/2 mx-auto">
        <!-- Timer Display -->
        <div class="text-center">
          <div class="text-4xl sm:text-6xl font-mono font-bold text-primary">
            {{ formatTime(timerSeconds) }}
          </div>
        </div>
        
        <!-- Timer Controls -->
        <div class="flex flex-col justify-center gap-3">
          <Button 
            @click="startTimer" 
            :disabled="isTimerRunning"
            size="lg"
            class="flex items-center gap-2"
          >
            <Play class="h-4 w-4" />
            Start
          </Button>
          <Button 
            @click="pauseTimer" 
            :disabled="!isTimerRunning"
            variant="outline"
            size="lg"
            class="flex items-center gap-2"
          >
            <Pause class="h-4 w-4" />
            Pause
          </Button>
          <Button 
            @click="resetTimer"
            variant="outline"
            size="lg"
          >
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>

    <!-- Current Workout Card -->
    <Card class="w-full shadow-lg shadow-indigo-500/20">
      <CardHeader>
        <CardTitle class="text-lg sm:text-xl">{{ currentWorkout.name }}</CardTitle>
        <CardDescription>{{ currentWorkout.exercise }}</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-3">
          <div v-if="currentWorkout.startTime" class="text-sm text-muted-foreground">
            Gestartet um {{ currentWorkout.startTime.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) }}
          </div>
          <div v-else class="text-sm text-muted-foreground">
            Bereit zum Starten
          </div>

          <div class="flex flex-col gap-2  w-full sm:w-1/2 mx-auto">
            <Button size="lg" variant="outline" class="flex-1 sm:flex-none">
              Übung hinzufügen
            </Button>
            <Button size="lg" variant="outline" class="flex-1 sm:flex-none">
              Workout beenden
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Weight Progress Card -->
    <Card class="w-full shadow-lg shadow-indigo-500/20">
      <CardHeader>
        <CardTitle class="text-lg sm:text-xl flex items-center gap-2">
          <BarChart3 class="h-5 w-5" />
          Gewichtsverlauf
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <!-- Weight Display -->
          <div class="grid grid-cols-2 gap-4 text-center">
            <div class="space-y-1">
              <div class="text-2xl sm:text-3xl font-bold text-primary">{{ stats.currentWeight }}kg</div>
              <div class="text-xs sm:text-sm text-muted-foreground">Aktuell</div>
            </div>
            <div class="space-y-1">
              <div class="text-2xl sm:text-3xl font-bold text-green-600">{{ stats.targetWeight }}kg</div>
              <div class="text-xs sm:text-sm text-muted-foreground">Ziel</div>
            </div>
          </div>
          
          <!-- Progress Bar -->
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span>Fortschritt</span>
              <span>{{ Math.round(((stats.currentWeight - stats.targetWeight) / stats.currentWeight) * 100) }}%</span>
            </div>
            <div class="w-full bg-secondary rounded-full h-2">
              <div 
                class="bg-primary h-2 rounded-full transition-all duration-300" 
                :style="{ width: `${Math.min(100, ((stats.currentWeight - stats.targetWeight) / stats.currentWeight) * 100)}%` }"
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Weekly Stats Card -->
    <Card class="w-full shadow-lg shadow-indigo-500/20">
      <CardHeader>
        <CardTitle class="text-lg sm:text-xl flex items-center gap-2">
          <Calendar class="h-5 w-5" />
          Workouts Pro Woche
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div class="space-y-2">
            <div class="text-xl sm:text-2xl font-bold text-primary">{{ stats.weeklyWorkouts }}</div>
            <div class="text-xs text-muted-foreground">Diese Woche</div>
          </div>
          <div class="space-y-2">
            <div class="text-xl sm:text-2xl font-bold">{{ stats.totalWorkouts }}</div>
            <div class="text-xs text-muted-foreground">Gesamt</div>
          </div>
          <div class="space-y-2">
            <div class="text-xl sm:text-2xl font-bold text-green-600">7</div>
            <div class="text-xs text-muted-foreground">Ziel/Woche</div>
          </div>
          <div class="space-y-2">
            <div class="text-xl sm:text-2xl font-bold text-orange-600">3</div>
            <div class="text-xs text-muted-foreground">Streak</div>
          </div>
        </div>
        
        <!-- Weekly Progress -->
        <div class="mt-4 space-y-2">
          <div class="flex justify-between text-sm">
            <span>Wochenziel</span>
            <span>{{ stats.weeklyWorkouts }}/7</span>
          </div>
          <div class="w-full bg-secondary rounded-full h-2">
            <div 
              class="bg-primary h-2 rounded-full transition-all duration-300" 
              :style="{ width: `${Math.min(100, (stats.weeklyWorkouts / 7) * 100)}%` }"
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>