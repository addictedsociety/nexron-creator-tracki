<script setup lang="ts">

import {
  ClerkLoaded,
  SignedIn,
  SignedOut
} from "@clerk/vue";

import { onMounted, ref } from "vue";

import Footer from "@/app/components/AppFooter.vue";
import Header from "@/app/components/AppHeader.vue";
import SignInTracki from "@/app/components/signin.vue";

const isDark = ref(false);

onMounted(() => {
  const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const stored = localStorage.getItem("theme");
  isDark.value = stored ? stored === "dark" : prefers;
  document.documentElement.classList.toggle("dark", isDark.value);
});

</script>

<template>
  <ClerkLoaded>
    <!-- Eingeloggt: volle App -->
    <SignedIn>
      <div class="flex flex-col min-h-screen bg-background text-foreground gap-10 ">

        <Header />
        
        <RouterView />

        <Footer />
        
      </div>
    </SignedIn>

    <!-- Ausgeloggt: nur SignIn -->
    <SignedOut>
      <SignInTracki />
    </SignedOut>


  </ClerkLoaded>

</template>
