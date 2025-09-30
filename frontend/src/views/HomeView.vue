<script setup lang="ts"></script>

<template>
  <section class="space-y-6">
    <h2 class="text-2xl font-bold">Home</h2>
    <p class="text-muted-foreground">
      Wenn du hier Farben & Abstände siehst, läuft Tailwind. Schalte oben Dark/Light um – die
      Tokens (bg-background, text-foreground, …) wechseln live. ✅
    </p>

    <!-- Buttons (ohne shadcn) -->
    <div class="flex flex-wrap gap-3">
      <button class="rounded-md bg-primary text-primary-foreground px-4 py-2 hover:opacity-90 transition">Primary</button>
      <button class="rounded-md bg-accent text-accent-foreground px-4 py-2 hover:opacity-90 transition">Accent</button>
      <button class="rounded-md border border-border px-4 py-2 hover:bg-muted transition">Outline</button>
      <button class="rounded-md bg-destructive text-destructive-foreground px-4 py-2 hover:opacity-90 transition">Destructive</button>
    </div>

    <!-- Cards Grid -->
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <article class="rounded-xl border border-border bg-card text-card-foreground p-5 shadow-sm">
        <h3 class="font-semibold mb-1">Card 1</h3>
        <p class="text-sm text-muted-foreground">Neutraler Card-Style über CSS-Tokens.</p>
      </article>
      <article class="rounded-xl border border-border bg-card text-card-foreground p-5 shadow-sm">
        <h3 class="font-semibold mb-1">Card 2</h3>
        <p class="text-sm text-muted-foreground">Dark Mode ändert Farben automatisch.</p>
      </article>
      <article class="rounded-xl border border-border bg-card text-card-foreground p-5 shadow-sm">
        <h3 class="font-semibold mb-1">Card 3</h3>
        <p class="text-sm text-muted-foreground">Ring/Outline testen: <span class="inline-block rounded-md px-2 py-1 outline outline-ring/50">focus me</span></p>
      </article>
    </div>

    <!-- Kleine Demo-Badge mit Animation -->
    <div class="flex items-center gap-2">
      <span class="inline-flex items-center gap-2 rounded-full border border-border bg-secondary text-secondary-foreground px-3 py-1">
        <span class="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
        Live
      </span>
    </div>
  </section>
</template>
