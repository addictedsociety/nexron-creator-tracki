<script setup lang="ts">
import { SignIn } from '@clerk/vue'
</script>

<template>
  <!-- Clerk rendert das komplette UI -->
  <SignIn
    path="/sign-in"
    routing="path"
    afterSignInUrl="/"
    afterSignUpUrl="/"
  />
</template>
