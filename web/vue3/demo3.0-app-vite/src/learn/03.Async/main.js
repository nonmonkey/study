import { createApp } from 'vue';
import * as Vue from 'vue';
import App from './App.vue';
import Router from './router';

window.Vue = Vue;

const app = createApp(App);
app.use(Router).mount('#app');
