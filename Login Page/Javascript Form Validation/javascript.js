document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("mainForm");
	const name = document.getElementById("name");
	const email = document.getElementById("email");
	const phone = document.getElementById("phone");
	const password = document.getElementById("password");
	const message = document.getElementById("message");

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		if (checkInputs()) {
			showModal();
		}
	});

	name.addEventListener("input", () => {
		validateField(name, name.value.trim() !== "", "Name cannot be blank");
	});

	email.addEventListener("input", () => {
		validateField(email, isEmail(email.value.trim()), "Not a valid email");
	});

	phone.addEventListener("input", () => {
		validateField(
			phone,
			isPhone(phone.value.trim()),
			"Not a valid phone number"
		);
	});

	password.addEventListener("input", () => {
		validateField(
			password,
			password.value.trim().length >= 8,
			"Password must be at least 8 characters"
		);
	});

	message.addEventListener("input", () => {
		validateField(
			message,
			message.value.trim() !== "",
			"Message cannot be blank"
		);
	});

	function checkInputs() {
		isValid = true;
		validateField(name, name.value.trim() !== "", "Name cannot be blank");

		validateField(email, isEmail(email.value.trim()), "Not a valid email");

		validateField(
			phone,
			isPhone(phone.value.trim()),
			"Not a valid phone number"
		);

		validateField(
			password,
			password.value.trim().length >= 8,
			"Password must be at least 8 characters"
		);

		validateField(
			message,
			message.value.trim() !== "",
			"Message cannot be blank"
		);

		document.querySelectorAll(".form-container").forEach((control) => {
			if (control.classList.contains("error")) {
				isValid = false;
			}
		});
	}

	function validateField(input, condition, errorMessage) {
		if (condition) {
			setSuccess(input);
		} else {
			setError(input, errorMessage);
		}
	}

	function isEmail(email) {
		return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
			email
		);
	}

	function isPhone(phone) {
		return /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(phone);
	}

	function setSuccess(input) {
		const formControl = document.getElementsByClassName("form-control");
		const icon = formControl.querySelectorAll(".icon");
		formControl.className = "form-control success";
		icon.className = "icon bx bx-checkbox";
	}

	function setError(input, message) {
		const formControl = document.getElementsByClassName("form-control");
		const icon = formControl.querySelectorAll(".icon");
		formControl.className = "form-control error";
		icon.className = "icon bx bx-error";
		input.placeholder = message;
	}

	function showModal() {
		const modal = document.getElementById("successModal");
		modal.style.display = "block";

		const closeBtn = document.querySelector("#close-button");
		closeBtn.onclick = () => {
			modal.style.display = "none";
		};

		window.onclick = (event) => {
			if (event.target === modal) {
				modal.style.display = "none";
			}
		};
	}
});
