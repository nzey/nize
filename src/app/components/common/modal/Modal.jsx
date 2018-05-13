import React from 'react';
import PropTypes from 'prop-types';
import { Header, Modal } from 'semantic-ui-react';
import AddTaskForm from '../../../containers/form/AddTaskForm.jsx';

const modalSpecs = (type, closeModalFunc, task) => {
  let content = null;
  switch (type) {
    case 'addTask':
      content = <AddTaskForm closeModal={closeModalFunc} />;
      break;
    case 'editTask':
      content = <AddTaskForm closeModal={closeModalFunc} task={task} />;
      break;
    default:
      break;
  }
  return content;
};

const modalHeader = (type) => {
  switch (type) {
    case 'addTask':
      return 'Add Task';
    case 'editTask':
      return 'Edit Task';
    default:
      return '';
  }
};

const ModalController = (props) => (
  <Modal open={props.isOpen} >
    <Modal.Header>{modalHeader(props.type)}</Modal.Header>
    <Modal.Content form>
      {modalSpecs(props.type, props.closeModal, props.task)}
    </Modal.Content>
  </Modal>
);

ModalController.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  type: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  task: PropTypes.instanceOf(Map),
};

export default ModalController;
