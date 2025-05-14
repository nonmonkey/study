<template>
  <div id="app">
    <VerificationCode></VerificationCode>
  </div>
</template>

<script>
import axios from 'axios'
import md5 from 'md5'
import VerificationCode from 'vue-verify-pop'

// 获取e-sign-with
function getSignWith (time = new Date().getTime(), params) {
  let paramsStr = '&';
  if (params) {
    paramsStr = Object.keys(params)
      .sort()
      .reduce((prev, cur) => `${prev}${cur}=${params[cur]}&`, '&');
  }
  return md5(`${time}${paramsStr}epm@!;1qaz2wsx;`);
}

function setHeadersParam (config, key, value) {
  if (!config.headers) config.headers = {};
  if (key in config.headers) {
    if (!config.headers[key]) delete config.headers[key];
  } else {
    if (value) config.headers[key] = value;
  }
}

export default {
  name: 'App',
  components: {
    VerificationCode
  },
  data() {
    return {
      fileList: [],
      uploadForm: new FormData(),
            newIncreaseForm: {
        name: '',
        type: 'yarn',
        oozieHttpAddress: '',
        oozieUser: '',
        hdfsWorkDir: '',
        fileName: [],
      },
    }
  },
  methods: {
    btn() {
            this.$refs.upload.submit();
    },
    uploadFile(param) {
      this.uploadForm.append('files', param.file);
      this.uploadForm.append('name', '13131');
      this.uploadForm.append('type', 'yarn');
      console.log('113211331')
      const config = {
        method: 'post',
        url: '/resources/',
        data: this.uploadForm,
        baseURL: 'http://172.16.13.174:8000/api/bdcs'
      };


      const time = new Date().getTime();
      setHeadersParam(config, 'e-user-token', 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOiIxMDAxMzMiLCJ1c2VyTmFtZSI6ImJvbmMiLCJ0ZW5hbnRJZCI6ImJvbmMiLCJsb2dpbklkIjoiYm9uYyIsImlhdCI6MTY1MjI1NDE2NCwiZXhwIjoxNjUyMjkwMTY0fQ.YIaf5KbUqus7RO1CDpupdA1jjpbuRQ4HbIKDz_fUEf5pqoTWujBuLeCl3WmHsG5MCxlD8A_26JHPtTb1sprUww');
      setHeadersParam(config, 'e-sign-with', getSignWith(time, config.method.toLowerCase() === 'get' ? config.params : null));
      setHeadersParam(config, 'e-time-with', time);

      axios(config).then(res => {
        console.log('res;:::',res)
      })
      .catch(err => {
        console.log('err::', err)
      })
    },

    appendData(form, value) {
      for (const key in value) {
        if (key !== 'fileName' && Object.prototype.hasOwnProperty.call(value, key)) {
          console.log(key, value[key]);
          form.append(key, value[key]);
        }
      }
    },

    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    handleRemove(file) {
      if (this.newIncreaseDialog) {
        this.newIncreaseForm.fileName.splice(this.newIncreaseForm.fileName.findIndex(i => i === file.name), 1);
      } else {
        this.editForm.fileName.splice(this.editForm.fileName.findIndex(i => i === file.name), 1);
      }
    },

    handleChange(file) {
      if (file.status === 'ready') {
          this.newIncreaseForm.fileName.push(file.name);
      }
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
