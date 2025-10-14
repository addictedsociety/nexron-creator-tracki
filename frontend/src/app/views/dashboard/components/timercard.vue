<script setup lang="ts">
import { Pause, Play } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'


// Timer state
const isTimerRunning = ref(false)
const timerSeconds = ref(0)
const timerInterval = ref<number | null>(null)

// Timer functions
const startTimer = () => {
  if (!isTimerRunning.value) {
    isTimerRunning.value = true
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

</script>

<template><!-- Timer Card -->
<Card class="w-full border-primary shadow-lg shadow-indigo-500/50">

    <CardHeader class="text-center">
    <CardTitle class="text-lg sm:text-xl">PAUSE TIMER</CardTitle>
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
</template>