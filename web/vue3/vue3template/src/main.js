import { createApp } from 'vue';
import App from './App.vue';
import store from '@/store';
import http from '@/request';

window.http = http;
console.log('http:', http);

createApp(App)
  .use(store)
  .use(http)
  .mount('#app');
