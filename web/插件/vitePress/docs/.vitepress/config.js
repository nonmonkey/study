export default {
  base: process.env.NODE_ENV === 'production' ? '/docs/' : '/',

  title: 'vitePress',

  // 页签title
  titleTemplate: 'vitePress | :title',

  // 打包目录
  outDir: '../dist/docs',

  // 忽略所有死链
  ignoreDeadLinks: true,

  vite: {
    server: {
      port: 4000, // 端口
      strictPort: true // 强制使用指定端口
    }
  },

  // 禁用主题切换功能
  appearance: false,

  // 移除.html后缀
  // cleanUrls: true,

  // 重定向
  rewrites: {
    // 快速开始
    'markdown/start.md': 'start.md',

    // 简介
    'markdown/introduction.md': 'introduction.md',
  },

  themeConfig: {
    // 顶部菜单栏
    nav: [
      {
        text: '简介',
        link: '/introduction'
      },
    ],

    // 侧边栏
    sidebar: [
      {
        text: '快速开始',
        link: '/start'
      },
      {
        text: '简介',
        link: '/introduction'
      },
    ],

    // 启用全局搜索
    search: {
      provider: 'local',
      options: {
        placeholder: '搜索文档...'
      }
    },

    // 禁用下一页/上一页按钮
    docFooter: {
      prev: false,
      next: false
    }
  }
};
