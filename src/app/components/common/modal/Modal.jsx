import React from 'react';
import PropTypes from 'prop-types';
import { Header, Modal } from 'semantic-ui-react';
import AddTaskForm from '../../../containers/form/AddTaskForm.jsx';

const modalSpecs = (type, closeModalFunc) => {
  let content = null;
  switch (type) {
    case 'addTask':
      content = <AddTaskForm closeModal={closeModalFunc} />;
      break;
    default:
      break;
    }
  return content;
};

const ModalController = (props) => (
  <Modal open={props.isOpen} >
    <Modal.Header>Add Task</Modal.Header>
    <Modal.Content form>
      {modalSpecs(props.type, props.closeModal)}
    </Modal.Content>
  </Modal>
);

ModalController.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  type: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};

export default ModalController;
