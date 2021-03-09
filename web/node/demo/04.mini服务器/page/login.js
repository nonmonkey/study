// get 请求
function login() {
  var stuNum = document.getElementById('stuNum').value;
  var password = document.getElementById('password').value;
  var params = 'stuNum=' + stuNum + '&password=' + password;

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open('get', '/login?' + params, true);
  xmlHttp.send(null);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      if (xmlHttp.responseText === 'OK') {
        alert('成功！')
      } else {
        alert('失败！')
      }
    }
  };
}

// post 请求
function login1() {
  var stuNum = document.getElementById('stuNum').value;
  var password = document.getElementById('password').value;
  var params = 'stuNum=' + stuNum + '&password=' + password;

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open('post', '/login1', true);
  xmlHttp.send(params);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      if (xmlHttp.responseText === 'OK') {
        alert('成功！')
      } else {
        alert('失败！')
      }
    }
  };
}

