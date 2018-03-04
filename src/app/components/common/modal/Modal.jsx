import React from 'react';
import { Header, Modal } from 'semantic-ui-react';
import AddTaskForm from '../form/AddTaskForm.jsx';

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
}

const ModalController = (props) => (
  <Modal open={props.isOpen} >
    <Modal.Header>Add Task</Modal.Header>
    <Modal.Content form>
      {modalSpecs(props.type, props.closeModal)}
    </Modal.Content>
  </Modal>
);

export default ModalController;
