<template>
  <div class="check-editor">
    <div class="check-editor-inner">
      <div class="checkbox" :class="{ checked: modelValue }" @click="heandleChecked"></div>
      <input type="text" class="editor" :value="title" @input="handleTextChange" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'Shop',
  props: {
    modelValue: Boolean,
    title: String,
    // titleModifiers: {
    //   default: () => ({}),
    // },
  },
  setup(props, ctx) {
    const heandleChecked = () => {
      ctx.emit('update:modelValue', !props.modelValue);
    };

    const handleTextChange = (e) => {
      ctx.emit('update:title', e.target.value);
    };

    return {
      heandleChecked,
      handleTextChange,
    };
  },
};
</script>

<style scoped>
.check-editor {
  display: inline-block;
  cursor: pointer;
  vertical-align: middle;
}

.check-editor-inner {
  display: flex;
  align-items: center;
}

.checkbox {
  width: 15px;
  height: 15px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  border-radius: 3px;
  transition: 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox:hover,
.checkbox.checked {
  border-color: #409eff;
}

.checkbox.checked::after {
  content: '';
  border-radius: 2px;
  width: 9px;
  height: 9px;
  background: #409eff;
}

.editor {
  border: none;
  outline: none;
  margin-left: 5px;
  border-bottom: 1px solid #dcdfe6;
  font-size: inherit;
}
</style>
