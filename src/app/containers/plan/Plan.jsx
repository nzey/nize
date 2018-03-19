import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { DropTarget } from 'react-dnd';
import axios from 'axios';
import { List, Map } from 'immutable';
import Types from '../../constants';
import Card from '../../components/common/card/Card.jsx';
import Modal from '../../components/common/modal/Modal.jsx';
import moveCard from '../../actions/MoveCard.js';
import { loadTasks, setCurrentView } from '../../actions/TasksActions.js';
import Breadcrumb from '../../components/common/breadcrumb/Breadcrumb.jsx';

class Plan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleCrumbClick = this.handleCrumbClick.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
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
  }

  handleCrumbClick(crumb) {
    this.props.setCurrentView(crumb);
    this.props.loadTasks(crumb.get('id'));
  }

  handleCardClick(e, task) {
    if (e.shiftKey) {
      const crumb = Map({ id: task.get('id'), title: task.get('title') });
      this.props.setCurrentView(crumb);
      this.props.loadTasks(task.get('id'));
    }
  }

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
          <Modal type="addTask" isOpen={this.state.modalIsOpen} closeModal={this.toggleModal} />
        </div>
        <div className="cardContainer">
          {allTasks && allTasks.map(task => {
            return <Card key={task.get('id')} task={task} handleClick={this.handleCardClick} />;
          })}
        </div>
      </div>);

    return this.renderContent(connectedDropTarget, loadingTasks, errorFetchingTasks);
  }
}

// item is undefined here
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
  }, dispatch);
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DropTarget(Types.CARD, dropSpecs, collect)
)(Plan);

