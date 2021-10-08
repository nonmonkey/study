import './styles/index.css';
import { createApp } from 'vue';
import * as Vue from 'vue';
import App from './App.vue';

window.Vue = Vue;

const app = createApp(App);
app.mount('#app');
