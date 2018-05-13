import moment from 'moment';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Dropdown, Form } from 'semantic-ui-react';
import axios from 'axios';
import { timeOptions } from './options';
import { loadTasks } from '../../actions/TasksActions';

class AddTaskForm extends Component {
  constructor(props) {
    super(props);
    let defaultTime = props.task ? props.task.get('estimatedTime') : '';
    if (defaultTime) {
      const duration = moment.duration(defaultTime, 'minutes');
      defaultTime = moment.utc(duration.asMilliseconds()).format('HH:mm');
    }
    this.state = {
      id: props.task ? props.task.get('id') : null,
      title: props.task ? props.task.get('title') : '',
      description: props.task ? props.task.get('description') : '',
      estimatedTime: defaultTime,
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
    const timeAsMinutes = moment.duration(this.state.estimatedTime, 'hh:mm').asMinutes();
    const data = Object.assign({}, this.state, { parentId: this.props.projectId, estimatedTime: timeAsMinutes });
    if (this.state.id) {
      axios.put('/tasks', data).then(() => this.props.loadTasks(this.props.projectId));
    } else {
      axios.post('/tasks', data).then(() => this.props.loadTasks(this.props.projectId));
    }
    this.props.closeModal();
  }

  handleCancel() {
    this.props.closeModal();
  }

  render() {
    let title = this.state.title || 'Task title (keep it short)';
    let description = this.state.description || 'your description here';
    let timeEstimate = this.state.estimatedTime || 'time estimate';
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Task Title</label>
          <input name='title' placeholder={title} value={this.state.title} onChange={this.handleInput} />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <input name='description' placeholder={description} value={this.state.description} onChange={this.handleInput} />
        </Form.Field>
        <Form.Field>
          <label>Estimate the time it will take you to complete this task</label>
          <Dropdown name='estimatedTime' placeholder={timeEstimate} onChange={this.handleInput} fluid search selection options={timeOptions} />
        </Form.Field>
        <Button type='submit'>{this.props.task ? 'Update' : 'Add'}</Button>
        <Button type='submit'>Cancel</Button>
      </Form>
    );
  };
}


AddTaskForm.propTypes = {
  loadTasks: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  projectId: PropTypes.number,
  task: PropTypes.instanceOf(Map),
};

const getCurrentCrumb = (state) => {
  const project = state.crumbs.last();
  return project ? project.get('id') : null;
};

function mapStateToProps(state) {
  return { projectId: getCurrentCrumb(state) };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadTasks,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTaskForm);
