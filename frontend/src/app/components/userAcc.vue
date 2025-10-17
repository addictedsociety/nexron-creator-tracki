<!-- src/components/App/UserAcc.vue -->
<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { SignOutButton, UserProfile } from "@clerk/vue"
import { LogIn, Moon, Sun, UserRound, LogOut, Share, Siren, Zap, ZapOff } from "lucide-vue-next"
import { onMounted, ref, onBeforeUnmount } from "vue"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"

import { useShare } from '@vueuse/core'

import { useWakeLock } from '@vueuse/core'


const { share } = useShare()

// isSupported: ob der Browser WakeLock unterstützt
// isActive: ob aktuell ein WakeLock aktiv ist
// request('screen'): um WakeLock anzufordern
// release(): um WakeLock wieder freizugeben
const { isSupported, isActive, request, release } = useWakeLock()

const isDark = ref(false)

function startShare() {
  share({
    title: 'Tracki',
    text: 'Teile Tracki mit deinen Freunden – gemeinsam trainiert es sich besser.',
    url: location.href,
  })
}


function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle("dark", isDark.value)
  localStorage.setItem("theme", isDark.value ? "dark" : "light")
}

async function toggleWakeLock() {
  if (!isSupported) {
    console.warn('WakeLock nicht unterstützt')
    return
  }
  if (isActive.value) {
    // aktuell aktiv → ausschalten
    await release()
  } else {
    // aktuell aus → anfordern
    try {
      await request('screen')
    } catch (err) {
      console.error('Fehler beim Anfordern des WakeLock:', err)
    }
  }
}



onMounted(() => {
  const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches
  const stored = localStorage.getItem("theme")
  isDark.value = stored ? stored === "dark" : prefers
  document.documentElement.classList.toggle("dark", isDark.value)

  if (isSupported) {
    request('screen').catch(err => console.warn('WakeLock aktivieren fehlgeschlagen:', err))
  }
})

onBeforeUnmount(() => {
  if (isActive.value) {
    release().catch(err => {
      console.warn('Fehler beim Freigeben beim Unmount:', err)
    })
  }
})

</script>

