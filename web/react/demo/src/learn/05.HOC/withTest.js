import React from 'react';
import {A, B} from './Comp';
import withLog from '../../HOC/withLog';
import withLogin from '../../HOC/withLogin';

const Alog = withLog(A);
const Blog = withLog(B);

const ALogin = withLogin(A);

export default function Test() {
  return (
    <div>
      <Alog></Alog>
      <Blog></Blog>

      <ALogin isLogin></ALogin>
    </div>
  )
}
