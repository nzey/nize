import React from 'react';
import { connect } from 'react-redux';
import Tile from '../tile/Tile.jsx';
// https://github.com/jhabdas/tictactoe/blob/master/src/app/components/board/Board.jsx

function Board(
  // {
  // boardData,
  // onTileClick
// }
) {
  const decoy = [
    ['x', null, 'o'],
    ['x', null, 'o'],
    [null, null, 'x'],
  ];

  return (
    <div className="container play">
      <h1>Play</h1>
      <div className="board">
      {decoy.map((row, rowId) =>
        <div className="row" key={rowId}>
          {row.map((val, colId) => {
            const coordinate = [rowId, colId];
            return <Tile coord={coordinate} owner={val} onTileClick={() => console.log(coordinate)} />;
          })}
        </div>
      )}
      </div>
    </div>
  );
}


function mapStateToProps(state) {
  return {
    // boardData: state.board.boardData,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // onTileClick: (player, tile) => {
    //   dispatch(chooseMove(player, tile))
    // },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);