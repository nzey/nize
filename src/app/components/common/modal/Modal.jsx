import React from 'react'
import { Button, Header, Modal } from 'semantic-ui-react';
import AddTaskForm from '../form/AddTaskForm.jsx';

const modalSpecs = (type, closeModalFunc) => {
  const specs = {};
  switch (type) {
  case 'addTask':
    specs.buttonText = 'Add Task';
    specs.content = <AddTaskForm closeModal={closeModalFunc} />;
    break;
  default:
    break;
  }
  return specs;
}

const ModalController = (props) => (
  <Modal open={props.isOpen} >
    <Modal.Header>Add Task</Modal.Header>
    <Modal.Content form>
      {modalSpecs(props.type, props.closeModal).content}
    </Modal.Content>
  </Modal>
);

export default ModalController;
