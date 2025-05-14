<template>
  <div>
    <div>{{ num }}</div>
    <div>{{ title }}</div>
    <br>
    <br>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

defineProps({
  num: {
    type: [Number]
  },
  title: {
    type: [String]
  },
})
const emit = defineEmits(['testEvent'])

const num1 = ref(3);
const num2 = ref(4);
const numComputed = computed(() => {
  console.log('numComputed::');
  return num1.value + num2.value;
})

watch(
  () => {
    console.log('this is  watch;');
    return numComputed.value;
  },
  () => {
    console.log('watch:  changed', numComputed.value);
  }
)

num1.value++;
num2.value--;

</script>

<style></style>
