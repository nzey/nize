import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Card from '../common/card/Card.jsx';

function Review() {
  return (
    <div className="container review">
      <div className="completed-list">
      List of completed tasks with links to see the work done on those tasks (e.g. notes, code, sent-email)
      </div>
    </div>
  );
}

Review.propTypes = {};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Review);
