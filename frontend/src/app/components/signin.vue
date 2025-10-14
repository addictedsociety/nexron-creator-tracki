<script setup lang="ts">
import { SignIn } from "@clerk/vue";
import logo from "@/assets/tracki_logo_lg.svg";

</script>

<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center 
           bg-background text-foreground px-6 text-center gap-6 drop-shadow-2xl"
  >
    <div class="space-y-2">
      <h1 class="text-xs font-bold tracking-tight">Welcome to</h1>
    </div>

    <img :src="logo" alt="Tracki Logo" class="h-12 w-auto sm:h-16 drop-shadow-md" />

    <div
      class="mt-4 p-4 rounded-xl border border-border 
             bg-card/80 backdrop-blur-md shadow-lg shadow-indigo-500/50"
    >
      <SignIn/>
    </div>
  </div>
</template>
