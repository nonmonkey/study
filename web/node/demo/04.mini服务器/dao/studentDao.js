var dbutil = require('./dbutil');

function queryAllStudent(success) {
  var connection = dbutil.createConnection();
  var querySql = 'select * from student;';

  connection.connect();
  connection.query(querySql, function (error, result) {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
      success(result);
    }
  });
  connection.end();
}

function queryStudentByClassAndAge(classNum, age) {
  var connection = dbutil.createConnection();
  // var querySql = 'select * from student where class = ' + classNum + ';';
  var querySql = 'select * from student where class = ? and age = ?;';
  // ? 表示传参，并在查询函数中sql语句之后传入。多个参数需要传入数组。
  // 此方法可防止sql注入。

  connection.connect();
  connection.query(querySql, [classNum, age], function (error, result) {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
    }
  });
  connection.end();
}

function queryStudentByStuNum(stuNum, success) {
  var connection = dbutil.createConnection();
  var querySql = 'select * from student where stu_num = ?;';

  connection.connect();
  connection.query(querySql, stuNum, function (error, result) {
    if (error) {
      console.log(error);
    } else {
      success(result);
    }
  });
  connection.end();
}

module.exports = {
  queryAllStudent,
  queryStudentByClassAndAge,
  queryStudentByStuNum,
};
