<script>
import { h, ref } from 'vue';

export default {
  name: 'Test',
  setup() {
    const key = ref('123');
    const changeKey = (v) => {
      key.value = v
    }

    return () => {
      return h('h1', ['this is test!', key.value])
    }
  }
}
</script>
