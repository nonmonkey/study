<template>
  <img alt="Vue logo" src="./assets/logo.png">

  <!-- <HelloWorld msg="Hello Vue 3 + Vite"></HelloWorld> -->
  <TestDu v-bind="testProps"></TestDu>
</template>

<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from './components/HelloWorld.vue';
import TestDu from './TestDu.vue';

const num = 0;
const onTestEvent = (ss) => { console.log(ss, '-onTestEvent-------'); };

const testProps = {
  onTestEvent,
  num,
  title: 'tsss'
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
