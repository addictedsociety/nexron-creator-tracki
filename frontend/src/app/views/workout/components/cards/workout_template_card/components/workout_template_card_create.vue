<script setup lang="ts">
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogScrollContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
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

import { Plus, ArrowDown, ArrowUp } from 'lucide-vue-next'
import { onMounted, ref } from "vue"

const isOpen = ref(false);

const dialogOpen = ref(false)
const confirmOpen = ref(false)

function onConfirm() {
  confirmOpen.value = false
  dialogOpen.value = false   // äußeren Dialog schließen
}

</script>
<template>
    <Dialog v-model:open="dialogOpen">
        <DialogTrigger as-child>
            <Button variant="default">
                <Plus class="w-4 h-4" />
            </Button>
        </DialogTrigger>

        <DialogScrollContent class="rounded-md max-w-[375px] sm:max-w-[100px] md:max-w-[720px] lg:max-w-[1250px]">

            <DialogHeader class="flex flex-col items-start">
                <DialogTitle>Neues Workout erstellen</DialogTitle>
                <DialogDescription class="text-left">
                    Lege ein neues Workout an, um deine Trainingseinheiten übersichtlich zu planen und zu speichern.
                </DialogDescription>
            </DialogHeader>

            <div class="flex flex-row items-center space-x-2">
                <div class="grid flex-1 gap-2">
                    <Input id="name" placeholder="Workout-Name (z. B. Push Day, Ganzkörper …)" />

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

                        <Button class="ml-auto" type="button" variant="default">
                            <ArrowUp />
                        </Button>

                    </div>
                </div>
            </div>

            <DialogFooter class="flex flex-row items-center justify-start gap-5 lg:justify-">

            </DialogFooter>

        </DialogScrollContent>
    </Dialog>
</template>
