<script setup lang="ts">
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton
} from "@clerk/vue";

import { Button } from "@/components/ui/button";


import {
    Dumbbell,
    Moon,
    SquareChartGantt,
    Sun,
    UserRound,
    LogIn,
    User,
    Palette
} from "lucide-vue-next";

import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import logo from "@/assets/tracki_logo_lg.svg";

import UserDialog from "./UserDialog.vue";

const route = useRoute();

const isDark = ref(false);
onMounted(() => {
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const stored = localStorage.getItem("theme");
    isDark.value = stored ? stored === "dark" : prefers;
    document.documentElement.classList.toggle("dark", isDark.value);
});
function toggleTheme() {
    isDark.value = !isDark.value;
    document.documentElement.classList.toggle("dark", isDark.value);
    localStorage.setItem("theme", isDark.value ? "dark" : "light");
}

const isActive = (p: string) => computed(() => route.path === p);
</script>
<template>
    <header
        class="border-b border-border rounded-lg shadow-lg shadow-indigo-500/50 sticky top-0 z-40 bg-background/60 backdrop-blur">
        <div class="mx-auto max-w-6xl px-4 sm:px-6 py-2 flex items-center justify-between gap-4">
            <!-- Logo -->
            <RouterLink to="/" class="flex items-center gap-2 shrink-0">
                <img :src="logo" alt="Tracki" class="h-8 w-auto sm:h-10" />
            </RouterLink>

            <nav class="flex items-center gap-2 overflow-x-auto snap-x snap-mandatory -mx-2 px-2 py-1 scrollbar-none">
                <!-- Button Base-Klasse: gleicht Größe & Verhalten an -->
                <!-- w-11 h-11 = 44px touch; grid center; rounded-xl; transition -->
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

                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button class="w-11 h-11 grid place-items-center rounded-xl 
                        bg-secondary text-secondary-foreground 
                        hover:bg-accent hover:text-accent-foreground 
                        hover:scale-110 transition-all duration-200 
                        aria-[expanded=true]:ring-2 aria-[expanded=true]:ring-accent p-0" aria-expanded="false">
                            <UserRound class="h-5 w-5 text-current" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" class="min-w-56">
                        <DropdownMenuLabel>Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <SignedOut>
                            <DropdownMenuItem as-child>
                                <SignInButton mode="modal">
                                    <button class="w-full flex items-center gap-2 text-left">
                                        <LogIn class="h-4 w-4 text-muted-foreground" />
                                        <span>Sign in</span>
                                    </button>
                                </SignInButton>
                            </DropdownMenuItem>
                        </SignedOut>

                        <SignedIn>
                            <DropdownMenuItem class="flex items-center justify-between gap-2">
                                <div class="flex items-center gap-2">
                                    <User class="h-4 w-4 text-muted-foreground" />
                                    <span>Profil</span>
                                </div>
                                <UserDialog />
                            </DropdownMenuItem>
                        </SignedIn>

                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Darstellung</DropdownMenuLabel>
                        <DropdownMenuItem class="flex items-center justify-between gap-2" @click="toggleTheme">
                            <div class="flex items-center gap-2">
                                <Palette class="h-4 w-4 text-muted-foreground" />
                                <span>{{ isDark ? "Dark Mode" : "Light Mode" }}</span>
                            </div>
                            <component :is="isDark ? Moon : Sun" class="h-4 w-4 text-current" />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </nav>
        </div>
    </header>
</template>