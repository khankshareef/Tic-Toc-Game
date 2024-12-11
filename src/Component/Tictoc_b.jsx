import React from "react";
import "./Tictoc_b.css";

function Tictoc_b({ startGame, resetGame, winner, currentPlayer, randomNumber }) {
  return (
    <div className="button-head">
      <div className="buttons">
        <button className="button1" onClick={startGame}>
          START GAME
        </button>
        <button className="button2" onClick={resetGame}>
          RESET GAME
        </button>
      </div>
      {randomNumber && !winner && (
        <div className="random-message">
          Player {currentPlayer}'s Turn - Random Number: {randomNumber}
        </div>
      )}
      {winner && <div className="winner-message">{winner} Wins!</div>}
    </div>
  );
}

export default Tictoc_b;
