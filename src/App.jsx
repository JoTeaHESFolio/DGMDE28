//JSx App construct from instructions
//Create a Wordle board with 6 rows × 5 letters.
//Add a keyboard UI (A–Z). Hardcode 3 guesses: "might", "flood", "stray". Compare
//those guesses to the answer "moody" and color the letters accordingly. Use
//components, even without interactivity.
//hardcode the answer and guesses. Use a function to determine letter colors based on the answer.
import React from "react";
import Board from "./Board";
import Keyboard from "./Keyboard";

function App() {
  const answer = "moody";
  const guesses = ["might", "flood", "stray"];

  return (
    <div className="app">
      <h1>Jody's Wordgame (JSX Edition)</h1>
      <Board answer={answer} guesses={guesses} />
      <Keyboard />
    </div>
  );
}
export default App;
//Jody's notes, primarily to help me remember information for the final exam.
// The App component is the main component that renders the Word game.
// It imports the Board and Keyboard components and passes the answer and guesses as props to the Board component.
// The Keyboard component is rendered below the Board component. And then the App component is exported as the default export of the module.
