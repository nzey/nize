import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import Types from '../../../constants';
import { loadTasks, setCurrentView } from '../../../actions/tasksActions';

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

class Card extends React.Component {

  // TODO: (1) id should go in breadcrum at the top (2) id should go into query string
  handle(e, parent) {
    if (e.shiftKey) {
      this.props.setCurrentView(parent);
      this.props.loadTasks(parent);
    }
  }

  render() {
    let { id, title, position } = this.props.task;
    position = position ? JSON.parse(position) : [0, 0];
    const { isDragging, connectDragSource } = this.props;
    return connectDragSource(
      <div onClick={(e) => this.handle(e, id)} className="card" id={id} style={{ opacity: isDragging ? 0.5 : 1, top: position[1], left: position[0] }}>
        {title}
      </div>
    );
  }
}

Card.propTypes = {
  task: PropTypes.object.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  DragSource: PropTypes.func,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadTasks,
    setCurrentView,
  }, dispatch);
}

// Export the wrapped version
export default DragSource(Types.CARD, cardSource, collect)(connect(
  mapStateToProps,
  mapDispatchToProps
)(Card));
