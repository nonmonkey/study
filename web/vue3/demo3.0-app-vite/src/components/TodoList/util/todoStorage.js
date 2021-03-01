const LOCAL_KEY = 'todomvc';

/**
 * 生成唯一编号，时间戳+4位随机数
 */
export function generateId() {
  return Date.now() + Math.random().toString(16).substr(2, 4);
}

/**
 * 获取目前所有的任务列表
 */
export function fetch() {
  const result = localStorage.getItem(LOCAL_KEY);
  return result ? JSON.parse(result) : [];
}

/**
 * 存储
 * @param {*} todos
 */
export function save(todos) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(todos));
}

/**
 * 筛选
 * @param {*} todos 
 * @param {*} visibility 
 */
export function filter(todos, visibility = 'all') {
  if (visibility === 'all') {
    return todos;
  } else if (visibility === 'active') {
    return todos.filter((i) => !i.completed);
  } else if(visibility === 'completed') {
    return todos.filter((i) => i.completed);
  }
  throw new Error('invalid visibility value');
}
