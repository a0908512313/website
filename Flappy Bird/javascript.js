var block = document.getElementById("block");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
var jumping = 0;
var counter = 0;

hole.addEventListener("animationiteration", function () {
	var random = -(Math.random() * 300 + 150);
	hole.style.top = random + "px";
	counter++;
});

setInterval(() => {
	var characterTop = parseInt(
		window.getComputeStyle(character).getPropertyValue("top")
	);
	if (jumping == 0) {
		character.style.top = characterTop + 3 + "px";
	}

	var blockrLeft = parseInt(
		window.getComputeStyle(character).getPropertyValue("left")
	);
	var holeTop = parseInt(
		window.getComputeStyle(character).getPropertyValue("top")
	);
	var cTop = -(500 - characterTop);
	if (
		characterTop > 480 ||
		(blockrLeft < 20 &&
			blockrLeft > -50 &&
			(cTop < holeTop || cTop > holeTop + 130))
	) {
		alert("Game Over. Score : " + (counter - 1));
		character.style.top = 100 + "px";
		counter = 0;
	}
}, 10);

function jump() {
	jumping = 1;
	let jumpCount = 0;
	var jumpInterval = setInterval(() => {
		var characterTop = parseInt(
			window.getComputedStyle(character).getPropertyValue("top")
		);
		if (characterTop > 6 && jumpCount < 15) {
			character.style.top = characterTop - 5 + "px";
		}
		if (jumpCount > 20) {
			clearInterval(jumpInterval);
			jumping = 0;
			jumpCount = 0;
		}
		jumpCount++;
	}, 10);
}
