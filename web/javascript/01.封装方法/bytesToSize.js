function bytesToSize(bytes) {
  const b = parseFloat(bytes);
  if (b <= 0 || Object.is(b, NaN)) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let i = Math.floor(Math.log(b) / Math.log(k));
  if (i < 0) i = 0;
  return `${parseFloat((b / (k ** i)).toPrecision(3))} ${sizes[i]}`;
}
