<template>
  <div id="duhe">
    <el-upload
      ref="uploadRef"
      class="upload-demo"
      action=""
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :file-list="fileList"
      :http-request="uploadFile"
      :auto-upload="false"
      :on-change="handleChange"
      accept=".xml,.yaml"
      :multiple="true">
      <template #trigger>
        <el-button size="small" type="primary">
          选取文件
        </el-button>
      </template>
      <template #tip>
        <div class="el-upload__tip">
          支持hadoop、flink 配置文件的上传
        </div>
      </template>
    </el-upload>

    <el-button @click="btn">
      负荷为华为
    </el-button>
  </div>
</template>

<script setup>
/* eslint-disable max-len */
import axios from 'axios';
import { ref } from 'vue';
import md5 from 'md5';

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

// upload组件方法
const formRef = ref();
const uploadRef = ref();
const uploadForm = new FormData();
const formData = ref({});
const fileList = ref([]);
const beforeRemove = (file) => {
  // return ElConfirm(`确定移除 ${file.name}？`);
};
const handleRemove = (file) => {
  formData.value.fileName.splice(formData.value.fileName.findIndex(i => i === file.name), 1);
};
const handleChange = (file) => {
  if (file.status === 'ready') {
    formData.value.fileName.push(file.name);
    formRef.value.clearValidate();
  }
};
const uploadFile = (param) => {
  uploadForm.append('files', param.file);
  uploadForm.append('name', 'duhe-test2002');
  uploadForm.append('type', 'yarn');
  console.log('113211331');
  const config = {
    method: 'post',
    url: '/resources/',
    data: uploadForm,
    baseURL: 'http://172.16.13.174:8000/api/bdcs'
  };

  const time = new Date().getTime();
  setHeadersParam(
    config,
    'e-user-token',
    'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOiIxMDAxMzMiLCJ1c2VyTmFtZSI6ImJvbmMiLCJ0ZW5hbnRJZCI6ImJvbmMiLCJsb2dpbklkIjoiYm9uYyIsImlhdCI6MTY1MjI1NDE2NCwiZXhwIjoxNjUyMjkwMTY0fQ.YIaf5KbUqus7RO1CDpupdA1jjpbuRQ4HbIKDz_fUEf5pqoTWujBuLeCl3WmHsG5MCxlD8A_26JHPtTb1sprUww'
  );
  setHeadersParam(
    config,
    'e-sign-with',
    getSignWith(time, config.method.toLowerCase() === 'get' ? config.params : null)
  );
  setHeadersParam(config, 'e-time-with', time);

  axios(config)
    .then((res) => {
      console.log('*******res;:::', res);
    })
    .catch((err) => {
      console.log('*******err::', err);
    });
};

const btn = () => {
  uploadRef.value.submit();
};
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
