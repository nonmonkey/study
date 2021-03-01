import { createRouter, createWebHashHistory } from 'vue-router';

// import AsyncRoutes from '../learn/03.Async/router';
import vuexLoginRoutes from '../learn/06.数据共享/01.vuex/router';

const routes = [
  // src/learn/03.Async
  // ...AsyncRoutes,
  // src/learn/06.数据共享/01.vuex
  ...vuexLoginRoutes,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
