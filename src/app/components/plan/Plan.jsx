import React from 'react';
import { connect } from 'react-redux';
import Task from '../common/task/Task.jsx';

function Plan() {
  return (
    <div className="container plan">
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
)(Plan);