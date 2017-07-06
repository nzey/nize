import React from 'react';
import { connect } from 'react-redux';
// import Card from '../common/card/Card.jsx';

function Today() {
  return (
    <div className="container today">
      <div className="today-list">List only the tasks to be done today</div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
   
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Today);