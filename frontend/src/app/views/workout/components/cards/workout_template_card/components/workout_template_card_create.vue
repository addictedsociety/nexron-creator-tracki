<script setup lang="ts">
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogScrollContent,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible'

import workout_template_card_item from "./workout_template_card_item.vue"

import { ArrowDown, ArrowUp, Plus, ClipboardList } from 'lucide-vue-next'
import { ref } from "vue"

const isOpen = ref(false);

const dialogOpen = ref(false)
const confirmOpen = ref(false)

function onConfirm() {
    confirmOpen.value = false
    dialogOpen.value = false   // äußeren Dialog schließen
}
const togglePanel = () => (isOpen.value = !isOpen.value)

</script>
<template>
    <Dialog v-model:open="dialogOpen">
        <DialogTrigger as-child>
            <Button variant="default">
                <Plus class="w-4 h-4" />
            </Button>
        </DialogTrigger>

        <DialogScrollContent
            class="p-4 rounded-md max-w-[375px] sm:max-w-[100px] md:max-w-[720px] lg:max-w-[1250px] gap-2">

            <DialogHeader class="flex flex-col items-start">
                <DialogTitle>Neues Workout erstellen</DialogTitle>
                <DialogDescription class="text-left">
                    Lege ein neues Workout an, um deine Trainingseinheiten übersichtlich zu planen und zu speichern.
                </DialogDescription>
            </DialogHeader>

            <div class="flex flex-row items-center space-x-2">

                <div class="grid flex-1 gap-2">

                    <Input class="max-w-[250px]" id="name" placeholder="Workout-Name (z. B. Push Day )" />

                    <div class="flex flex-row gap-3 items-center">
                        <DialogClose as-child>
                            <Button class="min-w-[125px]" type="submit" variant="default">
                                Speicherns
                            </Button>
                        </DialogClose>

                        <AlertDialog v-model:open="confirmOpen">
                            <AlertDialogTrigger as-child>
                                <Button class="min-w-[125px]" type="button" variant="outline">
                                    Abbrechen
                                </Button>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Bist du sicher?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Nicht gespeicherte Änderungen gehen verloren.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter class="flex sm:flex-col lg:flex-row lg:justify-start gap-2">
                                    <AlertDialogCancel>Zurück</AlertDialogCancel>
                                    <AlertDialogAction @click="onConfirm">Trotzdem schließen</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>

                    <div class="border rounded-lg p-3 gap-2">
                        <Collapsible v-model:open="isOpen" class="w-full">
                            <!-- Header-Zeile -->
                            <div class="flex flex-row items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <ClipboardList />
                                    <h2 class="font-semibold">Übungen</h2>
                                </div>

                                <CollapsibleTrigger as-child>
                                    <Button class="h-9 w-9" type="button" variant="default">
                                        <ArrowUp class="transition-transform duration-200"
                                            :class="isOpen ? 'rotate-180' : ''" />
                                    </Button>
                                </CollapsibleTrigger>
                            </div>

                            <!-- Content über volle Breite -->
                            <CollapsibleContent class="flex flex-col mt-3 w-full rounded-lg space-y-3">

                                <workout_template_card_item />

                                <div class="flex justify-center">
                                    <Button class="min-w-[200px]" type="button" variant="default">
                                        Übung hinzufügen
                                    </Button>
                                </div>

                            </CollapsibleContent>

                            
                        </Collapsible>
                    </div>


                </div>
            </div>

            <DialogFooter class="flex flex-row items-center justify-start gap-5">
                <!-- lg:justify- entfernt -->
            </DialogFooter>

        </DialogScrollContent>
    </Dialog>
</template>
