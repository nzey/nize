import React from 'react';

// svg icons:
// 0: ic_radio_button_unchecked
// X: close

function Tile({ coord }) {
  return <div className="tile" id={coord}>X</div>;
}

export default Tile;
