<template>
  <HelloWorld msg="Welcome to Your Vue.js App"></HelloWorld>
  <!-- <VModelTest></VModelTest> -->
  <!-- <PerformanceTest></PerformanceTest> -->
  <!-- <TodoListTest></TodoListTest> -->
  <!-- <CompositionGDPTest></CompositionGDPTest> -->
</template>

<script>
import HelloWorld from '/src/components/HelloWorld.vue';
// import TodoListTest from './components/TodoList/Test.vue';
// import PerformanceTest from './learn/01.性能优化/Test.vue';
// import VModelTest from './learn/02.VModel/Test.vue';
// import AsyncTest from './learn/03.Async/Test.vue';
// import CompositionGDPTest from './learn/05.composition API/JDPDemo/index.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    // TodoListTest,
    // PerformanceTest,
    // VModelTest,
    // AsyncTest,
    // CompositionGDPTest,
  },
};
</script>
