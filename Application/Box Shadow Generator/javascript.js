const sliderHorizontal = document.querySelector(".slider-horizontal");
const sliderVertical = document.querySelector(".slider-vertical");
const sliderBlur = document.querySelector(".slider-blur");
const sliderSpeard = document.querySelector(".slider-speard");

const sliderHorizontalValue = document.querySelector(".horizontal-value");
const sliderVerticalValue = document.querySelector(".vertical-value");
const sliderBlurValue = document.querySelector(".blur-value");
const sliderSpeardValue = document.querySelector(".spread-value");

const slider = document.querySelectorAll(".slider");
const colorPicker = document.querySelector(".input-color");
const inputInset = document.querySelector(".input-inset");

const itme = document.querySelector(".item");
const cssCode = document.querySelector(".css-code");

let boxShadow = {
	horizontal: 0,
	vertical: 0,
	blur: 10,
	spread: 0,
	color: "#000000",
	inset: false,
};

const generateCSS = () => {
	cssCode.innerHTML = `box-shadow: ${boxShadow.horizontal}px ${boxShadow.vertical}px ${boxShadow.blur}px ${boxShadow.spread} ${boxShadow.color}`;
};

sliderHorizontal.addEventListener("input", (e) => {
	boxShadow.horizontal = e.target.value;
	sliderHorizontalValue.textContent = e.target.value;
	itme.style.boxShadow = `${boxShadow.horizontal}px ${boxShadow.vertical}px ${boxShadow.blur}px ${boxShadow.spread}px ${boxShadow.color}`;
	generateCSS();
});

slidervertical.addEventListener("input", (e) => {
	boxShadow.vertical = e.target.value;
	sliderverticalValue.textContent = e.target.value;
	itme.style.boxShadow = `${boxShadow.horizontal}px ${boxShadow.vertical}px ${boxShadow.blur}px ${boxShadow.spread}px ${boxShadow.color}`;
	generateCSS();
});

sliderblur.addEventListener("input", (e) => {
	boxShadow.blur = e.target.value;
	sliderblurValue.textContent = e.target.value;
	itme.style.boxShadow = `${boxShadow.horizontal}px ${boxShadow.vertical}px ${boxShadow.blur}px ${boxShadow.spread}px ${boxShadow.color}`;
	generateCSS();
});

sliderSpeard.addEventListener("input", (e) => {
	boxShadow.speard = e.target.value;
	sliderSpeardValue.textContent = e.target.value;
	itme.style.boxShadow = `${boxShadow.horizontal}px ${boxShadow.vertical}px ${boxShadow.blur}px ${boxShadow.spread}px ${boxShadow.color}`;
	generateCSS();
});

colorPicker.addEventListener("input", (e) => {
	boxShadow.color = e.target.value;
	itme.style.boxShadow = `${boxShadow.horizontal}px ${boxShadow.vertical}px ${boxShadow.blur}px ${boxShadow.spread}px ${boxShadow.color}`;
	generateCSS();
});

inputInset.addEventListener("input", (e) => {
	boxShadow.inset = e.target.checked;
	itme.style.boxShadow = `${boxShadow.inset ? "inset" : ""} ${
		boxShadow.horizontal
	}px ${boxShadow.vertical}px ${boxShadow.blur}px ${boxShadow.spread}px ${
		boxShadow.color
	}`;
	generateCSS();
});
