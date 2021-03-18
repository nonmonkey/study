import { createApp } from 'vue';
import * as Vue from 'vue';
import App from './App.vue';
import Router from './router';
import options from './store';
import { createStore } from '/src/learn/06.数据共享/myVuex/index.js';
import { createStore as create, createLogger } from 'vuex';

window.Vue = Vue;

var myStore = createStore(options);

const store = create(options);
console.log('store:', (window.s = store));

const app = createApp(App);
app.use(Router).use(store).mount('#app');

// myStore.dispatch('loginUser/whoAmI');

console.log('myStore:', (window.myStore = myStore));
