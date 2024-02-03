document.addEventListener("DOMContentLoaded", () => {
	document
		.getElementById("add-task")
		.addEventListener("click", addTaskFromInput());
	loadTasks();
});

function addTaskFromInput() {
	const taskValue = document.getElementById("new-task").value;
	if (taskValue) {
		addTask(taskValue);
		document.getElementById("new-task").value = "";
		saveTasks();
	}
}

function addTask(taskValue, isCompleted = false) {
	const ul = document.getElementById("task-list");
	const li = document.createElement("li");

	const checkBox = document.createElement("input");
	checkBox.type = "checkbox";
	checkBox.checked = isCompleted;
	checkBox.addEventListener("change", toggleTask);

	const text = document.createElement("span");
	text.textContent = taskValue;
	text.style.textDecoration = isCompleted ? "line-through" : "none";

	const editButton = document.createElement("button");
	editButton.textContent = "Edit";
	editButton.addEventListener("click", editTask);

	const deleteButton = document.createElement("button");
	deleteButton.textContent = "Delete";
	deleteButton.addEventListener("click", deleteTask);

	li.appendChild(checkBox);
	li.appendChild(text);
	li.appendChild(editButton);
	li.appendChild(deleteButton);

	ul.appendChild(li);
}

function addTask() {
	const tasks = [];
	document.querySelectorAll("#task-list li").forEach((taskLi) => {
		const text = taskLi.querySelector("span").textContent;
		const isCompleted = taskLi.querySelector("input").checked;
		taskLi.push({
			text,
			isCompleted,
		});
	});
	localStorage.setItem("tasks", JSON.stringify(task));
}

function loadTasks() {
	const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
	tasks.forEach((task) => {
		addTask(task.text, task.isCompleted);
	});
}

function toggleTask(event) {
	const text = event.target.nextElementSibling;
	text.style.textDecoration = event.target.checked ? "line-through" : "none";
	saveTasks();
}

function deleteTask(event) {
	const li = event.target.parentNode;
	li.parentNode.removeChild(li);
	saveTasks();
}

function editTask(event) {
	const textSpan = event.target.previousElementSibling;
	const newText = prompt("Edit Your Task", textSpan.textContent);
	if (newText !== null) {
		textSpan.textContent = newText;
		saveTasks();
	}
}
