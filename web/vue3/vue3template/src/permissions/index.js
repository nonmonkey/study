// import _ from '@/utils';
// import Vue from 'vue';
// import store from '@/conf/home/store';

// function Permissions () {
//   this.userType = '';
// };

// Permissions.ADMIN = 'ADMIN_USER'; // admin user
// Permissions.GENERAL = 'GENERAL_USER'; // general user
// Permissions.TENANT = 'TENANT_USER'; // tenant user

// Permissions.prototype.request = function () {
//   return new Promise((resolve, reject) => {
//     store.dispatch('user/getUserInfo').then((res) => {
//       this.userType = res.userType;
//       this.ps(res);
//       resolve();
//     });
//   });
// };

// Permissions.prototype.ps = function (res) {
//   Vue.directive('ps', {
//     bind (el, binding, vnode) {
//       if (!Vue.prototype.$ps(binding.value)) {
//         if ($(el).prop('tagName') === 'BUTTON') {
//           $(el).attr('disabled', true);
//         } else {
//           $(el).css('display', 'none');
//           setTimeout(function () { el.parentNode.removeChild(el); }, 100);
//         }
//       }
//     }
//   });

//   // Permission check method
//   Vue.prototype.$ps = function (valueArr) {
//     let _arr = valueArr;
//     if (!_arr || (Array.isArray(_arr) && _arr.length === 0)) _arr = [Permissions.ADMIN];
//     if (!Array.isArray(_arr)) _arr = [_arr];
//     return _.indexOf(_arr, res.userType) !== -1;
//   };
// };


// export { Permissions as PermissionsConstructor };
// export default new Permissions();
