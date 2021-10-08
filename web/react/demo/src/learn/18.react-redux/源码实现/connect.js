import React, { useState, useContext, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import ctx from './ctx';

function compare(obj1, obj2) {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  return obj1Keys.length === obj2Keys.length && obj1Keys.every((key) => Object.is(obj1[key], obj2[key]));
}

export default function connect(mapStateToProps, mapDispatchToProps) {
  // 返回一个高阶组件
  return function (Comp) {
    // 对于Temp组件，只有他需要的数据发生变化时才会重新渲染
    class Temp extends React.PureComponent {
      static contextType = ctx;

      // 获取需要传递的事件处理函数
      getEventHandlers = () => {
        if (typeof mapDispatchToProps === 'function') {
          return mapDispatchToProps(this.store.dispatch);
        } else if (typeof mapDispatchToProps === 'object') {
          return bindActionCreators(mapDispatchToProps, this.store.dispatch);
        }
      };

      // eslint-disable-next-line no-useless-constructor
      constructor(props, context) {
        super(props, context);
        this.store = this.context;
        if (mapStateToProps) {
          // 状态中的数据，来自于仓库中映射的结果
          this.state = mapStateToProps(this.store.getState());
          // 监听仓库中的数据变化
          this.unlisten = this.store.subscribe(() => {
            this.setState(mapStateToProps(this.store.getState()));
          });
        }

        if (mapDispatchToProps) {
          this.handlers = this.getEventHandlers();
        }
        console.log('state:', this.state);
      }

      componentWillUnmount() {
        this.unlisten();
      }

      render() {
        console.log(Temp.displayName, '重新渲染了');
        return <Comp {...this.state} {...this.handlers} {...this.props}></Comp>;
      }
    }
    Temp.displayName = Comp.displayName || Comp.name;

    function TempFunc(props) {
      console.log('TempFunc');
      const store = useContext(ctx); // 从上下文中拿到仓库
      const [state, setState] = useState(mapStateToProps && mapStateToProps(store.getState()));
      useEffect(() => {
        return store.subscribe(() => {
          var newState = mapStateToProps && mapStateToProps(store.getState());
          setState((pre) => {
            if (compare(pre, newState)) {
              return pre;
            }
            return newState;
          })
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      var handlers = null;
      if (mapDispatchToProps) {
        if (typeof mapDispatchToProps === 'function') {
          handlers = mapDispatchToProps(store.dispatch);
        } else if (typeof mapDispatchToProps === 'object') {
          handlers = bindActionCreators(mapDispatchToProps, store.dispatch);
        }
      }

      return <Comp {...state} {...handlers} {...props}></Comp>;
    }
    TempFunc.displayName = Comp.displayName || Comp.name;
    return TempFunc;
  };
}
