import { useEffect } from 'react';
import reset from './resetScroll';

export default function useScroll(pathName) {
  useEffect(reset, [pathName])
}
