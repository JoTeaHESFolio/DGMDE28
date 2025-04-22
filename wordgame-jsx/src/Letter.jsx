import React from "react";

function Letter({ char, status }) {
  return <div className={`letter ${status}`}>{char.toUpperCase()}</div>;
}

export default Letter;
// //Jody's notes, primarily to help me remember information for the final exam.
// // The Letter component is responsible for rendering a single letter in the Wordgame board
