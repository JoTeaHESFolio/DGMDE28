//this is just a visual mock-up of the keyboard, it is not interactive yet.
import React from "react";
import "./Style.css"; // Import the CSS file for styling

const rows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

function Keyboard() {
  return (
    <div className="Keyboard">
      {rows.map((row, i) => (
        <div key={i} className="keyboard-row">
          {row.split("").map((key) => (
            <div key={key} className="key">
              {key}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
export default Keyboard;
// //Jody's notes, primarily to help me remember information for the final exam.
// // The Keyboard component is responsible for rendering the keyboard UI for the Wordgame.
// // It uses a hardcoded array of rows to create the keyboard layout and maps over the keys to render them as individual div elements with the class "key".
// // The keys are displayed in rows, and the component is styled using CSS imported from a separate file (style.css).
// // The Keyboard component is exported as the default export of the module.
