<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Collapsible,
    CollapsibleContent
} from '@/components/ui/collapsible'
import { Input } from "@/components/ui/input"
import { ArrowUp, ChartArea, CircleCheck, Plus, StickyNote, Trash } from "lucide-vue-next"
import { ref } from "vue"


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
    <div class="flex flex-col items-center rounded-md border border-border p-2">
        <div class="flex w-full items-center justify-between gap-2">
            <!-- Titel als Button -->
            <div class="flex items-center gap-2 flex-1 text-left rounded-md p-1.5 hover:bg-muted focus:outline-none focus:ring-2">
                <StickyNote />
                <h2 class="font-semibold">{{ setName }}</h2>
            </div>

            <!-- Rechte Aktionen (stoppt Toggle) -->
            <div class="flex flex-row gap-1.5">
                <Button class="h-8 w-8" type="button" variant="default" >
                    <Trash />
                </Button>

                <Button class="h-8 w-8" type="button" variant="default">
                    <ChartArea />
                </Button>

                <Button class="h-8 w-8" type="button" variant="default" @click.stop="togglePanel">
                    <ArrowUp class="transition-transform duration-200" :class="isOpen ? 'rotate-180' : ''" />
                </Button>
            </div>
        </div>



        <Collapsible v-model:open="isOpen" class="w-full">

            <CollapsibleContent class="rounded-lg space-y-3">
                <!-- Unterer Teil -->
                <div v-if="isOpen" class="mt-3 rounded-md border p-3 space-y-3">
                    <!-- Tabellen Header -->
                    <div class="flex flex-col justify-center rounded-xl bg-background/30 space-y-2 p-2">
                        <!-- Header -->
                        <div class="grid items-center text-xs sm:text-sm text-muted-foreground gap-x-2 px-1
                            [grid-template-columns:10%_30%_20%_20%_10%]
                            sm:[grid-template-columns:8%_32%_20%_20%_15%]">
                            <div class="text-start">Set</div>
                            <div class="text-center">Vorherige</div>
                            <div class="text-center">+kg</div>
                            <div class="text-center">Wiederh.</div>
                            <div class="justify-self-end">
                                <CircleCheck class="h-5 w-5" />
                            </div>
                        </div>

                        <!-- Trennlinie -->
                        <div class="h-px w-full bg-border"></div>

                        <!-- Row -->
                        <div class="grid items-center gap-x-2 px-1 py-2
                            [grid-template-columns:10%_30%_20%_20%_10%]
                            sm:[grid-template-columns:8%_32%_20%_20%_15%]">
                            <!-- Set -->
                            <div class="h-9 w-9 flex items-center justify-center rounded-md bg-muted text-foreground">1
                            </div>

                            <!-- Vorherige -->
                            <div class="text-center text-muted-foreground">
                                —
                            </div>

                            <!-- +kg -->
                            <div class="min-w-0">
                                <Input class="h-9 w-full text-center" type="text" placeholder="kg" />
                            </div>

                            <!-- Wiederh. -->
                            <div class="min-w-0">
                                <Input class="h-9 w-full text-center" type="text" placeholder="x" />
                            </div>

                            <!-- Done -->
                            <div class="flex justify-end">
                                <Checkbox class="h-6 w-6" />
                            </div>
                        </div>

                        <!-- Add Button -->
                        <div class="flex items-center gap-2">

                            <div class="h-[1px] flex-1 bg-gray-400"></div>
                            <Input class="flex-1 text-center" type="text" placeholder="2:00" />
                            <div class="h-[1px] flex-1 bg-gray-400"></div>
                        </div>

                        <div class="flex flex-row items-center justify-center p-1">
                            <Button variant="secondary" class="lg:w-1/2 w-full">
                                <Plus class="h-4 w-4 mr-2" /> Satz hinzufügen
                            </Button>
                        </div>
                    </div>
                </div>
            </CollapsibleContent>

        </Collapsible>
    </div>
</template>
