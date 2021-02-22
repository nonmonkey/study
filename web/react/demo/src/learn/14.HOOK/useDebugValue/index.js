import React, { useState, useEffect, useDebugValue } from 'react';

function useTest() {
  const [students] = useState([]);
  useDebugValue('学生集合');
  return students;
}

export default function Test() {
  useState(0);
  useEffect(() => {
    console.log('effect');
  }, []);

  useTest();

  return (
    <div>

    </div>
  )
}
