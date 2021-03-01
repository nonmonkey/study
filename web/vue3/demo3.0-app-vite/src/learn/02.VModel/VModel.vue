<template>
  input1: <input type="text" :value="modelValue" @change="handleChange1" />
  <br />
  input2: <input type="text" :value="num" @change="handleChange2" />
</template>

<script>
export default {
  name: 'VModel',
  props: {
    modelValue: {
      type: String,
    },
    modelModifiers: {
      default: () => ({}),
    },
    num: {
      type: Number,
    },
    numModifiers: {
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    function handleChange1(e) {
      var val = e.target.value;
      if (props.modelModifiers.capitalize) {
        val = val.charAt(0).toUpperCase() + val.slice(1);
      }
      emit('update:modelValue', val);
    }
    function handleChange2(e) {
      var oldValue = props.num;
      var newVal = e.target.value;
      if (props.numModifiers.number) {
        newVal = window.parseFloat(newVal);
        if (newVal === oldValue && newVal !== e.target.value) {
          e.target.value = newVal;
        }
      }
      emit('update:num', newVal);
    }

    return {
      handleChange1,
      handleChange2,
    };
  },
};
</script>
