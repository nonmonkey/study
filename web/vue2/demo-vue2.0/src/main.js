import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
import ElementUI from 'element-ui';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'; // lang i18n

window.Vue = Vue;
Vue.use(ElementUI, { zhLocale });
new Vue({
  render: h => h(App),
}).$mount('#app')
