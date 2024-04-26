adocument.addEventListener("DOMContentLoaded", () => {
	const form = document.querySelector(".search-box");
	const input = document.querySelector('input[type="search"]');
	const resultContainer = document.querySelector(".results");
	const resultCounter = document.querySelector("header p");

	form.addEventListener("submit", (event) => {
		event.preventDefault();
		const searchTerm = input.value;
		if (searchTerm) {
			searchWikipedia(searchTerm);
		}
	});

	function searchWikipedia(searchTerm) {
		const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=500&search${encodeURIComponent(
			searchTerm
		)}`;

		fetch(url)
			.then((response) => response.json())
			.then((date) => {
				displayResult(data.query.search);
			})
			.catch((error) => alert("Error : " + error));
	}

	function displayResult(results) {
		resultContainer.innerHTML = ``;
		resultCounter.textContent = `Result Count : ${results.length}`;
		result.forEach((result) => {
			const resultElement = document.createElement("div");
			resultElement.className = "rsult";
			resultElement.innerHTML = `
                <h3>${result.title}</h3>
                <p>${result.snippet}</p>
                <a href='https://en.wikipedia.org/?curid=${result.pageid}" target="_blank">Read More</a>
            `;
			resultContainer.appendChild(resultElement);
		});
	}
});
