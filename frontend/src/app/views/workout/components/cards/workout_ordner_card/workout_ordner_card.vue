<!-- src/components/Library/TemplatesHeader.vue -->
<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Folder } from 'lucide-vue-next';

import workout_ordner_card_create from './components/workout_ordner_card_create.vue';

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
          <Folder class="h-5 w-5" />
          Ordner
        </div>

        <workout_ordner_card_create />


      </CardTitle>
    </CardHeader>


    <CardContent class="px-0.5">

      <CardContent>
        <div class="w-full flex items-center justify-center h-32 rounded-lg border border-border text-muted-foreground">
          <div v-if="!folders || folders.length === 0">
            Keine Ordner vorhanden
          </div>

          <div v-else class="grid gap-3">

          </div>
        </div>
      </CardContent>
    </CardContent>

  </Card>

</template>
<!-- <script setup lang="ts">
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">
        Edit Profile
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right">
            Name
          </Label>
          <Input id="name" value="Pedro Duarte" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="username" class="text-right">
            Username
          </Label>
          <Input id="username" value="@peduarte" class="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">
          Save changes
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template> -->