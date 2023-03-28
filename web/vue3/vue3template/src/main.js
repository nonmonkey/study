import { createApp } from 'vue';
import App from './App.vue';
import store from '@/store';
import http from '@/request';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

window.http = http;
console.log('http:', http);

createApp(App)
  .use(store)
  .use(ElementPlus)
  .use(http)
  .mount('#app');
