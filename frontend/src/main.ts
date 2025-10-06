import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import { clerkPlugin } from '@clerk/vue'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}



createApp(App)
  .use(router)                          // ⬅️ ohne das ist route undefined
  .use(clerkPlugin, { publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY })
  .mount('#app')
