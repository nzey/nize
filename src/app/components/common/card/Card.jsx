import React, { PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import Types from '../../../constants';
// http://react-dnd.github.io/react-dnd/docs-overview.html

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const CardActions = {
  moveCardToList: (itemId, dropResultListId) => {
    console.log('moveCarToList params: ', itemId, ' and ', dropResultListId);
  },
};

const cardSource = {
  beginDrag(props) {
    // Return the data describing the dragged item
    const item = { id: props.id };
    return item;
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      console.log("Can't place there")
      return;
    }

    // When dropped on a compatible target, do something
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    console.log('endDrag, monitor: ', monitor)
    console.log('endDrag, component: ', component)
    CardActions.moveCardToList(item, dropResult);
  }
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
    const { id, title } = this.props.task;
    // These two props are injected by React DnD,
    // as defined by your `collect` function above:
    const { isDragging, connectDragSource } = this.props;

    return connectDragSource(
      <div className="card" id={id} style={{ opacity: isDragging ? 0.5 : 1 }}>
        {title}
      </div>
    );
  }
}

Card.propTypes = { task: PropTypes.object };

// Export the wrapped version
export default DragSource(Types.CARD, cardSource, collect)(Card);