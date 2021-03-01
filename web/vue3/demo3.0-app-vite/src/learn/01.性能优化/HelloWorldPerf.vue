<template>
  <h1 class="msg">{{ msg }}</h1>
  <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
  <button @click="count++">count is: {{ count }}</button>

  <h3 :class="className">{{ title }}</h3>
  <ul>
    <li><a href="">Lorem.</a></li>
    <li><a href="">At!</a></li>
    <li><a href="">Veritatis.</a></li>
    <li><a href="">Ex?</a></li>
    <li><a href="">Maiores?</a></li>
    <li><a href="">Eaque.</a></li>
    <li><a href="">Aperiam!</a></li>
  </ul>
</template>

<script>
export default {
  name: 'HelloWorldPerf',
  props: {
    msg: String,
  },
  data() {
    return {
      count: 0,
      className: 'title',
      title: 'this is a list:',
    };
  },
};
</script>
