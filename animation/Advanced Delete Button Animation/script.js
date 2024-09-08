/* Created by Tivotal */

let btn = document.querySelector(".btn");

btn.addEventListener("click", (e) => {
	e.preventDefault();
	if (!btn.classList.contains("active")) {
		btn.classList.add("active");

		setTimeout(() => {
			btn.classList.remove("active");
		}, 3200);
	}
});
