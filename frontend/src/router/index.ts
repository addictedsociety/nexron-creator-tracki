// src/router.ts
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/sign-in', component: () => import('@/views/SignInPage.vue') },
  { path: '/', component: () => import('@/views/Dashboard.vue') },
  { path: '/workout', component: () => import('@/views/Workout.vue') },]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
