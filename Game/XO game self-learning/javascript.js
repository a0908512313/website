const buttons = document.querySelectorAll('[id^="btnN"]');
console.log(buttons);
buttonsArray = Object.values(buttons);
console.log(buttonsArray);
const resetBtn = document.getElementById("reset-btn");
const winLines = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];
var currentLines = ["", "", "", "", "", "", "", "", ""];
var current = "O";
var total = 0;
var isEnd = false;
var total = 0;

buttons.forEach((button) => {
	button.addEventListener("click", () => {
		markSpace(button.id);
	});
});

function markSpace(id) {
	if (!isEnd) {
		var btn = document.getElementById(id);
		var btnIndex = parseInt(btn.id[4] - 1);
		if (currentLines[btnIndex] == "") {
			currentLines[btnIndex] = current;
			btn.textContent = current;
			btn.style.backgroundColor = "lightgreen";
			btn.style.color = "white";
		}
	}
	check();
	total++;

	while (currentLines[randomInt(0, 8)] == "") {
		btn.style.backgroundColor = "#cc4444";
		btn.style.color = "white";
		currentLines[randomInt(0, 8)] = "X";
		currentLines[randomInt(0, 8)].textContent = "X";
		total++;
		check();
		break;
	}
}

function randomInt(start, end) {
	return Math.floor(Math.random() * (end - start + 1)) + start;
}

function check() {
	var rolIndex, colIndex;
	for (rolIndex = 0; rolIndex < 8; rolIndex++) {
		for (colIndex = 1; colIndex < 3; colIndex++) {
			if (
				currentLines[rolIndex][colIndex] !==
				currentLines[winLines[rolIndex][colIndex - 1]]
			) {
				isEnd = false;
				break;
			} else {
				if (currentLines[winLines[rolIndex][Math.random(1, 3)] != ""])
					isEnd = true;
			}

			if (isEnd) {
				if (
					currentLines[winLines[rolIndex][Math.random(1, 3)] == "O"]
				) {
					document.getElementById("result").textContent =
						" You WIN!!!";
				} else if (
					currentLines[winLines[rolIndex][Math.random(1, 3)] == "X"]
				) {
					document.getElementById("result").textContent =
						" Computer WIN!!!";
				}
			}
		}
	}
	if (total == 9) {
		document.getElementById("result").textContent = " It's tie";
	}
}

resetBtn.addEventListner("click", () => {
	isEnd = false;
	current = "O";
	for (let i = 0; i < 9; i++) {
		currentLines[i] = "";
	}
	buttons.forEach((button) => {
		button.style.backgroundColor = "darkgray";
		button.textContent = "";
	});
	resetBtn.textContent = "Result";
	total = 0;
});
