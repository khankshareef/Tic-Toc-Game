import React from "react";
import "./Tic_toc.css";

function Tic_toc1({ board, handleCellClick, handleNumberEntry }) {

  return (
    <div className="table-container player1">
      <h1>Player 1</h1>
      <table className="number-table">
        <tbody>
          {Array(3)
            .fill(null)
            .map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array(3)
                  .fill(null)
                  .map((_, colIndex) => (
                    <td key={colIndex}>
                      {board[rowIndex * 3 + colIndex] === null ? (
                        <input
                          type="text"
                          maxLength="1"
                          onChange={(e) =>
                            handleNumberEntry(rowIndex * 3 + colIndex, e.target.value)
                          }
                        />
                      ) : (
                        <span onClick={() => handleCellClick(rowIndex * 3 + colIndex)}>
                          {board[rowIndex * 3 + colIndex]}
                        </span>
                      )}
                    </td>
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tic_toc1;