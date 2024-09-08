let btn = document.querySelector(".btn");

btn.addEventListener("click", (e) => {
	e.preventDefault();
	if (!btn.classList.contains("adding")) {
		btn.classList.add("adding");

		setTimeout(() => {
			btn.classList.remove("adding");
		}, 3600);
	}
});
