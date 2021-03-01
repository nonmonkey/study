import { ref } from 'vue';
import { generateId } from './../util/todoStorage.js';

export default function useNewTodo() {
  const newTodoRef = ref('this is a text'); // 新任务的标题

  // 新增任务的方法
  const addTodo = (e) => {
    console.log('keyup addTodo:', e);
    // 新增一个任务
    const value = newTodoRef.value && newTodoRef.value.trim();
    if (!value) {
      return;
    }
    // 生成一个任务对象，将其加入到任务列表
    const todo = {
      id: generateId(),
      title: value,
      completed: false, // 任务是否完成
    };

    todosRef.value.push(todo);
  };

  return {
    newTodoRef,
    addTodo,
  };
}
