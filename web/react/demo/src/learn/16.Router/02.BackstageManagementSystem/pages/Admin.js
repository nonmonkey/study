import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Welcome from './Welcome';

import StudentList from './student/StudentList';
import StudentDetails from './student/StudentDetails';
import StudentAdd from './student/StudentAdd';
import CourseList from './courses/CourseList';
import CourseAdd from './courses/CourseAdd';

export default function Admin() {
  return (
    <Layout header={<Header></Header>} aside={<Menu></Menu>}>
      <Switch>
        <Route path="/" exact component={Welcome}></Route>
        <Route path="/students" exact component={StudentList}></Route>
        <Route path="/students/add" exact component={StudentAdd}></Route>
        <Route path="/students/:sno(\d+)" exact component={StudentDetails}></Route>
        <Route path="/courses" exact component={CourseList}></Route>
        <Route path="/courses/add" exact component={CourseAdd}></Route>
      </Switch>
    </Layout>
  );
}
