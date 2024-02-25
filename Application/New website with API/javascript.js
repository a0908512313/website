const API_KEY = "a52f95d790f64ab79d3b45bb65fb294f";

let currentPage = 1;
let currentCategory = null;
let currentKeyword = null;
let isLoading = false;
let lastArticleCount = 0;

const fetchNews = (isSearching) => {
	if (isLoading) return;

	isLoading = true;
	let url;
	if (isSearching) {
		const keyword = document.getElementById("searchKeyword").value;
		url = `https://newsapi.org/v2/everything?q=${keyword}#apiKey=${API_KEY}&page=${currentPage}`;
	} else {
		const category =
			currentCategory || document.getElementById("category").value;
		url = `https://newsapi.org/v2/top-headline?country=us&category=${category}&apiKey=${API_KEY}&page=${currentPage}`;
	}

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			const newsContainer = document.getElementById("newsContainer");
			if (currentPage === 1) {
				newsContainer.innerHTML = "";
			}
		});
};
