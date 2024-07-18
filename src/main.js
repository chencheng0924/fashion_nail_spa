import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import dayjs from "dayjs";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./assets/reset.css";
import Vue3Lottie from "vue3-lottie";
import "vue3-lottie/dist/style.css";
import "./assets/font.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(dayjs);
app.use(ElementPlus);
app.use(Vue3Lottie);

app.mount("#app");
