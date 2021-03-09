export default {
  proxy: {
    '/api': {
      target: 'http://192.168.199.162:3000',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
};
