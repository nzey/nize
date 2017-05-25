import React from 'react';

// svg icons:
// 0: ic_radio_button_unchecked
// X: close

function Tile({ coord, owner, onTileClick }) {
  return <div className="tile" id={coord} onClick={onTileClick}>{owner}</div>;
}

export default Tile;
