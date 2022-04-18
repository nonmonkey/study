import { readonly } from 'vue';

/**
 * 获取所有请求
 * @returns
 */
function getRequestFns () {
  const result = Object.create(null);
  const modules = import.meta.globEager('./*/*.js');

  Object.entries(modules).forEach(([path, content]) => {
    const regResult = path.match(/([\w-]+\.)*[\w-]+(?=(\.js))/);
    const fileData = content.default;
    if (regResult) {
      const moduleName = regResult[0];
      if (result[moduleName]) {
        throw new Error(`[Error in http]: requestModules目录下 ${moduleName} 文件重名！`);
      } else {
        result[moduleName] = fileData;
      }
    }
  });
  return result;
};

export default readonly(getRequestFns());
