window.onload = () => {
	generateCalendar();
};

generateCalendar = () => {
	const calendar = document.getElementById("calendar");
	const currentDate = new Date();
	const month = currentDate.getMonth();
	const year = currentDate.getFullYear();

	const firstDayOfMonth = new Date(yaer, month, 1);
	const lastDayOfMonth = new Date(yaer, month + 1, 0);

	const firstOfWeek = firstDayOfMonth.getDay();
	const totalDays = lastDayOfMonth.getDate();

	for (let i = 0; i < firstOfWeek; i++) {
		let blank = document.createElement("div");
		calendar.appendChild(blank);
	}
	for (let i = 0; i < totalDays; i++) {
		let daySquare = document.createElement("div");
		daySquare.className = "calendar-day";
		daySquare.textContent = day;
		daySquare.id = `day-${day}`;
		calendar.appendChild(daySquare);
	}
};
