import React from 'react';
import PropTypes from 'prop-types';
import { Map, List } from 'immutable';

const Crumb = ({ crumb, index, last, handleClick }) => {
  const isActive = index === last;
  return (
    <div className='crumb-container' key={crumb.get('id')}>
      <div
        className={isActive ? 'crumb active' : 'crumb link'}
        onClick={isActive ? null : (() => handleClick(crumb))}
      >{crumb.get('title')}</div>
      {index === last ? null : <div className='divider'>></div>}
    </div>);
};

Crumb.propTypes = {
  crumb: PropTypes.instanceOf(Map).isRequired,
  index: PropTypes.number.isRequired,
  last: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

const Breadcrumb = ({ crumbs, handleClick }) => {
  return (
    <div className='breadcrumb'>
      {crumbs.map((crumb, index, list) => (<Crumb
        key={crumb.get('id')}
        crumb={crumb} index={index}
        last={list.size - 1}
        handleClick={handleClick}
      />))}
    </div>
  );
};

Breadcrumb.propTypes = {
  crumbs: PropTypes.instanceOf(List).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Breadcrumb;
