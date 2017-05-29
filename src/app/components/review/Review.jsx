import React from 'react';
import { connect } from 'react-redux';
import Task from '../common/task/Task.jsx';

function Review() {
  return (
    <div className="container review">
      <div className="completed-list">
      List of completed tasks with links to see the work done on those tasks (e.g. notes, code, sent-email)
      </div>
      <Task />
    </div>
  );
}

function mapStateToProps(state) {
  return {
   
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Review);