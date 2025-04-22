// Simulating loading from battleship.json
const shipData = {
  ships: [
    { name: "ship1", orientation: "vertical", size: 4, coords: [2, 3] },
    { name: "ship2", orientation: "horizontal", size: 3, coords: [3, 3] },
    { name: "ship3", orientation: "vertical", size: 2, coords: [6, 5] },
  ],
};

const gridSize = 6;
const maxGuesses = 20;
let guesses = 0;
let remainingShips = [];

const grid = document.getElementById("grid");
const status = document.getElementById("status");
const guessesLeftEl = document.getElementById("guesses-left");
const endMessage = document.getElementById("end-message");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");

// Ship class
class Ship {
  constructor(name, size, orientation, start) {
    this.name = name;
    this.size = size;
    this.orientation = orientation;
    this.start = start; // [col, row]
    this.positions = this.calculatePositions();
    this.hits = new Set();
  }

  calculatePositions() {
    const [col, row] = this.start;
    const positions = [];
    for (let i = 0; i < this.size; i++) {
      const x = this.orientation === "horizontal" ? col + i : col;
      const y = this.orientation === "vertical" ? row + i : row;
      positions.push(`${x},${y}`);
    }
    return positions;
  }

  registerHit(coord) {
    if (this.positions.includes(coord)) {
      this.hits.add(coord);
      return true;
    }
    return false;
  }

  isSunk() {
    return this.hits.size === this.size;
  }
}

// Initialize Game
function createGame() {
  // Reset
  grid.innerHTML = "";
  guesses = 0;
  endMessage.textContent = "";
  guessesLeftEl.textContent = maxGuesses;
  remainingShips = [];

  // Build board
  for (let r = 1; r <= gridSize; r++) {
    for (let c = 1; c <= gridSize; c++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.coord = `${c},${r}`;
      cell.addEventListener("click", handleClick);
      grid.appendChild(cell);
    }
  }

  // Place ships
  shipData.ships.forEach((ship) => {
    const newShip = new Ship(
      ship.name,
      ship.size,
      ship.orientation,
      ship.coords
    );
    remainingShips.push(newShip);
  });
}

function handleClick(e) {
  const cell = e.target;
  const coord = cell.dataset.coord;

  if (cell.classList.contains("hit") || cell.classList.contains("miss")) return;

  guesses++;
  guessesLeftEl.textContent = maxGuesses - guesses;

  let hitSomething = false;
  for (const ship of remainingShips) {
    if (ship.registerHit(coord)) {
      cell.classList.add("hit");
      hitSomething = true;

      if (ship.isSunk()) {
        console.log(`${ship.name} is sunk!`);
      }
      break;
    }
  }

  if (!hitSomething) {
    cell.classList.add("miss");
  }

  // Check for win/loss
  if (remainingShips.every((ship) => ship.isSunk())) {
    endMessage.textContent = "You sunk all ships!";
    revealShips();
    disableBoard();
  } else if (guesses >= maxGuesses) {
    endMessage.textContent = "Game Over! You ran out of guesses.";
    revealShips();
    disableBoard();
  }
}

function revealShips() {
  document.querySelectorAll(".cell").forEach((cell) => {
    const coord = cell.dataset.coord;
    for (const ship of remainingShips) {
      if (ship.positions.includes(coord) && !cell.classList.contains("hit")) {
        cell.classList.add("ship-reveal");
      }
    }
  });
}

function disableBoard() {
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.removeEventListener("click", handleClick);
  });
}
function resetGame() {
  grid.innerHTML = "";
  endMessage.textContent = "";
  status.querySelector("#guesses-left").textContent = maxGuesses;
  startBtn.disabled = false;
  resetBtn.disabled = true;
}

startBtn.addEventListener("click", () => {
  createGame();
  startBtn.disabled = true;
  resetBtn.disabled = false;
});

resetBtn.addEventListener("click", resetGame);
