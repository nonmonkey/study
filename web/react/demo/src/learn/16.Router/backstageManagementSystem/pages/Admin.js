import React from 'react';
import { Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Welcome from './Welcome';

import StudentList from './student/StudentList';
import StudentAdd from './student/StudentAdd';
import CourseList from './courses/CourseList';
import CourseAdd from './courses/CourseAdd';

export default function Admin() {
  return (
    <Layout header={<Header></Header>} aside={<Menu></Menu>}>
      <>
        <Route path="/" exact component={Welcome}></Route>

        <Route path="/students" exact component={StudentList}></Route>
        <Route path={['/students/add', '/news']} component={StudentAdd}></Route>
        <Route path="/courses" exact component={CourseList}></Route>
        <Route path="/courses/add" exact component={CourseAdd}></Route>
      </>
    </Layout>
  );
}
