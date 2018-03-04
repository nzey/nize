import React from 'react';
import PropTypes from 'prop-types';

const Crumb = ({ parent, index, last, handleClick }) => {
  const isActive = index == last;
  return (
    <span key={parent.id}>
      <span className={isActive ? 'crumb active' : 'crumb link'} onClick={() => isActive ? null : handleClick(parent)} >{parent.title}</span>
      {index < last ? <span className='divider'>></span> : null}
    </span>);
};

Crumb.propTypes = {
  parent: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  last: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

const Breadcrumb = ({ parents, handleClick }) => {
  return (
    <div className='breadcrumb'>
      {parents.map((parent, index, array) => <Crumb parent={parent} index={index} last={array.length - 1} handleClick={handleClick} />)}
    </div>
  );
};

Breadcrumb.propTypes = {
  parents: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Breadcrumb;
