import { watch } from 'vue';
import { useRouter } from 'vitepress';
import DefaultTheme from 'vitepress/theme';

export default {
  extends: DefaultTheme, // 继承默认主题

  setup () {
    const router = useRouter();

    watch(() => router.route.path, (newPath) => {
      // 发送路由变化到父窗口
      window.parent.postMessage(
        {
          type: 'vitepress-route-change',
          path: newPath
        },
        '*'
      );
    });
  }
};
