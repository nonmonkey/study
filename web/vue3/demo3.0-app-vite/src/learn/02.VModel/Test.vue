<template>
  <DoubleInput v-model="name" v-model:num.number="age"></DoubleInput>

  <p>name: {{ name }}, age: {{ age }} </p>
</template>

<script>
import DoubleInput from './VModel.vue';

export default {
  name: 'Test',
  components: {
    DoubleInput
  },
  data() {
    return {
      name: 'du',
      age: 18,
    }
  }
}
</script>
