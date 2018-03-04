import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Header from './common/Header';
import LoadTasksAction from '../actions/LoadTasksAction';

class App extends Component {
  constructor(props) {
    super(props);
    axios.get('http://localhost:5000/api/tasks').then(
      tasks => this.props.LoadTasksAction(tasks.data),
      error => { throw Error(error); }
    );
  }

  render() {
    return (
      <div className="container">
        <Header />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object,
  LoadTasksAction: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    LoadTasksAction,
  }, dispatch);
}

export default DragDropContext(HTML5Backend)(connect(
    mapStateToProps,
    mapDispatchToProps
  )(App));
