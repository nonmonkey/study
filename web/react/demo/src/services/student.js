const appkey = 'demo13_1545210570249';

/**
 * 所有学生
 */
export default async function getAllStudents() {
  return await fetch('/api/student/findAll?appkey=' + appkey)
    .then(resp => resp.json()).then(resp => resp.data);
}

export async function getStudents(page = 1, limit = 10) {
  return await fetch(`/api/student/findByPage?appkey=${appkey}&page=${page}&size=${limit}`)
    .then(resp => resp.json()).then(resp => resp.data);
}

export async function searchStudents({ page = 1, limit = 10, key = '', sex = -1 } = {}) {
  return await fetch(`/api/student/searchStudent?appkey=${appkey}&page=${page}&size=${limit}&search=${key}&sex=${sex}`)
    .then(resp => resp.json()).then(resp => resp.data);
}
