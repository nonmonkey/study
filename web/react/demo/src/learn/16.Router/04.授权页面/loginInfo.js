// 外部文件（或者，使用第三方store）
const info = {
  isLogin: false,
  login() {
    this.isLogin = true;
  },
  logout() {
    this.isLogin = false;
  },
};
export default info;
