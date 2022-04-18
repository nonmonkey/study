/**
 * 设置配置
 * @param {*} axios
 */
export function setDefaults (axios) {
  axios.defaults.timeout = 10_000;
  axios.defaults.validateStatus = function (status) {
    if (status === 401) {
      console.log('status === 401', status);
    } else if (status >= 400 && status < 500) {
      console.log('status >= 400 && status < 500', status);
    } else if (status >= 500) {
      console.log('status >= 500', status);
    } else {
      console.log('status < 400', status);
    }
    return status;
  };
}

/**
 * 设置拦截器
 * @param {*} axios
 */
export function setInterceptors (axios) {
  axios.interceptors.request.use(
    (config) => {
      // const sIdCookie = cookies.get('sessionId')
      // const sessionId = sessionStorage.getItem('sessionId')
      // const requstUrl = config.url.substring(config.url.lastIndexOf('/') + 1)
      // if ((!sIdCookie || (sessionId && sessionId !== sIdCookie)) && requstUrl !== 'login') {
      //   window.location.href = `${PUBLIC_PATH}/view/login/index.html`
      // } else {
      //   const { method } = config
      //   if (method === 'get') {
      //     config.params = Object.assign({}, config.params, {
      //       _t: Math.random()
      //     })
      //   }
      //   config.headers = config.headers || {}
      //   const language = cookies.get('language')
      //   if (language) config.headers.language = language
      //   if (sIdCookie) config.headers.sessionId = sIdCookie
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return Promise.resolve(response);
    },

    (error) => {
      return Promise.reject(error);
    }
  );
}
