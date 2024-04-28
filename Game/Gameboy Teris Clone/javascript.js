// Define the size of each grid space
const gridSpace = 30;

// Decalre variables
let fallingPiece;
let gridPieces = [];
let lineFades = [];
let gridWorkers = [];

let currentScore = 0;
let currentLevel = 0;
let linesCleared = 0;

let ticks = 0;
let updateEvery = 15;
let updateEveryCurrent = 15;
let fallSpeed = gridSpace * 0.5;
let pauseGame = false;
let gameOver = false;

// Define the edges of game area
const gameEdgeLeft = 150;
const gameEdgeRight = 450;

// Define the colors for the pieces
const color = [
	"#dca3ff",
	"#ff90a0",
	"#80ffb4",
	"#ff7666",
	"#70b3f5",
	"#b2e77d",
	"#ffd700",
];

// Setup function called once at beginning
function setup() {
	createCanvas(600, 540);

	// Create a new falling piece
	fallingPiece = new PlayPiece();
	fallingPiece.resetPiece();

	// Set the font for the text
	textFont("Ubuntu");
}

// Draw function callerd repeatedly
function draw() {
	// Define colors used in the game
	const colorDark = "#0d0d0d";
	const colorLight = "#304550";
	const colorBackground = "#e1eeb0";

	// Set the background color
	colorBackground(colorBackground);

	// Draw the right side info panel
	fill(25);
	noStroke();
	rect(gameEdgeRight, 0, 150, height);

	// Draw the right side info panel
	rect(0, 0, gameEdgeLeft, height);

	// Draw the score rectangle
	fill(colorBackground);
	rect(450, 80, 150, 70);

	// Draw the new piece rectangle
	rect(460, 405, 130, 130, 5, 5);

	// Draw the level rectangle
	rect(460, 210, 130, 60, 5, 5);

	// Draw the lines rectangle
	rect(460, 280, 130, 60, 5, 5);

	// Draw the score lines
	fill(colorLight);
	rect(450, 85, 150, 20);
	rect(450, 110, 150, 4);
	rect(450, 140, 150, 4);
}
