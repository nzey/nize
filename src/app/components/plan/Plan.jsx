import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import Task from '../common/task/Task.jsx';
import Modal from '../common/modal/Modal.jsx';

class Plan extends Component {
  constructor(props) {
    super(props);
    this.state = { modalIsOpen: false };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
  }

  render() {
    return (
      <div className="container plan">
        <h2>Plans</h2>
        <Button onClick={this.toggleModal}>Add Task</Button>
        <Modal type="addTask" isOpen={this.state.modalIsOpen} closeModal={this.toggleModal} />
        {this.props.allTasks.data.map(task => <Task key={task.id} task={task} />)}
      </div>
    );
  }
}

Plan.propTypes = { allTasks: PropTypes.object };


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
