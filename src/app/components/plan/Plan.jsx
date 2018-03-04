import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { DropTarget } from 'react-dnd';
import axios from 'axios';
import Types from '../../constants';
import Card from '../common/card/Card.jsx';
import Modal from '../common/modal/Modal.jsx';
import moveCard from '../../actions/MoveCard.js';
import { loadTasks, setCurrentView } from '../../actions/TasksActions.js';
import Breadcrumb from '../common/breadcrumb/Breadcrumb.jsx';

class Plan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleCrumbClick = this.handleCrumbClick.bind(this);
  }

  toggleModal() {
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
  }

  // TODO: Move http put into moveCard, rename action to 'moveCard'
  setCardPosition(itemId, left, top) {
    // axios call to change position in database
    axios.put('/tasks', {
      id: itemId,
      position: `[${left}, ${top}]`,
    })
    .then(response => console.log(response))
    .catch(error => console.log(error));
    this.props.moveCard(itemId, left, top);
  }

  handleCrumbClick(crumb) {
    this.props.setCurrentView(crumb);
    this.props.loadTasks(crumb.id);
  }

  render() {
    const { connectDropTarget, allTasks, crumbs } = this.props;
    return crumbs ? connectDropTarget(
      <div className="container plan">
        <div className="planTools">
          <Button id='addTask' onClick={this.toggleModal}>Add Task</Button>
          {crumbs ? <Breadcrumb crumbs={crumbs} handleClick={this.handleCrumbClick} /> : null}
          <Modal type="addTask" isOpen={this.state.modalIsOpen} closeModal={this.toggleModal} />
        </div>
        <div className="cardContainer">
          {allTasks.map(task => {
            return <Card key={task.id} task={task} />;
          })}
        </div>

      </div>) : <div>loading</div>;
  }
}

const dropSpecs = {
  drop: (props, monitor, component) => {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    let left = Math.round(item.left + delta.x);
    let top = Math.round(item.top + delta.y);
    left = left >= 0 ? left : 0;
    top = top >= 0 ? top : 0;
    component.setCardPosition(item.id, left, top);
  },
  hover: (props, monitor, component) => console.log('hovering. Can drop? ', monitor.canDrop()),
  canDrop: (props, monitor) => {
    return true;
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

const PlanAsDropTarget = DropTarget(Types.CARD, dropSpecs, collect)(Plan);

Plan.propTypes = {
  allTasks: PropTypes.array,
  crumbs: PropTypes.array,
  moveCard: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  setCurrentView: PropTypes.func.isRequired,
  loadTasks: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    allTasks: state.tasks,
    crumbs: state.crumbs,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    moveCard,
    loadTasks,
    setCurrentView,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlanAsDropTarget);
