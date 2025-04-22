import React from "react";
import Letter from "./Letter";

function Row({ guess, answer }) {
  const letters = guess
    .padEnd(5)
    .split("")
    .map((char, i) => {
      let status = "empty";

      if (char === answer[i]) {
        status = "correct";
      } else if (answer.includes(char)) {
        status = "present";
      } else {
        status = "absent";
      }
      return <Letter key={i} char={char} status={status} />;
    });

  return <div className="row">{letters}</div>;
}

export default Row;
// //Jody's notes, primarily to help me remember information for the final exam.
// // The Row component is responsible for rendering a single row of letters in the Wordgame board.
// // It takes the guess and answer as props and uses them to determine the status of each letter (correct, present, absent) based on the answer.
// // The letters are rendered using the Letter component, which is responsible for displaying the individual letters with their corresponding styles based on their status.
// // The Row component is exported as the default export of the module.
