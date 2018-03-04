import React from 'react';
import PropTypes from 'prop-types';

const Crumb = ({ crumb, index, last, handleClick }) => {
  const isActive = index === last;
  return (
    <div className='crumb-container' key={crumb.id}>
      <div className={isActive ? 'crumb active' : 'crumb link'} onClick={() => isActive ? null : handleClick(crumb)} >{crumb.title}</div>
      { index == last ? null : <div className='divider'>></div>}
    </div>);
};

Crumb.propTypes = {
  crumb: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  last: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

const Breadcrumb = ({ crumbs, handleClick }) => {
  return (
    <div className='breadcrumb'>
      {crumbs.map((crumb, index, array) => <Crumb crumb={crumb} index={index} last={array.length - 1} handleClick={handleClick} />)}
    </div>
  );
};

Breadcrumb.propTypes = {
  crumbs: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Breadcrumb;
