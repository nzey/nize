import React, { PropTypes } from 'react';

function Task(props) {
  return <div className="task">{props.task.title}</div>;
}

Task.propTypes = { task: PropTypes.object };

export default Task;
