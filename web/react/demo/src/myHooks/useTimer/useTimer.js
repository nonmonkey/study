import { useEffect } from 'react';

/**
 * 组件首次渲染后，启动一个计时器
 * 组件卸载后，清除计时器
 * @param {*} func 
 * @param {*} duration 
 */
export default function useTimer(func, duration = 1000) {
  useEffect(() => {
    const timer = setInterval(func, duration);
    return () => {
      clearInterval(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
