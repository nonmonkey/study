import { useState, useMemo, useCallback } from 'react';

function Item(props) {
  console.log('Item render');
  return <li>{props.value}</li>;
}

function Items() {
  console.log('Items render');
  const [range] = useState({ min: 1, max: 1000 });
  const list = useMemo(() => {
    const list = [];
    for (var i = range.min; i < range.max; i++) {
      list.push(<Item key={i} value={i}></Item>);
    }
    console.log('Items useMemo');
    return <ul>{list}</ul>;
  }, [range.min, range.max]);

  return list;
}

export default function Test() {
  const [n, setN] = useState(0);
  const handleChange = useCallback((e) => {
    setN(parseInt(e.target.value));
  }, []);

  console.log('Test render');
  return (
    <>
      <input type="number" value={n} onChange={handleChange} />
      <Items></Items>
    </>
  );
}
