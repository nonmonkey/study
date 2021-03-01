import { reactive, readonly } from 'vue';

// 1.对象只读，只允许使用所提供的方法修改
{
  const useUser = function () {
    const userOrigin = {};
    const user = readonly(userOrigin);
    const setUserName = function (newName) {
      userOrigin.name = newName;
    };
    const setUserAge = function (newAge) {
      userOrigin.age = newAge;
    };

    return {
      user,
      setUserName,
      setUserAge,
    };
  };

  // test
  const test = function () {
    const { user, setUserName, setUserAge } = useUser();
    user.name = 123; // warning
    setUserName('du');
    console.log(user.name); // du
  };
  // test();
}

// 2. 函数防抖(响应式数据)
{
  const useDebounce = function (obj, duration) {
    const valueOrigin = reactive(obj);
    const value = readonly(valueOrigin);
    let timer = null;
    const setValue = (newValue) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        console.log('值改变了');
        Object.entries(newValue).forEach(([k, v]) => {
          valueOrigin[k] = v;
        });
      }, duration);
    };

    return {
      value,
      setValue,
    };
  };

  // test
  const test = function () {
    const { value, setValue } = useDebounce({ a: 1, b: 2 }, 5000);

    window.obj = value;
    window.setObj = setValue;
  };
  // test();
}
