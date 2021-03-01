
import Nprogress from '/src/components/Nprogress';
import LoadingComponent from '../components/Loading.vue';
import ErrorComponent from '../components/Error.vue';

import { h, defineAsyncComponent } from 'vue';

export function delay(duration) {
  duration = duration || random(500, 2000);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// 生成异步组件
export function getAsyncComponent(path) {
  return defineAsyncComponent({
    loader: async () => {
      await delay();
      if (Math.random() < .5) {
        return import(path);
      } else {
        throw new Error();
      }
    },
    loadingComponent: LoadingComponent, // 当promise在pending状态时，将显示这里的组件
    errorComponent: {
      render() {
        return h(ErrorComponent, '出错了');
      },
    },
  });
}

// 生成异步页面
export function getAsyncPage(path) {
  return defineAsyncComponent({
    loader: async () => {
      Nprogress.start();
      await delay();
      Nprogress.done();
      return import(path);
    },
    loadingComponent: LoadingComponent, // 当promise在pending状态时，将显示这里的组件
    errorComponent: {
      render() {
        return h(ErrorComponent, '出错了');
      },
    },
  });
}
