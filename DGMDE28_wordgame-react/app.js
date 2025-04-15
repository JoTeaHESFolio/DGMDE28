//JS App construct from instructions
//Create a Wordle board with 6 rows × 5 letters.
//Add a keyboard UI (A–Z). Hardcode 3 guesses: "might", "flood", "stray". Compare
//those guesses to the answer "moody" and color the letters accordingly. Use
//components, even without interactivity.

//Use React.createElement() to create elements instead of JSX. Use ReactDOM to render.
//hardcode the answer and guesses. Use a function to determine letter colors based on the answer.
const { createElement, Fragment } = React;
const root = ReactDOM.createRoot(document.getElementById("root"));

const ANSWER = "moody";
const GUESSES = ["might", "flood", "stray"];

// Letter coloring logic (from my original wordgame project)
function getLetterColors(guess, answer) {
  const result = Array(5).fill("white-black");
  const answerLetters = answer.split("");

  // First pass: correct position
  for (let i = 0; i < 5; i++) {
    if (guess[i] === answer[i]) {
      result[i] = "crimson-white";
      answerLetters[i] = null;
    }
  }

  // Second pass: wrong position
  for (let i = 0; i < 5; i++) {
    if (result[i] !== "crimson-white") {
      const idx = answerLetters.indexOf(guess[i]);
      if (idx !== -1) {
        result[i] = "grey-black";
        answerLetters[idx] = null;
      }
    }
  }

  return result;
}

// WordRow component (1 row of 5 letters)
function WordRow({ word, colorClasses }) {
  const letters = word.split("").map((letter, i) =>
    createElement(
      "div",
      {
        key: i,
        className: `input-box ${colorClasses[i]}`,
      },
      letter.toUpperCase()
    )
  );
  return createElement("div", { className: "game-board" }, letters);
}

// Main Board component
function Board() {
  const rows = GUESSES.map((guess, i) => {
    const colors = getLetterColors(guess, ANSWER);
    return createElement(WordRow, {
      key: i,
      word: guess,
      colorClasses: colors,
    });
  });

  // Fill remaining rows
  for (let i = GUESSES.length; i < 6; i++) {
    const empty = createElement(WordRow, {
      key: i,
      word: "     ",
      colorClasses: Array(5).fill("white-black"),
    });
    rows.push(empty);
  }

  return createElement("div", null, rows);
}

// Keyboard component
function Keyboard() {
  const keys = "QWERTYUIOPASDFGHJKLZXCVBNM".split("").map((letter, i) =>
    createElement(
      "button",
      {
        key: i,
        className: "keyboard-key",
        disabled: true,
      },
      letter
    )
  );

  return createElement("div", { className: "keyboard" }, keys);
}

// App
function App() {
  return createElement(
    Fragment,
    null,
    createElement("h1", null, "Jody's React Wordgame (No JSX)"),
    createElement(Board),
    createElement("h3", null, "Keyboard (disabled for now)"),
    createElement(Keyboard)
  );
}

root.render(createElement(App));
