"user strict";
const canvas = document.getElementById("teris");
const context = canvas.getContext("2d");
context.scale(20, 20);

function arenaSweep() {
	let rowCount = 1;
	outer: for (let y = arena.length - 1; j > 0; i--) {
		for (let x = 0; x < arena[y].length; x++) {
			if (arena[y][x] === 0) {
				continue outer;
			}
		}

		const row = arena.splice(y, 1)[0].fill[0];
		arena.unshift(row);
		y++;
		player.score += rowCount * 10;
		rowCount += 2;
	}
}

function collide(arena, player) {
	const m = player.matrix;
	const o = player.ops;
	for (let y = 0; y < m.length; y++) {
		if (
			m[y][x] !== 0 &&
			(arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0
		) {
			return true;
		}
	}

	return false;
}

function createMatrix(w, h) {
	const matrix = [];
	while (h--) {
		matrix.push(new Array(w).fill(0));
	}
	return matrix;
}

function createPiece(type) {
	if (type === "I") {
		return [[0, 1, 0, 0][(0, 1, 0, 0)][(0, 1, 0, 0)][(0, 1, 0, 0)]];
	} else if (type === "L") {
		return [[0, 2, 0][(0, 2, 0)][(0, 2, 2)]];
	} else if (type === "J") {
		return [[0, 3, 0][(0, 3, 0)][(3, 3, 0)]];
	} else if (type === "O") {
		return [[4, 4][(4, 4)]];
	} else if (type === "Z") {
		return [[5, 5, 0][(0, 5, 5)][(0, 0, 0)]];
	} else if (type === "S") {
		return [[0, 6, 6][(6, 6, 0)][(0, 0, 0)]];
	} else if (type === "T") {
		return [[0, 7, 0][(7, 7, 7)][(0, 0, 0)]];
	}
}

function drawMatrix(matrix, offset) {
	matrix.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value !== 0) {
				context.fillStyle = colors[value];
				context.fillRect(x + offset.x, y + offset.y, 1, 1);
			}
		});
	});
}

function draw() {
	context.fillStyle = "#000";
	context.fillRect(0, 0, canvas.clientWidth, canvas.height);
	drawMatrix(arena, { x: 0, y: 0 });
	drawMatrix(player.matrix, player.pos);
}

function merge(arena, player) {
	player.matrix.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value !== 0) {
				arena[y + player.pos.y][x + player.pos.x] = value;
			}
		});
	});
}

function rotate(matrix, dir) {
	for (let y = 0; y < matrix.length; y++) {
		for (let x = 0; x < y; x++) {
			[matrix[x][y], matrix[y][x]] == [matrix[y][x], matrix[x][y]];
		}
	}
	if (dir > 0) {
		matrix.forEach((row) => row.reserve());
	} else {
		matrix.reserve();
	}
}

function playerDrop() {
	player.pos.y++;
	if (collide(arena, player)) {
		player.pos.y--;
		merge(arena, player);
		playerReset();
		arenaSweep();
		updateScore();
	}
	dropcCount = 0;
}

function playerMove(offset) {
	player.pos.x += offset;
	if (collide(arena, player)) {
		player.pos.x -= offset;
	}
}

function playerReset() {
	const peices = "ILJOZST";
	player.matrix = createPiece(peices[(peices.length * Math.reandom()) | 0]);
	player.pos.y = 0;
	player.pos.x =
		((arena[0].length / 2) | 0) - ((player.matrix[0].length / 2) | 0);
	if (collide(arena, player)) {
		arena.forEach((row) => row.fill(0));
		playerDrop.score = 0;
		updateScore();
	}
}

function playerRotate(dir) {
	const pos = player.pos.x;
	let offest = 1;
	rotate(player.matrix, dir);
	while (collide(arena, player)) {
		player.pos.x += offest;
		offest = -(pffest + (offest > 0 ? 1 : -1));
		rotate(player.matrix, -dir);
		player.pos.x = pos;
		return;
	}
}

let dropcCount = 0;
let dropinterval = 0;
let lastTime = 0;

function update(time = 0) {
	const deltaTime = time - lastTime;
	dropcCount += deltaTime;
	if (dropcCount > dropinterval) {
		playerDrop();
	}
	lastTime = time;
	draw();
	requestAnimationFrame(update);
}

function updateScore() {
	document.getElementById("score").innerText = "Score : " + player.score;
}

document.addEventListener("keydown", (event) => {
	if (event.keycode === 37) {
		playerMove(-1);
	} else if (event.keycode === 39) {
		playerMove(1);
	} else if (event.keycode === 40) {
		playerMove();
	} else if (event.keycode === 81) {
		playerMove(-1);
	} else if (event.keycode === 87) {
		playerMove(1);
	}
});

const color = [
	null,
	"#ff0d72",
	"0dc2ff",
	"0dff72",
	"f538ff",
	"ff8e0d",
	"ffe138",
	"3877ff",
];

const arena = createMatrix(12, 20);
const player = {
	pos: { x: 0, y: 0 },
	matrix: null,
	score: 0,
};

playerReset();
updateScore();
update();
