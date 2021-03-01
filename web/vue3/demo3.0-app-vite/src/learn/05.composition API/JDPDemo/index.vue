<template>
  <h1>2019 GDP Top 5</h1>
  <div class="container">
    <keep-alive>
      <bar1 :gdp="gdp"></bar1>
    </keep-alive>
    <bar2 :gdp="gdp"></bar2>
  </div>
  <div class="controls">
    <div class="item" v-for="item in gdp" :key="item.country">
      <label>{{ item.country }}</label>
      <input type="number" v-model="item.value" step="0.001" min="0" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

import Bar1 from './components/Bar1.vue';
import Bar2 from './components/Bar2.vue';

export default {
  name: 'App',
  components: {
    Bar1,
    Bar2,
  },
  setup() {
    const gdp = ref([]);
    const fetchGdp = async function () {
      const res = await fetch('/api/src/learn/05.composition API/JDPDemo/gdp.json');
      const resp = await res.json()
      gdp.value = resp;
    };

    fetchGdp();

    return {
      gdp,
    };
  },
};
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.controls {
  margin: 1em;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.item {
  margin: 1em;
}
.item label {
  margin: 0 1em;
}
.item input {
  height: 26px;
  font-size: 14px;
}
h1 {
  text-align: center;
}
</style>
