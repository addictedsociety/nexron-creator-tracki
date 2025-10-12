<script setup lang="ts">
import { computed, h, ref } from "vue"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { Calendar as CalendarIcon } from "lucide-vue-next"
import { Calendar } from "@/components/ui/calendar"            // ✅ UI-Calendar (nicht das Icon)
import { useForm } from "vee-validate"
import { toTypedSchema } from "@vee-validate/zod"
import { z } from "zod"
import { cn } from "@/utils"
import { CalendarDate, DateFormatter, getLocalTimeZone, parseDate, today } from "@internationalized/date"
import { toDate } from "reka-ui/date"

import { toast } from "vue-sonner"                              // ✅ sonner

const df = new DateFormatter("de-DE", { dateStyle: "long" })

const formSchema = toTypedSchema(z.object({
  dob: z.string().min(1, "Datum ist erforderlich."),
}))

const { handleSubmit, setFieldValue, values } = useForm({ validationSchema: formSchema })

const placeholder = ref<CalendarDate | undefined>(undefined)

const value = computed({
  get: () => (values.dob ? parseDate(values.dob) : undefined),
  set: v => v,
})

const onSubmit = handleSubmit((vals) => {
  toast("Gespeichert", {
    description: h("pre",
      { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
      h("code", { class: "text-white" }, JSON.stringify(vals, null, 2))
    )
  })
})

// Demo-Stats
const stats = ref({
  weeklyWorkouts: 4,
  totalWorkouts: 127,
  currentWeight: 85,
  targetWeight: 80
})
</script>

<template>
  <Card class="w-full shadow-lg shadow-indigo-500/20">
    <CardHeader>
      <CardTitle class="text-lg sm:text-xl flex items-center gap-2">
        <CalendarIcon class="h-5 w-5" />
        Workouts pro Woche
      </CardTitle>
    </CardHeader>

    <CardContent>
      <div class="flex flex-col w-full sm:w-1/2 mx-auto gap-6">
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div class="space-y-2">
            <div class="text-xl sm:text-2xl font-bold text-primary">{{ stats.weeklyWorkouts }}</div>
            <div class="text-xs text-muted-foreground">Diese Woche</div>
          </div>
          <div class="space-y-2">
            <div class="text-xl sm:text-2xl font-bold text-blue-600">{{ stats.totalWorkouts }}</div>
            <div class="text-xs text-muted-foreground">Gesamt</div>
          </div>
          <div class="space-y-2">
            <div class="text-xl sm:text-2xl font-bold text-green-600">7</div>
            <div class="text-xs text-muted-foreground">Ziel/Woche</div>
          </div>
          <div class="space-y-2">
            <div class="text-xl sm:text-2xl font-bold text-orange-600">3</div>
            <div class="text-xs text-muted-foreground">Streak</div>
          </div>
        </div>

        <div>
          <Popover>
            <PopoverTrigger as-child>
              <Button variant="outline">Training erledigt</Button>
            </PopoverTrigger>

            <PopoverContent class="w-60">
              <div class="grid w-full max-w-sm gap-2">
                <form class="space-y-8" @submit="onSubmit">   <!-- ✅ echtes </form> -->
                  <FormField name="dob">
                    <FormItem class="flex flex-col">
                      <FormLabel>Datum</FormLabel>

                      <Popover>
                        <PopoverTrigger as-child>
                          <FormControl>
                            <Button
                              variant="outline"
                              :class="cn('w-[240px] ps-3 text-start font-normal', !value && 'text-muted-foreground')"
                            >
                              <span>{{ value ? df.format(toDate(value)) : "Datum wählen" }}</span>
                              <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
                            </Button>
                            <input hidden>
                          </FormControl>
                        </PopoverTrigger>

                        <PopoverContent class="w-auto p-0">
                          <Calendar
                            v-model:placeholder="placeholder"
                            :model-value="value"
                            calendar-label="Workout-Datum"
                            initial-focus
                            :min-value="new CalendarDate(1900,1,1)"
                            :max-value="today(getLocalTimeZone())"
                            @update:model-value="(v) => {
                              setFieldValue('dob', v ? v.toString() : '')
                            }"
                          />
                        </PopoverContent>
                      </Popover>

                      <FormDescription>Wähle das Datum deines Workouts.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  </FormField>

                  <Button type="submit">Speichern</Button>
                </form>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
