import { reactive, ref, watch, watchEffect } from 'vue';

const state = reactive({ a: 1, b: 2 });
const count = ref(0);

// 1. watchEffect
{
  // test
  const test = function () {
    // 首次运行一遍
    const stop = watchEffect(() => {
      console.log('watchEffect state:', state.a, state.b);
    });

    // 多次运行只会运行一遍
    state.a++;
    state.a++;
    state.a++;
    state.b++;
    state.b++;
    state.b++;
  };
  // test();
}

// 2. watch
{
  // 不能直接传一个数值
  // const stop = watch(state.a, (newVal, oldVal) => {
  //   console.log('watch:', newVal, oldVal);
  // })

  const stop = watch(
    () => {
      return state.a + state.b;
    },
    (newVal, oldVal) => {
      console.log('watch:', newVal, oldVal);
    }
  );

  // test
  const test = function () {
    state.a++;
    state.a++;
    state.b++;
    console.log('test:state:', state);
  };
  // test();
}
