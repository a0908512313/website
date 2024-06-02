const iconPlay = `<svg
width="22"
height="29"
viewBox="0 0 22 29"
fill="none"
xmlns="http://www.w3.org/2000/svg"
>
<path
class="icon-play"
  d="M21.0375 12.671L3.03751 1.10524C2.73768 0.905239 2.39141 0.795783 2.03651 0.788821C1.68161 0.78186 1.33171 0.877662 1.02501 1.06577C0.713773 1.24551 0.454317 1.51024 0.27394 1.8321C0.0935623 2.15395 -0.00106682 2.52103 9.07295e-06 2.89472V26.0526C-0.00106682 26.4263 0.0935623 26.7934 0.27394 27.1152C0.454317 27.4371 0.713773 27.7018 1.02501 27.8816C1.33171 28.0697 1.68161 28.1655 2.03651 28.1585C2.39141 28.1515 2.73768 28.0421 3.03751 27.8421L21.0375 16.2763C21.3325 16.0889 21.5766 15.8245 21.746 15.5087C21.9154 15.1929 22.0044 14.8364 22.0044 14.4737C22.0044 14.111 21.9154 13.7544 21.746 13.4386C21.5766 13.1228 21.3325 12.8584 21.0375 12.671Z"
  fill="#000"
/>
</svg>`;

const iconPause = `<svg width="32" height="35" viewBox="0 0 32 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M27 5.9474V27C27 27.5584 26.7893 28.0939 26.4142 28.4887C26.0391 28.8835 25.5304 29.1053 25 29.1053H20.5C19.9696 29.1053 19.4609 28.8835 19.0858 28.4887C18.7107 28.0939 18.5 27.5584 18.5 27V5.9474C18.5 5.38905 18.7107 4.85356 19.0858 4.45875C19.4609 4.06394 19.9696 3.84213 20.5 3.84213H25C25.5304 3.84213 26.0391 4.06394 26.4142 4.45875C26.7893 4.85356 27 5.38905 27 5.9474ZM11.5 3.84213H7C6.46957 3.84213 5.96086 4.06394 5.58579 4.45875C5.21071 4.85356 5 5.38905 5 5.9474V27C5 27.5584 5.21071 28.0939 5.58579 28.4887C5.96086 28.8835 6.46957 29.1053 7 29.1053H11.5C12.0304 29.1053 12.5391 28.8835 12.9142 28.4887C13.2893 28.0939 13.5 27.5584 13.5 27V5.9474C13.5 5.38905 13.2893 4.85356 12.9142 4.45875C12.5391 4.06394 12.0304 3.84213 11.5 3.84213Z" fill="#000"/>
</svg>
`;

document.addEventListener("DOMContentLoaded", () => {
	const startButton = document.querySelector(".btn-start");
	const skipButton = document.querySelector(".btn-skip");
	const timeDisplay = document.querySelector(".timer");
	const container = document.querySelector(".container");
	const info = document.querySelector(".info");

	let timer = null;
	let timeLeft = 25 * 60;
	let isBreak = false;
	let isPaused = true;

	const updateButtonIcon = () => {
		startButton.innerHTML = isPaused ? iconPlay : iconPause;
		if (!isPaused) {
			startButton.style.paddingLeft = "";
		} else {
			startButton.style.paddingLeft = "4px";
		}
	};

	const updateDisplay = () => {
		const minutes = Math.floor(timeLeft / 60);
		const seconds = timeLeft % 60;

		// if 3 seconds display at 03 etc...
		timeDisplay.textContent = `${minutes}:${
			seconds < 10 ? "0" : ""
		}${seconds}`;
		container.style.backgroundColor = isBreak ? "#38858A" : "#BA4949";
	};

	const togglerTimer = () => {
		if (isPaused) {
			startTimer();
		} else {
			pauseTimer();
		}
		updateButtonIcon();
	};

	const startTimer = () => {
		if (timer !== null) return;
		isPaused = false;
		timer = setInterval(() => {
			timeLeft--;
			updateDisplay();
			if (timeLeft < 0) {
				clearInterval(timer);
				timer = null;
				alert("Time's up");
				isBreak = !isBreak;
				timeLeft = isBreak ? 5 * 60 : 25 * 60;
				info.textContent = `${isBreak ? "Break Time" : "Focus Time"}`;
				updateDisplay();
				isPaused = true;
				updateButtonIcon();
			}
		}, 1000);
	};

	const pauseTimer = () => {
		if (timer !== null) {
			clearInterval(timer);
			timer = null;
		}
		isPaused = true;
		updateButtonIcon();
	};

	const skipTimer = () => {
		clearInterval(timer);
		timer = null;
		isBreak = !isBreak;
		timeLeft = isBreak ? 5 * 60 : 25 * 60;
		info.textContent = `${isBreak ? "Break Time" : "Focus Time"}`;
		updateDisplay();
		isPaused = true;
		updateButtonIcon();
	};

	startButton.addEventListener("click", togglerTimer);

	skipButton.addEventListener("click", skipTimer);

	updateButtonIcon();
	updateDisplay();
});
