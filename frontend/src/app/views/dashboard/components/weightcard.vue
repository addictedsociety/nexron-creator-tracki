<script setup lang="ts">

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from "@/components/ui/label";
import {
    NumberField,
    NumberFieldContent,
    NumberFieldDecrement,
    NumberFieldIncrement,
    NumberFieldInput,
} from '@/components/ui/number-field';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { Weight } from 'lucide-vue-next';
import { ref, watchEffect } from 'vue';
import weightChart from '@/app/views/dashboard/chart/weightChart.vue';



// Dashboard stats
const stats = ref({
    weeklyWorkouts: 4,
    totalWorkouts: 127,
    currentWeight: 85,
    targetWeight: 80
})
const progress = ref(13)
watchEffect((cleanupFn) => {
    const timer = setTimeout(() => progress.value = 66, 500)
    cleanupFn(() => clearTimeout(timer))
})


</script>
<template>
    <Card class="w-full border-primary shadow-lg shadow-indigo-500/50">
        <CardHeader>
            <CardTitle class="text-lg sm:text-xl flex items-center gap-2">
                <Weight class="h-5 w-5" />
                Gewichtsverlauf
            </CardTitle>
        </CardHeader>

        <CardContent>
            <div class="flex flex-col w-full sm:w-1/2 mx-auto items-center justify-center space-y-6">
                <weightChart />
                <div class="w-full grid grid-cols-2 gap-4 text-center">
                    <div class="space-y-1 text-left">
                        <div class="text-2xl sm:text-3xl font-bold text-primary">
                            {{ stats.currentWeight }}kg
                        </div>
                        <div class="text-xs sm:text-sm text-muted-foreground">Aktuell</div>
                    </div>
                    <div class="space-y-1 text-right">
                        <div class="text-2xl sm:text-3xl font-bold text-green-600">
                            {{ stats.targetWeight }}kg
                        </div>
                        <div class="text-xs sm:text-sm text-muted-foreground">Ziel</div>
                    </div>
                </div>
                <Progress :model-value="progress" class="w-full" />
            
                <div class="flex flex-row gap-3">
                    <Popover>
                        <PopoverTrigger as-child>
                            <Button variant="outline">
                                Gewicht ändern
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent class="w-60">
                            <div class="grid w-full max-w-sm gap-2">
                                <Label for="weight">Gewicht</Label>

                                <NumberField id="weight" v-model="stats.currentWeight" :min="0" :step="0.1" :format-options="{
                                    style: 'unit',
                                    unit: 'kilogram',
                                    unitDisplay: 'narrow',
                                    minimumFractionDigits: 1,
                                    maximumFractionDigits: 1
                                }">
                                    <NumberFieldContent>
                                        <NumberFieldDecrement />
                                        <NumberFieldInput />
                                        <NumberFieldIncrement />
                                    </NumberFieldContent>
                                </NumberField>
                            </div>
                        </PopoverContent>
                    </Popover>
                    <Popover>
                        <PopoverTrigger as-child>
                            <Button variant="outline">
                                Zielgewicht ändern
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent class="w-60">
                            <div class="grid w-full max-w-sm gap-2">
                                <Label for="weight">Gewicht</Label>

                                <NumberField id="weight" v-model="stats.targetWeight" :min="0" :step="0.1" :format-options="{
                                    style: 'unit',
                                    unit: 'kilogram',
                                    unitDisplay: 'narrow',
                                    minimumFractionDigits: 1,
                                    maximumFractionDigits: 1
                                }">
                                    <NumberFieldContent>
                                        <NumberFieldDecrement />
                                        <NumberFieldInput />
                                        <NumberFieldIncrement />
                                    </NumberFieldContent>
                                </NumberField>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </CardContent>
    </Card>
</template>

