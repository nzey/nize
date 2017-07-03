import React, { Component } from 'react';
import { Button, Dropdown, Form } from 'semantic-ui-react';
import timeOptions from './timeOptions';
// import axios from 'axios';

class AddTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      time: '',
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e, data) {
    const stateKey = e.target.name ? e.target.name : data.name;
    const newState = {};
    newState[stateKey] = e.target.value ? e.target.value : data.value;
    this.setState(Object.assign(this.state, newState));
  }

  handleSubmit(e) {
    console.log('title: ', this.state.title);
    console.log('descritpion: ', this.state.description);
    console.log('time: ', this.state.time);
    // axios post task
    // trigger new get request
    this.props.closeModal();
  }

  handleCancel() {
    this.props.closeModal();
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Task Title</label>
          <input name='title' placeholder='Task title (keep it short)' value={this.state.title} onChange={this.handleInput} />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <input name='description' placeholder='your description here' value={this.state.description} onChange={this.handleInput} />
        </Form.Field>
        <Form.Field>
          <Dropdown name='time' placeholder='Time Estimate' onChange={this.handleInput} fluid search selection options={timeOptions} />
        </Form.Field>
        <Button type='submit'>Add</Button>
        <Button type='submit'>Cancel</Button>
      </Form>
    );
  };
}

export default AddTaskForm;
