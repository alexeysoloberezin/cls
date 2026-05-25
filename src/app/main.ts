import { createApp } from "vue";
import "@app/styles/fontManrope.css"
import "@app/styles/style.css";
import "@app/styles/fonts.scss";

import App from "@app/App.vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import queryClient from "@shared/api/utils/vueQueryInstance";
import router from "@app/router/index";
import { createPinia } from "pinia";
import Tooltip from "primevue/tooltip";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import VueApexCharts from "vue3-apexcharts";
import { MotionPlugin } from '@vueuse/motion'
import { MazUi } from 'maz-ui/plugins/maz-ui'
import { definePreset } from '@maz-ui/themes'
import PrimeVue from 'primevue/config';
import Aura from "@primeuix/themes/aura";
import { ToastPlugin, type ToastOptions } from 'maz-ui/plugins/toast'

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);


const toastOptions: ToastOptions  = {
  position: 'bottom-right',
  timeout: 7_000,
  persistent: false,
}

app.use(MotionPlugin)

const customTheme = await definePreset({ 
  base: 'maz-ui',
  overrides: {
    name: 'maz-ui',
    foundation: {
      "base-font-size": '14px',
      "radius": '0.7rem',
      "border-width": '0.0625rem'
    },
    colors: {
      light: {
        "background": '0 0% 100%',
        "foreground": '210 8% 14%',
        "primary": '210 100% 56%',
        "primary-foreground": '0 0% 100%',
        "secondary": '272 99% 54%',
        "secondary-foreground": '0 0% 100%',
        "accent": '164 76% 46%',
        "accent-foreground": '0 0% 100%',
        "success": '80 61% 50%',
        "success-foreground": '210 8% 14%',
        "warning": '40 97% 59%',
        "warning-foreground": '210 8% 14%',
        "destructive": '356.95 95.91% 57.73%',
        "destructive-foreground": '0 0% 100%',
        "info": '188 78% 41%',
        "info-foreground": '0 0% 100%',
        "contrast": '235 16% 15%',
        "contrast-foreground": '255 0% 95%',
        "border": '220 13.04% 90.98%',
        "overlay": '0 0% 40%',
        "muted": '0 0% 54%',
        "shadow": '240 5.9% 10%'
      },
      dark: {
        "background": '250 8% 15%',
        "foreground": '0 0% 85%',
        "primary": '229 100% 56%',
        "primary-foreground": '0 0% 100%',
        "secondary": '272 99% 54%',
        "secondary-foreground": '0 0% 100%',
        "accent": '164 76% 46%',
        "accent-foreground": '0 0% 100%',
        "success": '122 64% 40%',
        "success-foreground": '210 8% 14%',
        "warning": '25 100% 51%',
        "warning-foreground": '210 8% 14%',
        "destructive": '0 93% 30%',
        "destructive-foreground": '0 0% 100%',
        "info": '193 100% 50%',
        "info-foreground": '0 0% 100%',
        "contrast": '0 0% 100%',
        "contrast-foreground": '210 8% 14%',
        "muted": '255 0% 54%',
       "border": '238 17% 18%',
        "overlay": '0 0% 15%',
        "shadow": '240 3.7% 15.9%'
      }
    }
  }
})

app.use(MazUi, {
  theme: {
    preset: customTheme
  }
})  

app.use(VueApexCharts);
app
  .use(router)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: ".dark-theme",
      },
    },
  })
  .use(ToastPlugin, toastOptions)
  .use(VueQueryPlugin, { queryClient })
  .use(pinia)
  .directive("tooltip", Tooltip)
  .mount("#app");
