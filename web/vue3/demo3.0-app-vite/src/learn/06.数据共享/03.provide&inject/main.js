import { createApp } from 'vue';
import App from './App.vue';
import * as Vue from 'vue';
import router from './router';
import provideStore from './store';

window.Vue = Vue;

const app = createApp(App).provide('bar', 'bar123').use(router);
provideStore(app); // 提供所有共享数据
app.mount('#app');
console.log('app:', app);
