<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { ArrowUp, StickyNote, Play, Pause, Plus, Trash } from "lucide-vue-next"
import { ref } from "vue"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible'

const isOpen = ref(false)
const togglePanel = () => (isOpen.value = !isOpen.value)

const setName = "ÜbungsNameTest"

type SetRow = {
    id: number
    reps: number | null
    kg: number | null
    restSec: number           // gewünschte Pause (Sekunden)
    remain: number            // verbleibende Sekunden
    running: boolean
    _timer?: number | null
}

const sets = ref<SetRow[]>([
    { id: 1, reps: null, kg: null, restSec: 120, remain: 120, running: false, _timer: null },
])

const addSet = () => {
    const id = (sets.value.at(-1)?.id ?? 0) + 1
    sets.value.push({ id, reps: null, kg: null, restSec: 120, remain: 120, running: false, _timer: null })
}

const removeSet = (id: number) => {
    const s = sets.value.find(x => x.id === id)
    if (s?._timer) clearInterval(s._timer)
    sets.value = sets.value.filter(s => s.id !== id)
}

const fmt = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0")
    const sec = Math.floor(s % 60).toString().padStart(2, "0")
    return `${m}:${sec}`
}

const startTimer = (row: SetRow) => {
    if (row.running) return
    row.running = true
    row._timer = window.setInterval(() => {
        row.remain = Math.max(0, row.remain - 1)
        if (row.remain === 0) stopTimer(row)
    }, 1000)
}

const stopTimer = (row: SetRow) => {
    row.running = false
    if (row._timer) clearInterval(row._timer)
    row._timer = null
}

const resetTimer = (row: SetRow) => {
    stopTimer(row)
    row.remain = row.restSec
}
</script>

<template>
    <!-- Header -->
    <div class="flex flex-col items-center rounded-md border p-1.5">
        <div class="flex flex-row w-full justify-between items-center gap-2">
            <div class="flex flex-row items-center gap-2">
                <StickyNote />
                <h2 class="font-semibold">{{ setName }}</h2>
            </div>
            <div fl>
                <Button class="h-8 w-8" type="button" variant="default" @click="togglePanel">
                    <ArrowUp class="transition-transform duration-200" :class="isOpen ? 'rotate-180' : ''" />
                </Button>
            </div>
        </div>


        <Collapsible v-model:open="isOpen" class="w-full">

            <CollapsibleContent class="rounded-lg space-y-3">
                <!-- Unterer Teil -->
                <div v-if="isOpen" class="mt-3 rounded-md border p-3 space-y-3">
                    <div v-for="row in sets" :key="row.id"
                        class="rounded-lg border p-3 grid grid-cols-12 gap-2 items-center">
                        <!-- Set-Nr -->
                        <div class="col-span-2 text-sm font-medium">Set {{ row.id }}</div>

                        <!-- kg -->
                        <div class="col-span-3 flex items-center gap-2">
                            <label class="text-sm opacity-70 whitespace-nowrap">+kg</label>
                            <input type="number" class="w-full rounded-md border px-2 py-1 text-sm"
                                v-model.number="row.kg" placeholder="Gewicht" min="0" />
                        </div>

                        <!-- Wiederholungen -->
                        <div class="col-span-3 flex items-center gap-2">
                            <label class="text-sm opacity-70">Wiederholung</label>
                            <input type="number" class="w-full rounded-md border px-2 py-1 text-sm"
                                v-model.number="row.reps" placeholder="Reps" min="0" />
                        </div>

                        <!-- Timer -->
                        <div class="col-span-3 flex items-center gap-2">
                            <input type="number" class="w-20 rounded-md border px-2 py-1 text-sm"
                                v-model.number="row.restSec" min="0" @change="row.remain = row.restSec"
                                title="Pause (Sek.)" />
                            <div class="text-sm tabular-nums w-16 text-center">{{ fmt(row.remain) }}</div>

                            <Button size="icon" variant="outline" class="h-8 w-8"
                                @click="row.running ? stopTimer(row) : startTimer(row)">
                                <component :is="row.running ? Pause : Play" class="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="outline" class="h-8 w-8" @click="resetTimer(row)">↺</Button>
                        </div>

                        <!-- Entfernen -->
                        <div class="col-span-1 flex justify-end">
                            <Button size="icon" variant="ghost" class="h-8 w-8" @click="removeSet(row.id)">
                                <Trash class="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div class="pt-1">
                        <Button variant="secondary" class="w-full sm:w-auto" @click="addSet">
                            <Plus class="h-4 w-4 mr-2" /> Übung hinzufügen
                        </Button>
                    </div>
                </div>
            </CollapsibleContent>

        </Collapsible>
    </div>


</template>
