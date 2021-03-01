<script>
import { h } from 'vue';

export default {
  name: 'About',
  render() {
    return h('div', { class: 'about', style: { textAlign: 'center' } }, [h('h1', null, 'This is an about page')]);
  },
};
</script>
