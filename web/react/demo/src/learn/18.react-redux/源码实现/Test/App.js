import React from 'react';
import { Provider } from '../index';
import Counter from './Counter';
import store from '../../store';

export default function Test() {
  return (
    <Provider store={store}>
      <Counter></Counter>
    </Provider>
  )
}