<template>
  <Dialog>

    <DialogTrigger as-child>
      <Button variant="ghost" class="w-12 h-12 sm:w-11 sm:h-11 grid place-items-center rounded-xl
               bg-secondary text-secondary-foreground
               hover:bg-accent hover:text-accent-foreground
               transition-all duration-200 snap-start p-0
               aria-[state=open]:ring-2 aria-[state=open]:ring-accent" aria-label="User menu">
        <UserRound class="h-6 w-6 sm:h-5 sm:w-5" />
      </Button>
    </DialogTrigger>

    <DialogContent class="w-[92vw] lg:max-w-[880px] max-w-[92vw] sm:max-w-[560px]
             h-[70vh] sm:h-auto
             overflow-hidden p-0
             rounded-lg sm:rounded-xl
             shadow-lg shadow-indigo-500/50
             justify-center">
      <!-- eigener Scroller nur für den Inhalt -->
      <div class="max-h-full overflow-y-auto h-[85vh] sm:h-[70vh]">
        <UserProfile :appearance="{
          elements: {
            rootBox: 'h-full flex flex-col',
            card: 'shadow-none',
          }
        }">

          <!-- Standardseiten -->
          <UserProfile.Page label="account"/>
          
          <UserProfile.Page label="security" />

          <!-- Appearance -->
          <UserProfile.Page label="Darstellung" url="darstellung">
            <template #labelIcon>
              <Moon class="w-4 h-4" />
            </template>

            <div class="flex flex-col h-full p-4 sm:p-5">
              <div class="flex flex-col border rounded-lg p-4 gap-4">
                <h2 class="text-base sm:text-lg font-semibold">Theme</h2>
                <p class="text-sm opacity-70">
                  Schalte zwischen Dark und Light um. Einstellung wird gespeichert.
                </p>

                <Button variant="outline" size="lg"
                  class="w-full sm:w-auto h-12 sm:h-10 bg-secondary text-secondary-foreground" @click="toggleTheme">
                  <div class="flex items-center gap-2">
                    <span class="text-base sm:text-sm">
                      {{ isDark ? "Dark Mode" : "Light Mode" }}
                    </span>
                    <component :is="isDark ? Moon : Sun" class="h-5 w-5 sm:h-4 sm:w-4 text-current" />
                  </div>
                </Button>
              </div>

              <!-- Filler -->
              <div class="flex-grow h-90 rounded-md mt-4">

              </div>
            </div>
          </UserProfile.Page>

          <!-- Signout -->
          <UserProfile.Page label="Abmelden" url="abmelden">
            <template #labelIcon>
              <LogIn class="w-4 h-4" />
            </template>

            <div class="flex flex-col h-full p-4 sm:p-5">
              <div class="flex flex-col border rounded-lg p-4 gap-4">
                <h2 class="text-base sm:text-lg font-semibold">Ausloggen</h2>
                <p class="text-sm opacity-70">
                  Du wirst von deinem Konto abgemeldet. Beim nächsten Besuch kannst du dich wieder einloggen.
                </p>

                <AlertDialog>
                  <AlertDialogTrigger as-child>
                    <Button size="lg" variant="destructive" class="w-full sm:w-auto h-12 sm:h-10">
                      Signout
                      <span>
                        <LogOut class="h-5 w-5 sm:h-4 sm:w-4 text-current"></LogOut>
                      </span>
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent
                    class="w-[92vw] max-w-[92vw] sm:max-w-[420px] rounded-lg sm:rounded-lg text-center">
                    <AlertDialogHeader>
                      <AlertDialogTitle class="text-base sm:text-lg">
                        Bist du dir sicher?
                      </AlertDialogTitle>
                    </AlertDialogHeader>

                    <AlertDialogFooter class="flex flex-col justify-center items-center gap-3 sm:gap-2 w-full mt-3">
                      <AlertDialogCancel
                        class="h-10 sm:h-9 w-60 sm:w-45 text-center rounded-md border border-border hover:bg-accent hover:text-accent-foreground transition-all">
                        Abbrechen
                      </AlertDialogCancel>

                      <SignOutButton class="h-10 sm:h-9 w-60 sm:w-45 grid place-items-center rounded-md
                          bg-secondary text-secondary-foreground
                          hover:bg-accent hover:text-accent-foreground
                          transition-all duration-200">
                        Weiter
                      </SignOutButton>

                    </AlertDialogFooter>
                  </AlertDialogContent>

                </AlertDialog>
              </div>
              <!-- Filler -->
              <div class="flex-grow h-90 rounded-md mt-4">

              </div>
            </div>
          </UserProfile.Page>

          <!-- Appearance -->
          <UserProfile.Page label="Teilen" url="teilen">
            <template #labelIcon>
              <Share class="w-4 h-4" />
            </template>

            <div class="flex flex-col h-full p-4 sm:p-5">
              <div class="flex flex-col border rounded-lg p-4 gap-4">
                <h2 class="text-base sm:text-lg font-semibold">Teilen</h2>
                <p class="text-sm opacity-70">
                  Teile Tracki mit deinen Freunden – gemeinsam trainiert es sich besser.
                </p>

                <Button variant="outline" size="lg"
                  class="w-full sm:w-auto h-12 sm:h-10 bg-secondary text-secondary-foreground" @click="startShare">
                  <span>Freunde einladen</span>
                  <Share class="w-4 h-4" />
                </Button>

              </div>
              <!-- Filler -->
              <div class="flex-grow h-90 rounded-md mt-4">

              </div>
            </div>
          </UserProfile.Page>

          <UserProfile.Page label="Wakelock" url="Wakelock">
            <template #labelIcon>
              <Siren class="w-4 h-4" />
            </template>

            <div class="flex flex-col h-full p-4 sm:p-5">
              <div class="flex flex-col border rounded-lg p-4 gap-4">
                <h2 class="text-base sm:text-lg font-semibold">WakeLock</h2>
                <p class="text-sm opacity-70">
                  Wenn du den Button drückst, bleibt dein Bildschirm aktiv und geht nicht mehr automatisch in den
                  Ruhemodus.
                </p>

                <Button variant="outline" size="lg"
                  class="w-full sm:w-auto h-12 sm:h-10 bg-secondary text-secondary-foreground" @click="toggleWakeLock">
                  <template v-if="isActive">
                    <span>Wach bleiben</span>
                    <Zap class="w-4 h-4" />
                  </template>
                  <template v-else>
                    <span>Ruhezustand erlauben</span>
                    <ZapOff class="w-4 h-4" />
                  </template>
                </Button>
              </div>
              <!-- Filler -->
              <div class="flex-grow h-90 rounded-md mt-4">

              </div>
            </div>
          </UserProfile.Page>


        </UserProfile>
      </div>
    </DialogContent>
  </Dialog>
</template>
