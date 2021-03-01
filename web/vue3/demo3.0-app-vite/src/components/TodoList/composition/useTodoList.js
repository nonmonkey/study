import { ref, watchEffect } from 'vue';
import * as todoStorage from './../util/todoStorage';

export default function useTodoList() {
  const todosRef = ref(todoStorage.fetch());
  window.todosRef = todosRef;

  watchEffect(() => {
    todoStorage.save(todosRef.value);
  });

  return {
    todosRef,
  };
}