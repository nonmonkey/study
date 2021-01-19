import { setValue } from '../../utils/ObjectUtil.js';

export default function vmodel(vm, elm, data) {
  elm.onchange = function (event) {
    setValue(vm._data, data, elm.value); // vue对象，该元素绑定的属性，该元素的新value
  }
}
