const slider = document.querySelector(".slider");
const length = document.querySelector(".length");

const includeUppercase = document.querySelector("#upper");
const includeLowercase = document.querySelector("#lower");
const includeNumbers = document.querySelector("#numbers");
const includeSymbols = document.querySelector("#symbols");
const generateButton = document.querySelector(".btn-generate");
const passwordDisplay = document.querySelector(".password");
const copyButton = document.querySelector(".password-copy");

slider.addEventListener("input", (e) => {
	length.textContent = slider.value;
});

const characters = {
	uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	lowercase: "abcdefghijklmnopqrstuvwxyz",
	numbers: "0123456789",
	symbols: "!@#$%^&*()_+[]{}|;:,.<>?",
};

generateButton.addEventListener("click", () => {
	const passwordOptions = {
		length: slider.value,
		useUppercase: includeUppercase.checked,
		useLowercase: includeLowercase.checked,
		useNumbers: includeNumbers.checked,
		useSymbols: includeSymbols.checked,
	};

	const password = createPassword(passwordOptions);
	passwordDisplay.textContent = password;
});

const createPassword = (options) => {
	let charset = "";

	if (options.useUppercase) {
		charset += characters.uppercase;
	}

	if (options.useLowercase) {
		charset += characters.lowercase;
	}

	if (options.useNumbers) {
		charset += characters.numbers;
	}

	if (options.useSymbols) {
		charset += characters.symbols;
	}

	if (charset.length === 0) {
		alert("Please select at least one character type.");
		return "";
	}

	let password = "";
	for (let i = 0; i < options.length; i++) {
		const randomIndex = Math.floor(Math.random() * charset.length);
		password += charset.charAt(randomIndex);
	}

	return password;
};

copyButton.addEventListener("click", () => {
	const passwordToCopy = passwordDisplay.textContent;
	if (passwordToCopy) {
		navigator.clipboard.writeText(passwordToCopy);
		alert("Password copied to clipboard!");
	}
});
