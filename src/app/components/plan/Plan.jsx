import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { DropTarget } from 'react-dnd';
import axios from 'axios';
import Types from '../../constants';
import Card from '../common/card/Card.jsx';
import Modal from '../common/modal/Modal.jsx';
import moveCardAction from '../../actions/moveCard.js';
import { loadTasks, setCurrentView } from '../../actions/tasksActions.js';

class Plan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
  }

  moveCard(itemId, left, top) {
    // axios call to change position in database
    axios.put('/tasks', {
      id: itemId,
      position: `[${left}, ${top}]`,
    })
    .then(response => console.log(response))
    .catch(error => console.log(error));
    this.props.moveCardAction(itemId, left, top);
  }

  handleCrumbClick(parent) {
    this.props.setCurrentView(parent);
    this.props.loadTasks(parent.id);
  }

  render() {
    const { connectDropTarget, allTasks, parents } = this.props;
    return parents ? connectDropTarget(
      <div className="container plan">
        <div>
          { parents.map(parent => {
            return parent ? <span key={parent.id} onClick={() => this.handleCrumbClick(parent)}>{parent.title}</span> : null; })
          }
        </div>
        
        <Button onClick={this.toggleModal}>Add Task</Button>
        <Modal type="addTask" isOpen={this.state.modalIsOpen} closeModal={this.toggleModal} />
        <Button onClick={this.toggleBuildingGroup}>Add Group</Button>

        <div className="cardContainer">
          {allTasks.map(task => {
            return <Card key={task.id} task={task} />;
          })}
        </div>

      </div>) : <div>loading</div>;
  }
}

const dropSpecs = {
  drop: (props, monitor, component) => {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    let left = Math.round(item.left + delta.x);
    let top = Math.round(item.top + delta.y);
    left = left >= 0 ? left : 0;
    top = top >= 0 ? top : 0;
    component.moveCard(item.id, left, top);
  },
  hover: (props, monitor, component) => console.log('hovering. Can drop? ', monitor.canDrop()),
  canDrop: (props, monitor) => {
    return true;
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

const PlanAsDropTarget = DropTarget(Types.CARD, dropSpecs, collect)(Plan);

Plan.propTypes = {
  allTasks: PropTypes.array,
  moveCardAction: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    allTasks: state.tasks,
    parents: state.parents,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    moveCardAction,
    loadTasks,
    setCurrentView,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlanAsDropTarget);
