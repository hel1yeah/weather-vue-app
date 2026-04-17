import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';

import VueApexCharts from 'vue3-apexcharts';

import '@/assets/scss/main.scss';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(VueApexCharts);

app.mount('#app');
