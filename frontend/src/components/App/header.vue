<script setup lang="ts">



import {
    Dumbbell,
    SquareChartGantt
} from "lucide-vue-next";

import { computed } from "vue";
import { useRoute } from "vue-router";

import logo from "@/assets/tracki_logo_lg.svg";

import UserAcc from "./UserAcc.vue";


const route = useRoute();


const isActive = (p: string) => computed(() => route.path === p);
</script>
<template>
    <header
        class="border-b border-border rounded-lg shadow-lg shadow-indigo-500/50 sticky top-0 z-40 bg-background/60 backdrop-blur">
        <div class="mx-auto sm:w-3/4 px-4 sm:px-6 py-2 flex items-center justify-between gap-4">

            <RouterLink to="/" class="flex items-center gap-2 shrink-0">
                <img :src="logo" alt="Tracki" class="h-8 w-auto sm:h-10" />
            </RouterLink>

            <nav class="flex items-center gap-2 overflow-x-auto snap-x snap-mandatory -mx-2 px-2 py-1 scrollbar-none">

                <RouterLink to="/"
                    class="w-11 h-11 grid place-items-center rounded-xl bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 snap-start aria-[current=page]:ring-2 aria-[current=page]:ring-accent"
                    :aria-current="isActive('/').value ? 'page' : undefined">
                    <SquareChartGantt class="h-5 w-5 text-current" />
                </RouterLink>

                <RouterLink to="/workout"
                    class="w-11 h-11 grid place-items-center rounded-xl bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 snap-start aria-[current=page]:ring-2 aria-[current=page]:ring-accent"
                    :aria-current="isActive('/workout').value ? 'page' : undefined">
                    <Dumbbell class="h-5 w-5 text-current" />
                </RouterLink>

                 <UserAcc/>

            </nav>

        </div>
    </header>
</template>