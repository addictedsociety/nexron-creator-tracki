import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./app/styles/style.css";
import "./app/styles/debug.css"; // Debug styles, can be removed later
import { clerkPlugin } from "@clerk/vue";
import { dark } from "@clerk/themes";

import { registerSW } from 'virtual:pwa-register' 
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

registerSW({ immediate: true })

createApp(App)
  .use(router)
  .use(clerkPlugin, {
    publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
    appearance: {
      baseTheme: dark,
    },
  })
  .mount("#app");
