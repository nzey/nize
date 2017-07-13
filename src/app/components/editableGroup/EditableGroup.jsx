import React, { Component } from 'react';
// import { Button } from 'semantic-ui-react';

class EditableGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="editableGroup">
        <div className="groupHeader">Group Title</div>
        <div>drag task here</div>
        <div>drag task here</div>
        <div>drag task here</div>
        <div>drag task here</div>
      </div>
    );
  }
}

export default EditableGroup;
