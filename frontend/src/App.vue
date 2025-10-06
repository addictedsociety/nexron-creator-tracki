<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { SignedIn, SignedOut, SignInButton, UserButton, SignIn } from '@clerk/vue'
import { Moon, Sun } from 'lucide-vue-next'
import logo from '@/assets/tracki_logo_lg.svg'

const route = useRoute()

const isDark = ref(false)
onMounted(() => {
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

const isActive = (p: string) => computed(() => route.path === p)

</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <header class="border-b border-border sticky top-0 z-40 bg-background/80 backdrop-blur">
      <div class="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <RouterLink to="/" class="flex items-center gap-2">
            <img :src="logo" alt="Tracki" class="h-8 w-auto" />
          </RouterLink>
        </div>

        <nav class="flex items-center gap-2 overflow-x-auto">
          <RouterLink
            to="/"
            class="px-3 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition whitespace-nowrap"
            :class="isActive('/').value ? 'bg-secondary text-secondary-foreground' : ''"
          >
            Dashboard
          </RouterLink>
          <RouterLink
            to="/workout"
            class="px-3 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition whitespace-nowrap"
            :class="isActive('/workout').value ? 'bg-secondary text-secondary-foreground' : ''"
          >
            Workout
          </RouterLink>
          <RouterLink
            to="/user"
            class="px-3 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition whitespace-nowrap"
            :class="isActive('/user').value ? 'bg-secondary text-secondary-foreground' : ''"
          >
            User
          </RouterLink>

          <button
            class="ml-2 inline-flex items-center gap-2 rounded-md border border-border bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground px-3 py-1 transition"
            @click="toggleTheme" :aria-pressed="isDark"
          >
            <span v-if="!isDark"><Moon class="h-4 w-4" /></span>
            <span v-else><Sun class="h-4 w-4" /></span>
          </button>

          <!-- Auth UI -->
          <SignedOut>
            <SignInButton mode="modal">
              <button class="px-3 py-1 rounded-md border border-border hover:bg-accent transition">
                Sign in
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </nav>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-4 sm:px-6 py-6">
      <!-- Wenn ausgeloggt: zeige SignIn-Seite inline als Fallback -->
      <SignedOut>
        <SignIn path="/sign-in" routing="path" afterSignInUrl="/" />
      </SignedOut>

      <!-- Wenn eingeloggt: normale Routen -->
      <SignedIn>
        <RouterView />
      </SignedIn>
    </main>

    <footer class="mx-auto max-w-6xl px-4 sm:px-6 py-6 text-xs sm:text-sm text-muted-foreground border-t border-border">
      © {{ new Date().getFullYear() }} Tracki
    </footer>
  </div>
</template>
