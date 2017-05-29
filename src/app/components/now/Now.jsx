import React from 'react';
import { connect } from 'react-redux';

function Now() {
  return (
    <div className="container now">
      <div className="now-list">This is where you do one task (editor, pdf reader, essential resources, timer, etc)
      </div>
      <div>[Name of the task at hand]</div>
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
)(Now);