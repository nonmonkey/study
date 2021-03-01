<template>
  <HelloWorldPerf :msg="msg"></HelloWorldPerf>
</template>

<script>
import HelloWorldPerf from './HelloWorldPerf.vue';

export default {
  name: 'Test',
  components: {
    HelloWorldPerf,
  },
  data() {
    return {
      msg: 'hello',
    };
  },
};
</script>
