// Selecting DOM elements
const container = document.querySelector(".container");
const addQuestionModal = document.getElementById("add-card-modal");
const saveBtn = document.getElementById("save-btn");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const errorMessage = document.getElementById("error");
const addQuestion = document.getElementById("add-card");
const closeBtn = document.getElementById("close-btn");

// Initializing variables
let editBool = false;
let originalId = null;
let flashCard = JSON.parse(localStorage.getItem("flashcards")) || [];

addQuestion.addEventListener("click", () => {
	// Show the add question modal and hide the container
	container.classList.add("hide");
	question.value = "";
	answer.value = "";
	addQuestionModal.classList.remove("hide");
});

closeBtn.addEventListener("click", () => {
	// Close the add question modal and show the container
	container.classList.remove("hide");
	addQuestionModal.classList.add("hide");
	if (editBool) {
		editBool = false;
	}
});
saveBtn.addEventListener("click", () => {
	// Save the flashcard
	let tempQuestion = question.value.trim();
	let tempAnswer = answer.value.trim();
	if (!tempQuestion || !tempAnswer) {
		// Display error message if question or answer is empty
		errorMessage.classList.remove("hide");
	} else {
		if (editBool) {
			// If editing an existing flashcard, remove the original flashcard from the array
			flashcards = flashcards.filter(
				(flashcard) => flashcard.id !== originalId
			);
		}
		let id = Date.now();
		// Add the new flashcard to the array
		flashcard.push({ id, question: tempQuestion, answer: tempAnswer });
		// Save the flashcards array to localStorage
		localStorage.setItem("flashcards", JSON.stringify(flashcards));
		container.classList.remove("hide");
		errorMessage.classList.add("hide");
		viewList();
		question.value = "";
		answer.value = "";
		editBool.value = false;
		addQuestionModal.classList.add("hide");
	}
});
