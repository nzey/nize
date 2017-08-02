import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
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
    const { allTasks } = this.props;
    return (
      <div className="container plan">
        <Button onClick={this.toggleModal}>Add Task</Button>
        <Modal type="addTask" isOpen={this.state.modalIsOpen} closeModal={this.toggleModal} />
        <Button onClick={this.toggleBuildingGroup}>Add Group</Button>
        <div className="cardContainer">
          {this.state.buildingGroup ? <EditableGroup /> : null}
          {allTasks.map(task => <Card key={task.id} task={task} />)}
        </div>
      </div>
    );
  }
}

Plan.propTypes = { allTasks: PropTypes.array };

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
