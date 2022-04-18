import * as vue from 'vue';
import App from './App.vue';


window.name = 123;

window.vue = vue;
vue.createApp(App).mount("#app");
