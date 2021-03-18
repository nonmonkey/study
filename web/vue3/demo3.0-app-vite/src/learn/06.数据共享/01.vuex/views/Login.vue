<template>
  <form action="" @submit.prevent="handleSubmit">
    <div class="form-item">
      <label for="">账号</label>
      <input type="text" v-model="loginId" />
    </div>
    <div class="form-item">
      <label for="">密码</label>
      <input type="password" v-model="loginPwd" />
    </div>
    <div class="form-item">
      <label for=""></label>
      <button :disabled="loading">{{ loading ? 'loading...' : '登录' }}</button>
    </div>
  </form>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
// import { useStore } from '/src/learn/06.数据共享/myVuex/index.js';
import { useRouter } from 'vue-router';

export default {
  name: 'Login',
  setup() {
    const loginId = ref('');
    const loginPwd = ref('');
    const store = useStore();
    const router = useRouter();

    const handleSubmit = async () => {
      const user = await store.dispatch('loginUser/login', { loginId: loginId.value, loginPwd: loginPwd.value });
      if (user) {
        console.log('登录成功');
        router.push('/');
      } else {
        alert('登录失败');
      }
    };

    return {
      loginId,
      loginPwd,
      handleSubmit,

      loading: computed(() => store.state.loginUser.loading),
    };
  },
};
</script>

<style>
.form-item {
  margin: 1em auto;
  width: 300px;
  display: flex;
  align-items: center;
}
.form-item input {
  height: 26px;
  font-size: 14px;
  flex: 1 1 auto;
}
.form-item label {
  width: 70px;
}
.form-item button {
  flex: 1 1 auto;
  background: #50936c;
  border: none;
  outline: none;
  color: #fff;
  border-radius: 5px;
  height: 35px;
  font-size: 16px;
}
</style>
