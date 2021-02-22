import React from 'react';
import Pager from './Pager';
import Modal from './Modal/Modal';
import StudentList from './StudentTest/StudentList';

export default class PagerTest extends React.Component {
  state = {
    current: 1,
    total: 0,
    limit: 10,
    panelNumber: 7,
    students: [],
    isLoading: false,
  };

  constructor(props) {
    super(props);
    this.fetchStudents();
  }

  async fetchStudents(params = {}) {
    this.setState({ isLoading: true });
    var current = params.current ? params.current : this.state.current;
    var limit = params.limit ? params.limit : this.state.limit;
    var res = await fetch(
      `http://api.duyiedu.com/api/student/findByPage?appkey=demo13_1545210570249&page=${current}&size=${limit}`
    )
      .then((res) => res.json())
      .then((res) => res.data);

    this.setState({
      isLoading: false,
      total: res.cont,
      students: res.findByPage,
    });
  }

  handlePageChange = (newPage) => {
    this.setState({ current: newPage });
    this.fetchStudents({ current: newPage });
  };

  render() {
    return (
      <div className="container">
        <Modal show={this.state.isLoading}></Modal>
        <StudentList students={this.state.students}></StudentList>
        <div className="pager">
          <Pager
            current={this.state.current}
            total={this.state.total}
            limit={this.state.limit}
            panelNumber={this.state.panelNumber}
            onPageChange={this.handlePageChange}
          ></Pager>
        </div>
      </div>
    );
  }
}
