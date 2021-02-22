import React from 'react';
import Student from './Student';

export default function StudentList(props) {
  var students = props.students.map(item => <Student key={item.id} {...item}></Student>)
  return (
    <ul>
      {students}
    </ul>
  )
}