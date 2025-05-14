<template>
  <div>
    <div>{{ num }}</div>
    <div>{{ title }}</div>
    <div @click="onClick">qqqq</div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  num: {
    type: [Number]
  },
  title: {
    type: [String]
  },
})
const emit = defineEmits(['testEvent'])
const onClick= () => {
  emit('testEvent', '09999')
}
</script>

<style >

</style>
