<script setup lang="ts">
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Plus } from 'lucide-vue-next'

</script>

<template>
    <Dialog>
        <DialogTrigger as-child>
            <Button variant="default">
                <Plus class="w-4 h-4" />
            </Button>
        </DialogTrigger>

        <DialogContent class=" rounded-md max-w-[375px] sm:max-w-[100px] md:max-w-[720px] lg:max-w-[1250px]">

            <DialogHeader class="flex flex-col items-start">
                <DialogTitle>Neuen Ordner erstellen</DialogTitle>
                <DialogDescription class="text-left">
                    Erstelle einen Ordner, um deine Workouts zu sortieren.
                </DialogDescription>
            </DialogHeader>

            <div class="flex flex-row items-center space-x-2">
                <div class="grid flex-1 gap-2">
                    <Input id="name" placeholder="Gib einen Namen ein" />
                    <p class="font-bold text-sm text-gray-700">Beschreibe deinen Ordner</p>
                    <Input id="beschreibung" placeholder="Was ist der Inhalt davon?" />
                </div>
            </div>

            <DialogFooter class="flex flex-row items-center justify-center gap-5 sm:justify-center">
                <DialogClose as-child>
                    <Button class="min-w-[125px]" type="button" variant="default">
                        Speicher
                    </Button>
                </DialogClose>
                <DialogClose as-child>
                    <Button class="min-w-[125px]" type="button" variant="default">
                        Abbrechen
                    </Button>
                </DialogClose>

            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>