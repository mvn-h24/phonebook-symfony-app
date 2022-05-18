import { createApp } from "vue";
import { createPinia } from "pinia";
import { initAxios } from "@api-client";
import App from "./app/App.vue";

initAxios();
createApp(App).use(createPinia()).mount("#app");
