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
  renderTasks();
  logTasks();
});

// render tasks on page
function renderTasks(){
  // clear list
  taskList.innerHTML = ""

  // extract each task from taskArr and append to task list
  for(i = 0; i < taskArr.length; i++){
    task = taskArr[i]; 
    const taskEl = document.createElement('div');
    taskEl.innerHTML = `
      <input type="checkbox" class="toggle-complete" ${task.isCompleted ? 'checked' : ''} title="Complete task">
      <div class="taskDetails">
        <strong>${task.name}</strong>
        <small>Added: ${task.date}</small>
      </div>
      <button class="delete-btn" title="Delete">❌</button>
    `
    taskList.append(taskEl);
  };
};
