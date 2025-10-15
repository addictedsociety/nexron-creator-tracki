<!-- src/components/Library/TemplatesHeader.vue -->
<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dumbbell } from 'lucide-vue-next';

import workout_template_card_create from './components/workout_template_card_create.vue';

// Emits für Aktionen (optional)
const emit = defineEmits<{
    (e: 'create-template'): void
    (e: 'create-folder'): void
    (e: 'rename'): void
    (e: 'duplicate'): void
    (e: 'export'): void
    (e: 'delete'): void
}>()
</script>

<template>
    <Card class="w-full border-primary shadow-lg shadow-indigo-500/20 gap-1">

        <CardHeader>
            <CardTitle class="text-lg sm:text-xl flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <Dumbbell class="h-5 w-5" />
                    Workout-Vorlagen
                </div>
                
                <workout_template_card_create/>

            </CardTitle>
        </CardHeader>

        <CardContent class="px-0.5">

            <CardContent>
                <div v-if="!folders || folders.length === 0"
                    class="flex items-center justify-center h-32 rounded-lg border border-border text-muted-foreground">
                    Keine Ordner vorhanden
                </div>

                <div v-else class="grid gap-3">

                </div>
            </CardContent>

        </CardContent>
    </Card>

</template>
