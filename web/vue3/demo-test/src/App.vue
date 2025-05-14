<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import TmpView from './components/TmpView.vue'
import Test from './components/Test.vue'
import { ref, provide, getCurrentInstance, onMounted } from 'vue';

provide('key', '123')

var tmp = ref();
var num = 0;
var onClick = () => { tmp.value.changeKey(++num); }
var onTestEvent = (ss) => {console.log(ss, '--------') }

const testProps= {
  onTestEvent,
  num,
  title: 'tsss'
}
</script>

<template>
  <TmpView ref="tmp"></TmpView>
  <Test {...testProps} @click="onClick"></Test>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Hello Vue 3 + Vite"></HelloWorld>
</template>

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
