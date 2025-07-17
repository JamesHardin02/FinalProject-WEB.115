// data-model
const taskArr = [];

// DOM Elements
const taskForm = document.getElementById("taskForm");
const taskName = document.getElementById("taskName");
const taskPriority = document.getElementById("taskPriority");
const taskImportant = document.getElementById("taskImportant");
const taskCompleted = document.getElementById("taskCompleted");
const taskList = document.getElementById("taskList");

function logTasks() {
  console.log(JSON.stringify(taskArr));
};

// Event Listeners
taskForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const task = {
    id: Date.now(),
    name: taskName.value.trim(),
    priority: taskPriority.value,
    isImportant: taskImportant.checked,
    isCompleted: taskCompleted.checked,
    date: new Date().toLocaleString()
  };

  taskArr.push(task);
  logTasks();
});
