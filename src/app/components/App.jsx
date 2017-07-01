import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import Header from './common/Header';
import LoadTasksAction from '../actions/LoadTasksAction';

class App extends Component {
  constructor(props) {
    super(props);
    axios.get('http://localhost:5000/api/tasks').then(tasks => {
      this.props.LoadTasksAction(tasks);
    });
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

App.propTypes = { children: PropTypes.object };

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
)(App);
