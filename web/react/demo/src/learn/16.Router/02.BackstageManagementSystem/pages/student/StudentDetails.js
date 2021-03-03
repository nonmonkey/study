import React from 'react';

export default function StudentDetial(props) {
  console.log('props:::', props);
  return (
    <div>
      <h1>学生详情页</h1>
      <p>学号：{props.match.params.sno}</p>
    </div>
  )
}
