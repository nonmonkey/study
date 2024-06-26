function getQueryString(name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');

  let r = window.location.search.substring(1).match(reg);

  if (r != null) {
    return decodeURIComponent(r[2]);
  }

  return null;
}
