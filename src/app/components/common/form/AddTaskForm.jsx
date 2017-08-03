import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Dropdown, Form } from 'semantic-ui-react';
import axios from 'axios';
import { timeOptions, confidenceOptions } from './options';
import LoadTasksAction from '../../../actions/LoadTasksAction';

class AddTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      estimatedTime: '',
      estimateConfidence: null,
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
    axios({
      method: 'POST',
      url: 'http://localhost:5000/api/tasks',
      data: this.state,
    }).then(() => {
      return axios.get('http://localhost:5000/api/tasks');
    }).then(tasks => {
      this.props.LoadTasksAction(tasks.data);
    });
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
          <label>Estimate the time it will take you to complete this task</label>
          <Dropdown name='estimatedTime' placeholder='Time Estimate' onChange={this.handleInput} fluid search selection options={timeOptions} />
        </Form.Field>
        <Form.Field>
          <label>How confident are you in this time estimate?</label>
          <Dropdown name='estimateConfidence' placeholder='% confidence' onChange={this.handleInput} fluid search selection options={confidenceOptions} />
        </Form.Field>
        <Button type='submit'>Add</Button>
        <Button type='submit'>Cancel</Button>
      </Form>
    );
  };
}


function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    LoadTasksAction,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTaskForm);