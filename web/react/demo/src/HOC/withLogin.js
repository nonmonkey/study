export default function withLogin(Comp) {
  return function LoginWrapper(props) {
    if (props.isLogin) {
      return <Comp {...props}></Comp>
    }
    return null;
  }
}
