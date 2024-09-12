/* Created by Tivotal */

let spanTags = document.querySelectorAll(".display span");
let btns = document.querySelectorAll(".btn");

let [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
let timer = null;

btns[1].addEventListener("click", () => {
	if (timer !== null) {
		clearInterval(timer);
	}
	timer = setInterval(updateTime, 10);
});

btns[0].addEventListener("click", () => {
	clearInterval(timer);
});

btns[2].addEventListener("click", () => {
	clearInterval(timer);
	[hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
	spanTags[6].textContent = "00";
	spanTags[4].textContent = "00";
	spanTags[2].textContent = "00";
	spanTags[0].textContent = "00";
});

var updateTime = () => {
	milliseconds += 10;
	if (milliseconds == 1000) {
		milliseconds = 0;
		seconds++;
		if (seconds == 60) {
			seconds = 0;
			minutes++;
			if (minutes == 60) {
				minutes = 0;
				hours++;
			}
		}
	}

	var sec = seconds < 10 ? "0" + seconds : seconds;
	var min = minutes < 10 ? "0" + minutes : minutes;
	var hr = hours < 10 ? "0" + hours : hours;

	spanTags[6].textContent = milliseconds.toString().slice(0, 2);
	spanTags[4].textContent = sec;
	spanTags[2].textContent = min;
	spanTags[0].textContent = hr;
};
