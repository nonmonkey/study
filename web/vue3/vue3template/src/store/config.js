import { defineStore } from 'pinia';

export default defineStore('config', {
  state: () => {
    return {
      baseURL: {},
      title: ''
    };
  },
  actions: {
    setConfig () {
      if (window.static_global_config) {
        const config = window.static_global_config;
        this.baseURL = config.baseURL;
        this.title = config.title;
        // window.static_global_config = null;
      }
    }
  }
});
