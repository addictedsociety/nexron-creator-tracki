<script setup lang="ts">
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { SignedIn, SignedOut, SignIn, useAuth, redirectToSignIn } from '@clerk/vue'

const route = useRoute()
const { isLoaded, isSignedIn } = useAuth()

// Reaktiv beobachten: sobald Clerk geladen ist & nicht eingeloggt -> redirect
watchEffect(() => {
  if (isLoaded.value && !isSignedIn.value) {
    redirectToSignIn({ redirectUrl: route.fullPath })
  }
})
</script>

<template>
  <SignedIn>
    <router-view />
  </SignedIn>

  <!-- Fallback: rendert SignIn inline, falls Redirect noch nicht gegriffen hat -->
  <SignedOut>
    <SignIn path="/sign-in" routing="path" afterSignInUrl="/" />
  </SignedOut>
</template>
