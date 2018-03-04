import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import Types from '../../../constants';
import { loadTasks, setCurrentView } from '../../../actions/TasksActions';

// http://react-dnd.github.io/react-dnd/docs-overview.html

const cardSource = {
  beginDrag(props) {
    const position = props.task.position ? JSON.parse(props.task.position) : [0, 0];
    const item = { id: props.task.id, left: position[0], top: position[1] };
    return item;
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    // TODO: use these to do something when dropped on a compatible target
    // const item = monitor.getItem();
    // const dropResult = monitor.getDropResult();
    // console.log('cardSource endDrag, monitor: ', monitor);
    // console.log('endDragSource endDrag, component: ', component);
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

const Card = ({ task, handleClick, isDragging, connectDragSource }) => {
  const { id, title, position } = task;
  const [x, y] = position ? JSON.parse(position) : [0, 0];
  return connectDragSource(
    <div onClick={(e) => handleClick(e, { id, title })} className="card" id={id} style={{ opacity: isDragging ? 0.5 : 1, top: y, left: x }}>
      {title}
    </div>
  );
};

Card.propTypes = {
  task: PropTypes.object.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  DragSource: PropTypes.func,
  handleClick: PropTypes.func.isRequired,
};

export default DragSource(Types.CARD, cardSource, collect)(Card);
