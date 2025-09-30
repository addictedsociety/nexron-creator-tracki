<script setup lang="ts"></script>

<template>
  <section class="space-y-6">
    <h2 class="text-2xl font-bold">About</h2>
    <p class="text-muted-foreground">
      Diese Seite zeigt Typografie & Tabelle – nützlich, um Tailwind im Dark Mode zu überprüfen.
    </p>

    <div class="rounded-xl border border-border bg-card text-card-foreground p-5 shadow-sm">
      <h3 class="font-semibold mb-2">Typografie</h3>
      <ul class="list-disc ms-5 space-y-1">
        <li><code class="rounded bg-muted px-2 py-0.5">text-muted-foreground</code></li>
        <li><code class="rounded bg-muted px-2 py-0.5">bg-card / text-card-foreground</code></li>
        <li><code class="rounded bg-muted px-2 py-0.5">border-border</code></li>
      </ul>
    </div>

    <div class="overflow-x-auto rounded-xl border border-border">
      <table class="min-w-full divide-y divide-border">
        <thead class="bg-secondary text-secondary-foreground">
          <tr>
            <th class="px-4 py-2 text-left text-sm font-medium">Name</th>
            <th class="px-4 py-2 text-left text-sm font-medium">Status</th>
            <th class="px-4 py-2 text-left text-sm font-medium">Score</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-border">
          <tr class="bg-background">
            <td class="px-4 py-2">Tailwind v4</td>
            <td class="px-4 py-2">
              <span class="inline-flex items-center gap-2 rounded-full border border-border bg-secondary text-secondary-foreground px-2 py-0.5">
                <span class="h-2 w-2 rounded-full bg-primary"></span> OK
              </span>
            </td>
            <td class="px-4 py-2">100</td>
          </tr>
          <tr class="bg-background">
            <td class="px-4 py-2">Dark Mode</td>
            <td class="px-4 py-2">
              <span class="inline-flex items-center gap-2 rounded-full border border-border bg-secondary text-secondary-foreground px-2 py-0.5">
                <span class="h-2 w-2 rounded-full bg-primary"></span> OK
              </span>
            </td>
            <td class="px-4 py-2">100</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
