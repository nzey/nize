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
import EditableGroup from '../editableGroup/EditableGroup.jsx';
import moveCardAction from '../../actions/moveCard.js';

class Plan extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      modalIsOpen: false,
      buildingGroup: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleBuildingGroup = this.toggleBuildingGroup.bind(this);
  }

  toggleModal() {
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
  }

  toggleBuildingGroup() {
    this.setState({ buildingGroup: !this.state.buildingGroup });
  }

  moveCard(itemId, left, top) {
    // axios call to change position in database
    axios.put('http://localhost:5000/api/tasks', {
      id: itemId,
      position: `[${left}, ${top}]`,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    }); 
    console.log(`plan's moveCard method called with: [${left}, ${top}]`)
    this.props.moveCardAction(itemId, left, top);
  }

  render() {
    const { connectDropTarget, allTasks } = this.props;
    
    return connectDropTarget(
      <div className="container plan">
        <Button onClick={this.toggleModal}>Add Task</Button>
        <Modal type="addTask" isOpen={this.state.modalIsOpen} closeModal={this.toggleModal} />
        <Button onClick={this.toggleBuildingGroup}>Add Group</Button>
        <div className="cardContainer">
          {this.state.buildingGroup ? <EditableGroup /> : null}
          {allTasks.map(task => {
            console.log('task: ', task);
            return <Card key={task.id} task={task} />;
          })}
        </div>
      </div>
    );
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
    connectDropTarget: connect.dropTarget()
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
    allTasks: state.allTasks,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    moveCardAction,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlanAsDropTarget);
