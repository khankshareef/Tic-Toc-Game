import React, { useEffect, useState } from "react";
import "./App.css";
import Tic_toc1 from "./Component/Tic_toc1";
import Tic_toc2 from "./Component/Tic_toc2";
import Tictoc_b from "./Component/Tictoc_b";

function App() {
  const [board1, setBoard1] = useState(Array(9).fill(null)); // Player 1 board
  const [board2, setBoard2] = useState(Array(9).fill(null)); // Player 2 board
  const [gameStarted, setGameStarted] = useState(false);
  const [randomNumber, setRandomNumber] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(1); // 1 for Player 1, 2 for Player 2
  const [winner, setWinner] = useState(null);
  const [usedNumbers, setUsedNumbers] = useState([]);

  const checkWinner = (board, mark) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];
    return winPatterns.some((pattern) =>
      pattern.every((index) => board[index] === mark)
    );
  };

  const handleStartGame = () => {
    if (board1.includes(null) || board2.includes(null)) {
      alert("Please fill both boards with numbers 1-9 before starting.");
      return;
    }

    setGameStarted(true);
    setCurrentPlayer(1);
    setWinner(null);
    setUsedNumbers([]);
    generateRandomNumber();
  };

  const generateRandomNumber = () => {
    let newNumber;
    do {
      newNumber = Math.floor(Math.random() * 9) + 1;
    } while (usedNumbers.includes(newNumber));
    setRandomNumber(newNumber);
    setUsedNumbers((prev) => [...prev, newNumber]);
  };

  const playTurn = () => {
    if (!gameStarted || winner) return;

    const currentBoard = currentPlayer === 1 ? board1 : board2;
    const mark = currentPlayer === 1 ? "X" : "X";

    const index = currentBoard.findIndex((cell) => cell === randomNumber);

    if (index !== -1) {
      const updatedBoard = [...currentBoard];
      updatedBoard[index] = mark;

      if (currentPlayer === 1) setBoard1(updatedBoard);
      else setBoard2(updatedBoard);

      if (checkWinner(updatedBoard, mark)) {
        setWinner(`Player ${currentPlayer}`);
        setGameStarted(false);
        return;
      }
    }

    // Switch player and generate a new random number
    setCurrentPlayer((prev) => (prev === 1 ? 2 : 1));
    setTimeout(generateRandomNumber, 500);
  };

  useEffect(() => {
    if (gameStarted && randomNumber !== null) {
      setTimeout(playTurn, 1000);
    }
  }, [randomNumber]);

  const handleResetGame = () => {
    setBoard1(Array(9).fill(null));
    setBoard2(Array(9).fill(null));
    setGameStarted(false);
    setWinner(null);
    setCurrentPlayer(1);
    setRandomNumber(null);
    setUsedNumbers([]);
  };

  const handleNumberEntry = (index, value, player) => {
    if (gameStarted) return;

    const num = parseInt(value, 10);

    if (isNaN(num) || num < 1 || num > 9) {
      alert("Please enter a valid number between 1 and 9.");
      return;
    }

    if (
      (player === 1 && board1.includes(num)) ||
      (player === 2 && board2.includes(num))
    ) {
      alert(`The number ${num} is already used in Player ${player}'s board.`);
      return;
    }

    if (player === 1) {
      const updatedBoard = [...board1];
      updatedBoard[index] = num;
      setBoard1(updatedBoard);
    } else {
      const updatedBoard = [...board2];
      updatedBoard[index] = num;
      setBoard2(updatedBoard);
    }
  };

  return (
    <div className="container">
       <h1 style={{marginBottom:'49px',color:'green',fontFamily:'fantasy'}}>Fill both boards with numbers 1-9 brfore starting</h1>
      <div className="container1">
        <Tic_toc1
          board={board1}
          handleNumberEntry={(index, value) => handleNumberEntry(index, value, 1)}
        />
        <Tic_toc2
          board={board2}
          handleNumberEntry={(index, value) => handleNumberEntry(index, value, 2)}
        />
      </div>
      <div className="container2">
        <Tictoc_b
          startGame={handleStartGame}
          resetGame={handleResetGame}
          winner={winner}
          currentPlayer={currentPlayer}
          randomNumber={randomNumber}
        />
      </div>
    </div>
  );
}

export default App;