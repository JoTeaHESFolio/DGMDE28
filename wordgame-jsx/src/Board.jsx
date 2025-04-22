import React from "react";
import Row from "./Row";

function Board({ answer, guesses }) {
  // Function to determine letter colors based on the answer
  const totalRows = 6;
  const rows = [];
  for (let i = 0; i < totalRows; i++) {
    const guess = guesses[i] || ""; // Use the guess or an empty string if not availabl
    rows.push(<Row key={i} guess={guess} answer={answer} />);
  }
  return <div className="Board">{rows}</div>;
}
export default Board;
// //Jody's notes, primarily to help me remember information for the final exam.

// // The Board component is responsible for rendering the Wordgame board.
// // It takes the answer and guesses as props and uses them to render the rows of the board.
