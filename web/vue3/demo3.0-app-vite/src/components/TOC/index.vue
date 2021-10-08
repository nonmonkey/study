<script>
import { h } from 'vue';

const headNodesMap = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
function getText(vnode) {
  return typeof vnode.children === 'string' ? vnode.children : vnode.children.map((v) => getText(v)).join('');
}

function generateId(title) {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/(^-)|(-$)/, '')
    .replace(/-{2,}/g, '-');
}

export default {
  setup(props, { slots }) {
    // 得到插槽中的所有虚拟dom
    const vnodes = slots.default();

    const headNodes = vnodes.filter((it) => headNodesMap.includes(it.type));
    const links = [];
    for (const head of headNodes) {
      head.props = head.props || {};
      const id = generateId(getText(head));
      head.props.id = id;

      links.push(h('a', { href: '#' + id }, id));
    }

    console.log('headNodes:', headNodes, links);
    return () =>
      h('div', [
        h(
          'div',
          {
            class: 'toc',
          },
          links
        ),
        h('div', { class: 'content' }, vnodes),
      ]);
  },
};
</script>

<style>
.toc {
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px;
  line-height: 2;
}

.toc a {
  display: block;
}

.content {
  margin: 0 auto;
  width: 600px;
}

html {
  scroll-behavior: smooth;
}
</style>
