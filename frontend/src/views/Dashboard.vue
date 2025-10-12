<script setup lang="ts">
import TimeCard from '@/components/pages/Dashboard/timercard.vue'
import WeightCard from '@/components/pages/Dashboard/weightcard.vue'
import Daychecker from '@/components/pages/Dashboard/daychecker.vue'
import { computed, ref } from 'vue'

// Dashboard stats
const stats = ref({
  weeklyWorkouts: 4,
  totalWorkouts: 127,
  currentWeight: 85,
  targetWeight: 80
})

// User Name from Clerk
const userName = computed(() => {
  const user = (window as any).Clerk?.user
  return user ? user.firstName || user.fullName || 'User' : 'Guest'
})

</script>

<template>
  <div class="space-y-6 w-full sm:w-3/4 mx-auto ">
    <!-- Page Header -->
    <div class="text-center sm:text-left">
      <h1 class="text-2xl sm:text-3xl font-bold">Dashboard</h1>
      <p class="text-muted-foreground mt-1">
        Willkommen <span
          class="font-bold text-indigo-500 hover:text-indigo-600 hover:drop-shadow-indigo-500 transition-all duration-200">{{
          userName }}</span> zurück! Hier ist dein Überblick.
      </p>
    </div>

    <!-- Timer -->
    <TimeCard/>

    <!-- Weight Progress Card -->
    <WeightCard/>

    <!-- Weekly Stats Card -->
     <Daychecker/>
    
  </div>
</template>