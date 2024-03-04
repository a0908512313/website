const container = document.querySelector(".container");
const sizeOptions = document.querySelector(".size");
const userInput = document.getElementById("placement");
const submitBtn = document.getElementById("generate");
const downloadBtn = document.getElementById("download-btn");
const BGColor = document.getElementById("color1");
const FGColor = document.getElementById("color2");

let QR_code;
let sizechoice = 100;
let BGColorChoice = "#000000";
let FGColorChoice = "#ffffff";

sizeOptions.addEventListener("change", () => {
	sizechoice = sizeOptions.value;
});

FGColor.addEventListener("input", () => {
	BGColorChoicechoice = BGColor.value;
});

FGColor.addEventListener("input", () => {
	FGColorChoicechoice = FGColor.value;
});

userInput.addEventListener("input", () => {
	if (userInput.value.trim().length < 1) {
		submitBtn.disabled = true;
		downloadBtn.href = "";
		downloadBtn.classList.add("hide");
	} else {
		submitBtn.disabled = false;
	}
});

const inputFormatter = (value) => {
	value = value.replace(/[^a-z0-9A-z] + /g, "");
	return value;
};

const generateQRCode = async () => {
	container.innerHTML = "";

	QR_code = await new QR_code(container, {
		text: userInput.value,
		width: sizechoice,
		height: sizechoice,
		colorDark: FGColorChoice,
		colorLight: BGColorChoice,
	});

	const src = container.firstChild.toDataURL("image/png");
	downloadBtn.href = src;

	let userValue = userInput.value;
	try {
		userValue = new URL(userValue).hostname;
	} catch (_) {
		userValue = inputFormatter(userValue);
	}
	downloadBtn.download = `${userValue}QR`;
	downloadBtn.classList.remove("hide");
};

window.onload = () => {
	container.innerHTML = "";
	sizeOptions.value = sizechoice;
	userInput.value = "";
	BGColor.value = BGColorChoice;
	FGColor.value = FGColorChoice;
	downloadBtn.classList.add("hide");
	submitBtn.disabled = true;
};

submitBtn.addEventListener("click", generateQRCode);
