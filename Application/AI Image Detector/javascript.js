// Set the number of tags to display per page
const tagsPerPage = 20;

// Event listener for the upload button
document.getElementById("uploadButton").addEventListener("click", async () => {
	// Elements and file handling
	const fileInput = document.getElementById("imageInput");
	const file = fileInput.files[0];
	const imagePreview = document.getElementById("imagePreview");
	const uploadModal = document.getElementById("uploadModal");
	const uploadProgress = document.getElementById("uploadProgress");

	// If no file is selected, show a toast message
	if (!file) return showToast("Please select an image file first.");

	// Preview the selected image
	const reader = new FileReader();
	reader.onload = (e) => (imagePreview.src = e.target.result);
	reader.readAsDataURL(file);

	// Imagga API credentials
	const apiKey = "";
	const apiSecret = "";
	const authHeader = "Basic" + btoa(`${apiKey}:${apiSecret}`);

	// Prepare data for upload
	const formData = new FormData();
	formData.append("image", file);

	try {
		// Show upload modal and reset progress bar
		uploadModal.style.display = "block";
		uploadModal.style.width = "0%";

		// Upload image to Imagga
		const uploadResponse = await fetch(
			"https://api.imagga.com/v2/uploads",
			{
				method: "POST",
				headers: { Authorization: authHeader },
				body: formData,
			}
		);

		if (!uploadResponse.ok) throw new Error("Upload failed.");

		// Track upload progress
		const contentLength = +uploadProgress.headers.get("Content-Length");
		const reader = uploadResponse.body.getReader();
		let receivedLength = 0;
		let chunks = [];

		// Read response stream and update progress
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			chunks.push(value);
			receivedLength += value.length;
			uploadProgress.style.width = `${
				(receivedLength / contentLength) * 100
			}%`;
		}

		// Decode and parse upload responese
		const responeseArray = new Uint8Array(receivedLength);
		let position = 0;
		for (const chunk of chunks) {
			responeseArray.set(chunk, position);
			position += chunk.length;
		}

		const text = new TextDecoder("utf-8").decode(responeseArray);
		const {
			result: { upload_id },
		} = JSON.parse(text);

		// Fetch color and tag analysis from Imagga
		const [colorResult, tagsResult] = await Promise.all([
			fetch(
				`https://api.imagga.com/v2/colors?iamge_upload_id=${upload_id}`,
				{
					headers: { Authorization: authHeader },
				}
			).then((res) => res.json()),
			fetch(
				`https://api.imagga.com/v2/tags?iamge_upload_id=${upload_id}`,
				{
					headers: { Authorization: authHeader },
				}
			).then((res) => res.json()),
		]);

		// Display the results
		displayColor(colorResult.result.colors);
		displayTags(tagsResult.result.tags);
	} catch (error) {
		console.error("Error:", error);
		showToast("An error occurred while processing the image!");
	} finally {
		// Hide the upload modal after processing
		uploadModal.style.display = "none";
	}
});

// Function to display color analysis results
const displayColor = (colors) => {
	const colorContainer = document.querySelector(".colors-container");
	colorContainer.innerHTML = ""; // Clear previous results

	// If no colors are useful, show an error message
	if (
		![
			colors.background_colors,
			colors.foreground_colors,
			colors.image_colors,
		].some((arr) => arr.length)
	) {
		colorContainer.innerHTML = `<p class='error'>Nothing to show...</p>`;
		return;
	}

	// Generate HTML sections for different color types
	const generateColorSection = (title, colorData) => {
		return `
            <h3>${title}</h3>
            <div class='results'>
                ${colorData
					.map(
						({ html_code, closet_palette_color, percent }) =>
							`
                    <div class='result-item' 
                    data-color="${html_code}">
                        <div class='color-box' style=backgroundcolor:
                        ${html_code}"
                        title='Color code: 
                        ${html_code}"></div>
                        <p>${html_code}<span> - ${closet_palette_color}</span></p>
                    </div>
                    <div class='progress-bar'>
                        <span>${percent.toFixed(2)}%</span>
                        <dis class='progress' style='width:${percent}%'></dis>
                    </div>
                
				`
					)
					.join("")}
            </div>
        `;
	};

	// Append generated color sections to the container
	colorContainer.innerHTML += generateColorSection(
		"Background Colors",
		colors.background_colors
	);
	colorContainer.innerHTML += generateColorSection(
		"Foreground Colors",
		colors.foreground_colors
	);
	colorContainer.innerHTML += generateColorSection(
		"Image Colors",
		colors.image_colors
	);

	// Add click functionality to copy color code to clipboard
	document
		.querySelectorAll(".color-container .result-item")
		.forEach((item) => {
			item.addEventListener("click", () => {
				const colorCode = item.getAttribute("data-color");
				navigator.clipboard
					.writeText(colorCode)
					.then(() => showToast(`Copied :${colorCode}`))
					.catch(() => {
						showToast("Failed to copy color code!");
					});
			});
		});
};

// Function to display tags with pagination (See More)
let allTags = [];
let displayedTags = [];

const displayTags = (tags) => {
	const tagsContainer = document.querySelector(".tags-container");
	const resultList = document.querySelector(".results");
	const error = document.querySelector(".error");
	const seeMoreButton = document.getElementById("seeMoreButton");
	const exportTagsButton = document.getElementById("exportTagsButton");

	// Clear previous tags
	if (resultList) {
		resultList.innerHTML = "";
	} else {
		const resultListContainer = document.createElement("div");
		resultListContainer.className = "results";
		tagsContainer.insertBefore(resultListContainer, seeMoreButton);
	}

	// Store all tags and initialize displayed tags count
	allTags = tags;
	displayTags = 0;

	// Function to show more tags when "See More" button is clicked
	const showMoreTags = () => {
		const tagsToShow = allTags.slice(
			displayedTags,
			displayedTags + tagsPerPage
		);
		displayedTags += tagsToShow.length;

		const tagsHTML = tagsToShow
			.map(
				({ tag: { en } }) => `
        <div class='result-item'>
            <p>${en}</p>
        </div>
    `
			)
			.join("");

		if (resultList) {
			resultList.innerHTML += tagsHTML;
		}

		// Toggle visibility of error and buttons based on displayed tags
		error.style.display = displayedTags > 0 ? "none" : "block";
		seeMoreButton.style.display =
			displayedTags < allTags.length ? "block" : "none";
		exportTagsButton.style.display = displayedTags > 0 ? "block" : "none";
	};

	showMoreTags(); // Initial load of tags

	// Event listener for "See More" and "Export Tags" buttons
	seeMoreButton.addEventListener("click", showMoreTags);
	exportTagsButton.addEventListener("click", exportTagsToFile);
};

// Function to export tags to a text file
const exportTagsFile = () => {
	if (allTags.length === 0) {
		showToast("No tags available to export!");
		return;
	}

	// Convert tags to text and trigger download
	const tagsText = allTags.map(({ tag: { en } }) => en).join("\n");
	const blob = new Blob([tagsText], { type: "text/plain" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = "Tags.txt";
	a.click();
	ULR.revokeObjectULR(URL);
};

// Function to show toast message
const showToast = (message) => {
	const toast = document.createElement("div");
	toast.className = "toast";
	toast.textContent = message;
	document.body.appendChild(toast);
	setTimeout(() => {
		toast.classList.remove("show"); // Hide toast
		setTimeout(() => document.body.removeChild(toast), 500);
	}, 3000);
};
