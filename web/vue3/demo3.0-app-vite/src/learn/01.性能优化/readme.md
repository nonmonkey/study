[TOC]

---

### 一、HelloWorld 组件：

```HTML
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
```

### 二、调用：

```HTML
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
```

### 三、HelloWorld 组件打包之后：

```JS
import {
  toDisplayString as _toDisplayString,
  createVNode as _createVNode,
  createTextVNode as _createTextVNode,
  createStaticVNode as _createStaticVNode,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createBlock as _createBlock,
} from '/@modules/vue.js';

// 静态属性的提升
const _hoisted_1 = {
  class: 'msg',
};

// 静态节点的提升
const _hoisted_2 =
  /*#__PURE__*/
  _createVNode(
    'p',
    null,
    [
      /*#__PURE__*/ _createTextVNode('Edit ') /*#__PURE__*/,
      _createVNode('code', null, 'components/HelloWorld.vue') /*#__PURE__*/,
      _createTextVNode(' to test hot module replacement.'),
    ],
    -1 /* HOISTED */
  );

// 预字符串化
const _hoisted_3 =
  /*#__PURE__*/
  _createStaticVNode(
    '<ul><li><a href="">Lorem.</a></li><li><a href="">At!</a></li><li><a href="">Veritatis.</a></li><li><a href="">Ex?</a></li><li><a href="">Maiores?</a></li><li><a href="">Eaque.</a></li><li><a href="">Aperiam!</a></li></ul>',
    1
  );

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createBlock(
      _Fragment,
      null,
      [
        _createVNode('h1', _hoisted_1, _toDisplayString($props.msg), 1 /* TEXT */),
        _hoisted_2,
        _createVNode(
          'button',
          // 缓存事件处理函数
          {
            onClick: _cache[1] || (_cache[1] = ($event) => $data.count++),
          },
          'count is: ' + _toDisplayString($data.count),
          1 /* TEXT */
        ),
        _createVNode(
          'h3',
          {
            class: $data.className,
          },
          _toDisplayString($data.title),
          3 /* TEXT, CLASS */
        ),
        _hoisted_3,
      ],
      64 /* STABLE_FRAGMENT */
    )
  );
}
```
