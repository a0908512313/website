const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
const gameOverScreen = document.getElementById("gmae-over");
const restartBtn = document.getElementById("restart-btn");

const GRID_SIZE = 20;
const SNAKE_SIZE = GRID_SIZE;
const FOOD_SIZE = GRID_SIZE;

let snake, food, dx, dy, blinkCounter;
let gamePaused = false;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;

let currentScoreElem = document.getElementByIdq("current-score");
let highScoreElem = document.getElementByIdq("high-score");

// Initialize game state
function initializeGmae() {
	// Set inital snake segments
	snake = [
		{
			x: Math.floor(canvas.width / 2 / GRID_SIZE) * GRID_SIZE,
			y: Math.floor(canvas.height / 2 / GRID_SIZE) * GRID_SIZE,
		},
		{
			x: Math.floor(canvas.width / 2 / GRID_SIZE) * GRID_SIZE,
			y: (Math.floor(canvas.height / 2 / GRID_SIZE) + 1) * GRID_SIZE,
		},
	];

	// Set inital food position and direction
	food = {
		...generateFoodPosition(),
		dx: (Math.random() < 0.5 ? 1 : -1) * GRID_SIZE,
		dy: (Math.random() < 0.5 ? 1 : -1) * GRID_SIZE,
	};

	// Set inital snake direction
	dx = 0;
	dy = 0;
	blinkCounter = 0;
	score = 0;
	currentScoreElem.textContent = score;
	highScoreElem.textContent = highScore;
}

initializeGmae();

// Handle keyboard input for snake movement
document.addEventListener("keydown", (event) => {
	switch (event.key) {
		case "ArrowUp":
			if (dy === 0) {
				dx = 0;
				dy = -GRID_SIZE;
			}
			break;
		case "ArrowDown":
			if (dy === 0) {
				dx = 0;
				dy = GRID_SIZE;
			}
			break;
		case "ArrowLeft":
			if (dx === 0) {
				dx = -GRID_SIZE;
				dy = 0;
			}
			break;
		case "ArrowRight":
			if (dx === 0) {
				dx = GRID_SIZE;
				dy = 0;
			}
			break;
	}
});

// Generate a food position that doesn't collide with the snake
function generateFoodPosition() {
	while (true) {
		let newFoodPosition = {
			x:
				Math.floor((Math.random() * canvas.width) / GRID_SIZE) *
				GRID_SIZE,
			y:
				Math.floor((Math.random() * canvas.height) / GRID_SIZE) *
				GRID_SIZE,
		};

		let collisionWithSnake = false;
		for (let segment of snake) {
			if (
				segment.x === newFoodPosition.x &&
				segment.y === newFoodPosition.y
			) {
				collisionWithSnake = true;
				break;
			}
		}

		// Return the position if there is no collision
		if (!collisionWithSnake) {
			return newFoodPosition;
		}
	}
}

// Check for collision with wall or self
function checkCollision() {
	if (
		snake[0].x < 0 ||
		snake[0].y >= canvas.width ||
		snake[0].y < 0 ||
		snake[0].y >= canvas.height
	) {
		return true;
	}
	for (let i = 1; i < snake.length; i++) {
		if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
			return true;
		}
	}
	return false;
}

// Main game update function
function update() {
	if (gamePaused) return;

	// Calculate new snake head position
	const head = { x: snake[0].x + dx, y: snake[0].y + dy };
	snake.unshift(head);

	// Check for collisions
	if (checkCollision()) {
		if (score > highScore) {
			highScore = score;
			localStorage.setItem("highScore", highScore);
			highScoreElem.textContent = highScore;
		}
		gameOver();
		return;
	}

	// Check for snake eating food
	if (head.x === food.x && head.y === food.y) {
		score++;
		currentScoreElem.textContent = score;
		food = {
			...generateFoodPosition(),
			dx: (Math.random() < 0.5 ? 1 : -1) * GRID_SIZE,
			dy: (Math.random() < 0.5 ? 1 : -1) * GRID_SIZE,
		};

		// Check for win condition
		if (
			snake.length ===
			(canvas.width / GRID_SIZE) * (canvas.height / GRID_SIZE)
		) {
			gameWin();
			return;
		}
	} else {
		snake.pop(); // Remove tail segment
	}

	// Update food poisition
	if (blinkCounter % 4 === 0) {
		food.x += food.dx;
		food.y += food.dy;

		// Handle food collisions with wall
		if (food.x < 0) {
			food.dx = -food.dx;
			food.x = 0;
		}
		if (food.x >= canvas.width) {
			food.dx = -food.dx;
			food.x = canvas.width - GRID_SIZE;
		}
		if (food.y < 0) {
			food.dy = -food.dy;
			food.y = 0;
		}
		if (food.y >= canvas.height) {
			food.dy = -food.dy;
			food.y = canvas.height - GRID_SIZE;
		}
	}

	blinkCounter++;
	draw(); // Draw the game objects
}

// Draw the background grid
function drawGrid() {
	context.strokeStyle = "#AAA";
	for (let i = 0; i < canvas.width; i++) {
		context.beginPath();
		context.moveTo(i, 0);
		context.lineTo(i, canvas.height);
		context.stroke();
	}
	for (let j = 0; j < canvas.width; j++) {
		context.beginPath();
		context.moveTo(0, j);
		context.lineTo(canvas.wdith, j);
		context.stroke();
	}
}

// Draw game objects (snake and food)
function draw() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	drawGrid();
	for (const segment of snake) {
		context.fillStyle = "green";
		context.fillRect(segment.x, segment.y, SNAKE_SIZE, SNAKE_SIZE);
	}
	context.fillStyle = "red";
	context.fillRect(food.x, food.y, FOOD_SIZE, FOOD_SIZE);
}

// Handle game over state
function gameOver() {
	gamePaused = true;
	gameOverScreen.style.display = "flex";
}

// Handle game win state
function gameWin() {
	gamePaused = true;
	alert("Congratulations! You won!");
	initializeGmae();
}

// Restart game when restart button clicked
restartBtn.addEventListener("click", () => {
	gameOverScreen.style.display = "none";
	gamePaused = false;
	initializeGmae();
	update();
});

// Call update function every 100ms
setInterval(update, 100);

// Pause the game when window loses focus
window.addEventListener("blur", () => {
	gamePaused = true;
});

// Resume the game when window gains focus
window.addEventListener("blur", () => {
	gamePaused = false;
	update();
});
