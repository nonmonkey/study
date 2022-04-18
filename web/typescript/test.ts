interface AT<T> {
  (a:T,b:T):T
}
//这里就是确定泛型的类型 ，也可以吧a和b类型去掉，因为泛型已经确定类型
let add :AT<number> = function<T>(a:number,b:number) :number{
 return a;
}
 add(20,20)