import React from 'react';
import './pager.css';

/**
 * 分页组件
 * 属性：
 * 1.current: 初始页码
 * 2.total: 总数据量
 * 3.limit: 页容量，每页显示的数据量
 * 4.panelNumber: 数字页码做多显示多少个
 */
export default function Pager(props = {}) {
  var _props = {
    current: props.current || 1,
    total: props.total || 0,
    limit: props.limit || 10,
    panelNumber: props.panelNumber || 5,
    onPageChange: props.onPageChange || null,
  };
  var pageNumber = getPageNumber(_props);
  if (pageNumber === 0) return null;
  var min = getMinNumber(_props);
  var max = getMaxNumber(min, pageNumber, _props);

  var numbers = new Array(max - min + 1).fill().map((item, index) => (
    <span
      key={index}
      className={min + index === props.current ? 'item active' : 'item'}
      onClick={() => {
        toPage(min + index, _props);
      }}
    >
      {min + index}
    </span>
  ));

  return (
    <div className="parger">
      <span
        className={_props.current === 1 ? 'item disabled' : 'item'}
        onClick={() => {
          toPage(1, _props);
        }}
      >
        首页
      </span>
      <span
        className={_props.current === 1 ? 'item disabled' : 'item'}
        onClick={() => {
          toPage(_props.current - 1 < 1 ? 1 : _props.current - 1, _props);
        }}
      >
        上一页
      </span>
      {numbers}
      <span
        className={_props.current === pageNumber ? 'item disabled' : 'item'}
        onClick={() => {
          toPage(_props.current + 1 > pageNumber ? pageNumber : _props.current + 1, _props);
        }}
      >
        下一页
      </span>
      <span
        className={_props.current === pageNumber ? 'item disabled' : 'item'}
        onClick={() => {
          toPage(pageNumber, _props);
        }}
      >
        尾页
      </span>
      <span>{_props.current}</span> / <span>{pageNumber}</span>
    </div>
  );
}

/**
 * 获取页码的最小数字
 * @param {*} props
 */
function getMinNumber(props) {
  var min = props.current - Math.floor(props.panelNumber / 2);
  return min < 1 ? 1 : min;
}

/**
 * 获取页码的最大数字
 * @param {*} props
 */
function getMaxNumber(min, pageNumber, props) {
  var max = min + props.panelNumber - 1;
  return max > pageNumber ? pageNumber : max;
}

/**
 * 跳转到指定的页码
 * @param {*} target 目标页码
 * @param {*} props 所有属性
 */
function toPage(target, props) {
  console.log('toPage:', target, props);
  if (props.current === target) {
    return; // 页码相同
  }
  props.onPageChange && props.onPageChange(target);
}

/**
 * 计算总页数
 * @param {*} props
 */
function getPageNumber(props) {
  return Math.ceil(props.total / props.limit);
}
