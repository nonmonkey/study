import { ref, computed } from 'vue';

export default function useEditTodo(todosRef) {
  let editingTodoRef = ref(null); // 当前正在修改的是哪一个todo
  let originTitle = null;

  const editTodo = (todo) => {
    originTitle = todo.title;
    editingTodoRef.value = todo;
  };

  const doneEdit = (todo) => {
    editingTodoRef.value = null;
  };

  const cancelEdit = (todo) => {
    editingTodoRef.value = null;
    todo.title = originTitle;
  };

  const allDoneDef = computed({
    get() {
      return todosRef.value.filter((i) => !i.completed).length === 0;
    },
    set(checked) {
      todosRef.value.forEach((todo) => {
        todo.completed = checked;
      });
    },
  });

  return {
    editingTodoRef,
    allDoneDef,
    editTodo,
    doneEdit,
    cancelEdit,
  };
}
