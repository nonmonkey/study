export default function StudentAdd(props) {
  console.log('props"', props);

  return (
    <div>
      <h1>添加学生页</h1>
      <p>{props.match.params.year}-{props.match.params.month}-{props.match.params.day}</p>
    </div>
  );
}
