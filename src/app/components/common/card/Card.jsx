import React from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import Types from '../../../constants';

// http://react-dnd.github.io/react-dnd/docs-overview.html

const cardSource = {
  beginDrag(props) {
    const position = props.task.get('position') ? JSON.parse(props.task.get('position')) : [0, 0];
    return { id: props.task.get('id'), left: position[0], top: position[1] };
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
  const [x, y] = task.get('position') ? JSON.parse(task.get('position')) : [0, 0];
  return connectDragSource(
    <div onClick={(e) => handleClick(e, task)} className="card" id={task.get('id')} style={{ opacity: isDragging ? 0.5 : 1, top: y, left: x }}>
      {task.get('title')}
    </div>
  );
};

Card.propTypes = {
  task: PropTypes.instanceOf(Map).isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  DragSource: PropTypes.func,
  handleClick: PropTypes.func.isRequired,
};

export default DragSource(Types.CARD, cardSource, collect)(Card);
