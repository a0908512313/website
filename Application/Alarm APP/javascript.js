document.addEventListener("DOMContentLoaded", () => {
	document
		.getElementById("add-new-alarm")
		.addEventListener("click", showAddAlarm);
	document.getElementById("close").addEventListener("click", Close);
	document.getElementById("alarmButton").addEventListener("click", setAlarm);
	document
		.getElementById("saveButton")
		.addEventListener("click", saveChanges);
	document
		.getElementById("cancleButton")
		.addEventListener("click", CloseEditMode);
	document.getElementById("clearButton").addEventListener("click", clearAll);
	document
		.getElementById("okButton")
		.addEventListener("click", closeNotification);

	let newAlarm = document.getElementById("new-alarm");

	let audio = new Audio("");
	LoadAlarms();
	setInterval(updateCountdown, 1000);

	function showAddAlarm() {
		newAlarm.style.opacity = "1";
		newAlarm.style.zIndex = "100";
	}

	function close() {
		newAlarm.style.opacity = "0";
		newAlarm.style.zIndex = "-100";
	}

	function setAlarm() {
		let alarmNameInput = document.getElementById("alarmName");
		let alarmDateInput = document.getElementById("alarmDate");
		let alarmTimeInput = document.getElementById("alarmTime");

		let alarmName = alarmNameInput.value.trim();
		let alarmDate = alarmDateInput.value;
		let alarmTime = alarmTimeInput.value;

		if (alarmName === "" || alarmDate === "" || alarmTime === "") {
			alert("Please fill in all the fields (Name, Date, Time).");
			return;
		}

		if (validateDateTime(alarmDate, alarmTime)) {
			let alarmObject = {
				name: alarmName,
				date: alarmDate,
				time: alarmTime,
			};

			addAlarm(alarmObject);
			displayAlarms();
			closeForm();
			close();
		} else {
			alert("Please enter a valid future date and time.");
		}
	}

	function validateDateTime(date, time) {
		let now = new Date();
		let selectedDateTime = new Date(date + " " + time);
		return selectedDateTime > now;
	}

	function addAlarm(alarmObject) {
		let alarms = JSON.parse(localStorage.getItem("alarms")) || [];
		alarms.push(alarmObject);
		localStorage.setItem("alarms", JSON.stringify(alarms));

		scheduleAlarm(alarmObject, alarms.length - 1);
	}

	function scheduleAlarm(alarmObject, index) {
		let now = new Date();
		let alarmTime = new Date(alarmObject.date + " " + alarmObject.time);
		let timeUntilAlarm = alarmTime - now;

		if (timeUntilAlarm > 0) {
			setTimeout(() => {
				showNotification(alarmObject.name, index);
				showNextAlarm();
			}, timeUntilAlarm);
		}
	}

	function showNotification(alarmName, alarmIndex) {
		let notification = document.getElementById("notification");
		let notificationMessage = document.getElementById(
			"notificationMessage"
		);
		notificationMessage.innterHTML = `It's time for ${alarmName}`;
		notification.style.display = "block";
		let okButton = document.getElementById("okButton");
		okButton.addEventListener("click", () => {
			closeNotification(alarmIndex);
		});
		playSong();
	}
});
