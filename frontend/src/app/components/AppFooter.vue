<script setup lang="ts">
import {
  BadgeCheck,
  Github,
  Heart,
  Instagram,
  Linkedin,
  Navigation
} from "lucide-vue-next";

</script>
<template>
    <footer
        class="w-full bg-background border-t text-sm text-muted-foreground rounded-lg shadow-inner shadow-indigo-800 dark:shadow-indigo-800/20">
        <div class="max-w-screen-xl mx-auto px-4 sm:px-6 py-4">
            <!-- Mobile: Spalten untereinander | ab md: nebeneinander -->
            <div class="flex flex-col md:flex-row gap-6 md:gap-0 md:divide-x md:divide-border">
            <!-- Logo -->
            <div class="w-full md:basis-1/4 md:pr-6 text-center md:text-left">
                <span class="inline-flex items-center justify-center md:justify-start gap-2">
                <Heart class="w-4 h-4 text-red-500" />
                <span>Made with love by Nexron</span>
                </span>
            </div>

            <!-- Navigation -->
            <div class="w-full md:basis-1/4 md:px-6 text-center md:text-left">
                <div class="flex items-center justify-center md:justify-start gap-2 mb-2">
                <Navigation class="w-4 h-4" />
                <h2 class="font-semibold text-foreground">Navigation</h2>
                </div>
                <div class="flex flex-col gap-1">
                <RouterLink to="/" class="py-1 hover:underline hover:text-foreground transition-colors">Dashboard
                </RouterLink>
                <RouterLink to="/workout" class="py-1 hover:underline hover:text-foreground transition-colors">Workout
                </RouterLink>
                </div>
            </div>

            <!-- Socials -->
            <div class="w-full md:basis-1/4 md:px-6 text-center md:text-left">
                <div class="flex items-center justify-center md:justify-start gap-2 mb-2">
                <BadgeCheck class="w-4 h-4" />
                <h2 class="font-semibold text-foreground">Socials</h2>
                </div>
                <div class="flex flex-col gap-1">
                <a href="https://www.linkedin.com/in/jonas-glatz-ki/" target="_blank"
                    class="py-1 hover:underline hover:text-foreground transition-colors inline-flex items-center justify-center md:justify-start gap-2">
                    <Linkedin class="w-4 h-4" /> <span>LinkedIn</span>
                </a>
                <a href="https://www.instagram.com/nexronstudios/" target="_blank"
                    class="py-1 hover:underline hover:text-foreground transition-colors inline-flex items-center justify-center md:justify-start gap-2">
                    <Instagram class="w-4 h-4" /> <span>Instagram</span>
                </a>
                <a href="https://github.com/addictedsociety" target="_blank"
                    class="py-1 hover:underline hover:text-foreground transition-colors inline-flex items-center justify-center md:justify-start gap-2">
                    <Github class="w-4 h-4" /> <span>GitHub</span>
                </a>
                </div>
            </div>

            <!-- Copyright / Legal -->
            <div class="w-full md:basis-1/4 md:pl-6 text-center md:text-left">
                <h2 class="font-semibold text-foreground">
                &copy; 2025 Tracki
                </h2>
            </div>
            </div>
        </div>
    </footer>
</template>