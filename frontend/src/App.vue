<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDark = ref(false)

onMounted(() => {
  // initial: bevorzugtes Theme / gespeichertes Theme
  const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches
  const stored = localStorage.getItem('theme')
  isDark.value = stored ? stored === 'dark' : prefers
  document.documentElement.classList.toggle('dark', isDark.value)
})

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <header class="border-b border-border">
      <div class="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="h-3 w-3 rounded-full bg-primary animate-pulse"></div>
          <h1 class="text-xl font-semibold">Vite + Vue + Tailwind v4</h1>
        </div>

        <nav class="flex items-center gap-4">
          <router-link
            to="/"
            class="px-3 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition"
            :class="$route.path === '/' ? 'bg-secondary text-secondary-foreground' : ''"
          >
            Home
          </router-link>
          <router-link
            to="/about"
            class="px-3 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition"
            :class="$route.path === '/about' ? 'bg-secondary text-secondary-foreground' : ''"
          >
            About
          </router-link>

          <button
            class="ml-2 inline-flex items-center gap-2 rounded-md border border-border bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground px-3 py-1 transition"
            @click="toggleTheme"
            :aria-pressed="isDark"
          >
            <span v-if="!isDark">🌙 Dark</span>
            <span v-else>☀️ Light</span>
          </button>
        </nav>
      </div>
    </header>

    <main class="mx-auto max-w-5xl px-6 py-8">
      <router-view />
    </main>

    <footer class="mx-auto max-w-5xl px-6 py-6 text-sm text-muted-foreground border-t border-border">
      Tailwind-Farben: <code class="mx-2 rounded bg-muted px-2 py-1">bg-background</code>
      <code class="mx-2 rounded bg-primary text-primary-foreground px-2 py-1">bg-primary</code>
      <code class="mx-2 rounded bg-card text-card-foreground px-2 py-1">bg-card</code>
    </footer>
  </div>
</template>
