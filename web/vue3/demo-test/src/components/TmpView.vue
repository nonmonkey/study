<template>
  <div>
    <h1>{{ key }}</h1>
  </div>
</template>

<script setup>
import { h, ref, defineExpose } from 'vue';

const key = ref('123');
const changeKey = (v) => {
  key.value = v
}
defineExpose({ changeKey })
</script>

<style lang="scss" scoped>
  
</style>
