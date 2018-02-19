import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Header from './common/Header';
import { loadTasks } from '../actions/tasksActions';

class App extends Component {
  constructor(props) {
    super(props);
    this.props.loadTasks();
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
    loadTasks,
  }, dispatch);
}

export default DragDropContext(HTML5Backend)(connect(
    mapStateToProps,
    mapDispatchToProps
  )(App));
