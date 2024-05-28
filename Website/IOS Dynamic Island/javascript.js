const signal = document.querySelector(".signal");
const battery = document.querySelector(".battery");
const wifi = document.querySelector(".wifi");
const time = document.querySelector(".time");
const text = document.querySelector(".text");
const island = document.querySelector(".island");
const wrapperIsland = document.querySelector(".wrapper-island");
const btnConnect = document.querySelector(".btn-connect");

// This triggers variant 1 -> 2
btnConnect.addEventListener("click", () => {
	const isExpanded2 = island.classList.contains("expanded-2");
	const isExpanded3 = island.classList.contains("expanded-3");

	if (!isExpanded2 & !isExpanded3) {
		island.classList.remove("click-animation");
		island.classList.add("expanded-2");
		signal.classList.add("hidden");
	}
});

// This triggers variant 2 -> 3 and 3 -> 2
island.addEventListener("click", () => {
	const isExpanded2 = island.classList.contains("expanded-2");
	const isExpanded3 = island.classList.contains("expanded-3");

	// 2 -> 3
	if (isExpanded2) {
		signal.classList.add("hidden");
		wifi.classList.add("hidden");
		time.classList.add("hidden");
		battery.classList.add("hidden");
		island.classList.remove("expanded-2");
		island.classList.add("expanded-3");
		wrapperIsland.classList.add("wrapper-island-expanded");
		text.classList.remove("hidden");
	}

	// 3 -> 2
	if (isExpanded3) {
		setTimeout(() => {
			battery.classList.remove("hidden");
			wifi.classList.remove("hidden");
			time.classList.remove("hidden");
		}, 270);
		text.classList.add("hidden");
		wrapperIsland.classList.remove("wrapper-island-expanded");
		island.classList.remove("expanded-3");
		island.classList.add("expanded-2");
		signal.classList.add("hidden");
	}
});
