import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import { DropTarget } from 'react-dnd';
import axios from 'axios';
import { List, Map, Set } from 'immutable';
import Types from '../../constants';
import Card from '../../components/common/card/Card.jsx';
import Modal from '../../components/common/modal/Modal.jsx';
import moveCard from '../../actions/MoveCard.js';
import { loadTasks, setCurrentView, toggleCardState } from '../../actions/TasksActions.js';
import Breadcrumb from '../../components/common/breadcrumb/Breadcrumb.jsx';

class Plan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      activeCards: Set([]),
      editingTask: null,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleCrumbClick = this.handleCrumbClick.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
    this.editTaskMode = this.editTaskMode.bind(this);
    this.deleteSelected = this.deleteSelected.bind(this);
  }

  // TODO: Move http put into moveCard
  setCardPosition(itemId, left, top) {
    axios.put('/tasks', {
      id: itemId,
      position: `[${left}, ${top}]`,
    })
    .then(response => console.log(response))
    .catch(error => console.log(error));
    this.props.moveCard(itemId, left, top);
  }

  toggleModal() {
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
    if (!this.state.modalIsOpen) {
      this.setState({ editingTask: null });
    }
  }

  handleCrumbClick(crumb) {
    this.props.setCurrentView(crumb);
    this.props.loadTasks(crumb.get('id'));
  }

  handleCardClick(e, task) {
    const id = task.get('id');

    // Change view to show cards for all tasks that are part of (children of)
    //  the clicked task
    if (e.shiftKey) {
      const crumb = Map({ id: id, title: task.get('title') });
      this.props.setCurrentView(crumb);
      this.props.loadTasks(id);

    // Activate or deactivate clicked card for deletion or editing
    } else {
      const prevActive = this.state.activeCards;
      const nowActive = prevActive.has(id) ? prevActive.delete(id) : prevActive.add(id);
      this.setState({ activeCards: nowActive });
    }
  }

  // TODO: warning should pop-up that all subtasks will be deleted too.
  deleteSelected() {
    axios.patch('/tasks', { ids: this.state.activeCards.toJSON() })
    .then(() => { this.props.loadTasks(this.props.crumbs.last().get('id')); })
    .catch(error => console.log(error));
  }

  // TODO: Once change is made to store tasks in map keyed by task-id, then instead of 
  // keeping whole copy of task here, just keep id, and retreive task from redux store
  // TODO: Task being edited should be stored in redux store and accessed from AddTaskForm
  editTaskMode(task) {
    this.toggleModal();
    this.setState({ editingTask: task });
  }

  modalType() { return this.state.editingTask ? 'editTask' : 'addTask'; }

  renderContent(content, loading, error) {
    if (loading) {
      return <div>Loading</div>;
    } else if (error) {
      console.log(error);
      return <div></div>;
    }
    return content;
  }

  render() {
    const { connectDropTarget, allTasks, crumbs, loadingTasks, errorFetchingTasks } = this.props;

    const connectedDropTarget = connectDropTarget(
      <div className="container plan">
        <div className="planTools">
          <Button id='addTask' onClick={this.toggleModal}>Add Task</Button>
          {crumbs && <Breadcrumb crumbs={crumbs} handleClick={this.handleCrumbClick} /> }
          <div className="trashContainer" onClick={this.deleteSelected} >
            <Icon trash name="trash" />
          </div>
          <Modal type={this.modalType()} isOpen={this.state.modalIsOpen} closeModal={this.toggleModal} task={this.state.editingTask} />
        </div>
        <div className="cardContainer">
          {allTasks && allTasks.map(task => {
            return <Card active={this.state.activeCards.has(task.get('id'))}
              key={task.get('id')}
              task={task}
              handleClick={this.handleCardClick}
              editTaskMode={this.editTaskMode}
            />;
          })}
        </div>
      </div>);

    return this.renderContent(connectedDropTarget, loadingTasks, errorFetchingTasks);
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

Plan.propTypes = {
  allTasks: PropTypes.instanceOf(List),
  crumbs: PropTypes.instanceOf(List),
  moveCard: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  setCurrentView: PropTypes.func.isRequired,
  loadTasks: PropTypes.func.isRequired,
  loadingTasks: PropTypes.bool.isRequired,
  errorFetchingTasks: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    plan: state.plan,
    allTasks: state.plan.get('tasks'),
    loadingTasks: state.plan.get('isFetching'),
    errorFetchingTasks: state.plan.get('error'),
    crumbs: state.crumbs,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    moveCard,
    loadTasks,
    setCurrentView,
    toggleCardState,
  }, dispatch);
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DropTarget(Types.CARD, dropSpecs, collect)
)(Plan);
