import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import Types from '../../../constants';
// http://react-dnd.github.io/react-dnd/docs-overview.html

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const cardSource = {
  beginDrag(props) {
    // Return the data describing the dragged item
    const position = props.task.position ? JSON.parse(props.task.position) : [0, 0];
    const item = { id: props.task.id, left: position[0], top: position[1] };
    return item;
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    // When dropped on a compatible target, do something
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    console.log('cardSource endDrag, monitor: ', monitor)
    console.log('endDragSource endDrag, component: ', component)
  },
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  };
}

class Card extends React.Component {

  render() {
    // Your component receives its own props as usual
    let { id, title, position } = this.props.task;
    console.log('position in render: ', position)
    position = position ? JSON.parse(position) : [0, 0];
    // These two props are injected by React DnD,
    // as defined by your `collect` function above:
    const { isDragging, connectDragSource } = this.props;
    return connectDragSource(
      <div className="card" id={id} style={{ opacity: isDragging ? 0.5 : 1, top: position[1], left: position[0] }}>
        {title}
      </div>
    );
  }
}

Card.propTypes = {
  task: PropTypes.object.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  DragSource: PropTypes.func.isRequired,
};

// Export the wrapped version
export default DragSource(Types.CARD, cardSource, collect)(Card);