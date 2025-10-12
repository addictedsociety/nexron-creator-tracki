<!-- src/components/Library/TemplatesHeader.vue -->
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Plus, Folder, MoreHorizontal, Copy, Edit, Trash2, Download,LayoutPanelTop  } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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
    <Card class="w-full border-primary shadow-lg shadow-indigo-500/20">

        <CardHeader>
            <CardTitle class="text-lg sm:text-xl flex items-center gap-2">
                <LayoutPanelTop class="h-5 w-5" />
                Template's
            </CardTitle>
        </CardHeader>
        <CardContent>
                <div class="flex items-center gap-2">
                    <!-- + Template -->
                    <Button class="h-9" @click="emit('create-template')">
                        <Plus class="w-4 h-4 mr-2" />
                        Template
                    </Button>

                    <!-- Neuer Ordner -->
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <Button variant="secondary" class="h-9 w-9 p-0 grid place-items-center"
                                    aria-label="Neuer Ordner" @click="emit('create-folder')">
                                    <Folder class="w-4 h-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Neuer Ordner</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <!-- Kebab-Menü -->
                    <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                            <Button variant="secondary" class="h-9 w-9 p-0 grid place-items-center"
                                aria-label="Weitere Aktionen">
                                <MoreHorizontal class="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" class="w-44">
                            <DropdownMenuItem @click="emit('rename')">
                                <Edit class="w-4 h-4 mr-2" /> Umbenennen
                            </DropdownMenuItem>
                            <DropdownMenuItem @click="emit('duplicate')">
                                <Copy class="w-4 h-4 mr-2" /> Duplizieren
                            </DropdownMenuItem>
                            <DropdownMenuItem @click="emit('export')">
                                <Download class="w-4 h-4 mr-2" /> Exportieren
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem class="text-destructive" @click="emit('delete')">
                                <Trash2 class="w-4 h-4 mr-2" /> Löschen
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
        </CardContent>
    </Card>

</template>
