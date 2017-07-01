import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Task from '../common/task/Task.jsx';

function Plan(props) {
  return (
    <div className="container plan">
      <h2>Plansss</h2>
      {props.allTasks.data.map(task => <Task key={task.id} task={task} />)}
    </div>
  );
}

Plan.propTypes = { allTasks: PropTypes.object };


function mapStateToProps(state) {
  return {
    allTasks: state.allTasks,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Plan);
