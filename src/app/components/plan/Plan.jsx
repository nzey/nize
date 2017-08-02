import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { DropTarget } from 'react-dnd';
import Types from '../../constants';
import Card from '../common/card/Card.jsx';
import Modal from '../common/modal/Modal.jsx';
import EditableGroup from '../editableGroup/EditableGroup.jsx';

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

  render() {
    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <div className="container plan">
        <Button onClick={this.toggleModal}>Add Task</Button>
        <Modal type="addTask" isOpen={this.state.modalIsOpen} closeModal={this.toggleModal} />
        <Button onClick={this.toggleBuildingGroup}>Add Group</Button>
        <div className="cardContainer">
          {this.state.buildingGroup ? <EditableGroup /> : null}
          {this.props.allTasks.data.map(task => <Card key={task.id} task={task} />)}
        </div>
      </div>
    );
  }
}

Plan.propTypes = { allTasks: PropTypes.object };

const dropSpecs = {
  drop: (props, monitor, component) => {
    console.log('compatible item dropped. Good place for flux op');
    return {
      droppedItem: monitor.getItem(),
      initialPos: monitor.getInitialClientOffset(),
      newPos: monitor.getClientOffset(),
    };
  },
  hover: (props, monitor, component) => console.log('hovering. Can drop? ', monitor.canDrop()),
  canDrop: (props, monitor) => {
    console.log('canDrop called');
    return true;
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

// pull out cardContainer div into it's own component. 
// Make that the droptarget.
const PlanAsDropTarget = DropTarget(Types.CARD, dropSpecs, collect)(Plan);

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
)(PlanAsDropTarget);
