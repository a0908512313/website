const display = document.querySelector("form .display input");
const numBtn = document.querySelectorAll(".containe form input");

numBtn.forEach((e) => {
	addEventListener("click", () => {
		display += e.target.value;
	});
});
