<template>
  <div>block3</div>
</template>

<script>
export default {
  name: 'block3',
  data() {
    return {
      msg: 1,
    };
  },
  created() {
    console.log('Block3:', this.msg);
  },
  unmounted() {
    console.log('unmounted:', this)
  }
};
</script>

<style scoped></style>
