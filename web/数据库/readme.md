[TOC]

### 零、安装MySql
mac环境下安装mysql：https://www.cnblogs.com/xuyatao/p/6932885.html
mac mysql path：/usr/local/mysql/bin
登录mysql：mysql -uroot -p

mysql可视化软件：DataGrip

**MySql修改密码**
修改密码：https://www.cnblogs.com/xingxiangyi/p/9334694.html 
cmd查询进程号：ps -ef|grep mysql 
kill进程：sudo kill -9 [进程号]

### 一、数据库种类

| |关系型数据库（每一列都是一个属性，每一行都是一条记录，一般是表格的形式）|非关系型数据库|
|---|---|---|
|实时数据库|Mysql，Oracle、DB2、SqlServer（这4种数据主要存放在硬盘）|MongoDB(硬盘)，Redis(内存，硬盘备份)，Memcache(内存)|
|非实时数据库|Hive|HBase、ElasticSearch|

互联网公司一般用 Mysql、Redis
MongoDB 不使用sql语句，因此学习成本低

### 二、数据库基本应用

```SQL
show databases; #显示已有数据库
use <数据库名>; #使用（连接）某个数据库
show tables; #显示所有的表
desc <表名>; #显示表
show create table <表名>; #显示创建表的字段
select * from <表名>; #查看表里所有的数据

create database <数据库名>; #创建数据库
drop database <数据库名>; #删除数据库
```

### 三、数值类型

1. 整数 int 
2. 长整数 bigint(21) 
3. 浮点数 float 
4. 双精度浮点数 double 
5. 字符串 varchar(16) 
6. 文本 text

### 四、sql语句

#### 1.显示添加表的信息
show create table student;
```SQL
CREATE TABLE `student` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'student id',
  `stu_num` int(11) NOT NULL COMMENT 'student number',
  `name` varchar(32) NOT NULL COMMENT 'student name',
  `age` int(11) NOT NULL COMMENT 'student age',
  `class` int(11) NOT NULL COMMENT 'student class',
  PRIMARY KEY (`id`),
  UNIQUE KEY `student_stu_num_uindex` (`stu_num`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1

# MYISAM：读很多，写很少。表级锁。（读的性能要好一些）
# InnoDB：读较多，写较多。行级锁。
```

#### 2.添加表字段
```SQL
alter table <表名> add <字段> int not null comment 'student math';
```

> alter: 修改表; add: 添加;

#### 3.删除表字段

```SQL
alter table <表名> drop column <字段>;
```

#### 4.设置编码字符集

```SQL
alter database <数据库名> character set utf8; #改库
alter table <表名> default character set utf8; #改表
alter table <表名> convert to character set utf8; #改字段
```

#### 5.增删改查

```SQL
# 增
insert into student (`stu_num`, `name`, `age`, `class`)
values (8, 'pp', 12, 5);

# 改
update student set age = 180 where name = "du";
update student set age = 14, class = 12 where name = "du";

# 查
select * from student;
select * from student where age = 18;
select name from student where age = 18;
select name, age, class from student;

select count(1) from student; # 查总数
select count(1) from student where age = 14;
select count(1) from student where age = 14 and class = 12;
select count(1) from student where age = 14 or class = 1;

select sum(age) from student; # 求总数（age的总和）
select sum(age) / count(1) from student; # 求平均数
select avg(age) from student; # 求平均数
select avg(age) as avg_age from student; # 求平均数(改变查出的字段)

select class, count(1) as num from student group by class; # 按class分组(前面select后只能加group by的字段)

select * from student limit 2; # 只查询前两个
select * from student limit 3, 2; # 第一个参数是偏移量，第二个参数是个数

select * from student order by id; # 排序 正序
select * from student order by id desc; # 排序 倒序
select * from student order by id desc limit 3, 2; # 排序 倒序

# 删除
delete from student where name = 'pp';
```
