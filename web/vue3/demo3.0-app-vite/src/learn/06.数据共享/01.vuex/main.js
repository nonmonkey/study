import { createApp } from 'vue';
import * as Vue from 'vue';
import App from './App.vue';
import Router from './router';
import Store from './store';
import { whoAmI } from './store/useLoginUser';

window.Vue = Vue;

const app = createApp(App);
app.use(Router).use(Store).mount('#app');

store.dispatch('loginUser/whoAmI');
