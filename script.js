// data-model
const taskArr = [];

// DOM Elements
const taskForm = document.getElementById("taskForm");
const taskName = document.getElementById("taskName");
const taskPriority = document.getElementById("taskPriority");
const taskImportant = document.getElementById("taskImportant");
const taskCompleted = document.getElementById("taskCompleted");
const taskmanager = document.getElementById("taskmanager");

function logTasks() {
  console.log(JSON.stringify(taskArr));
};

// Event Listeners
// add task form submission
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
});

// task configuration events
taskmanager.addEventListener("click", function(e){
  // qualify it is a task that was clicked
  taskParentDiv = e.target.closest(".task");
  if(!taskParentDiv){
    return;
  };

  // get task id from the clicked task
  const taskId = Number(taskParentDiv.dataset.id);
  let taskIndex = false
  // find task index in taskArr by matching id of clicked task
  for (i = 0; i < taskArr.length; i++){
    if (taskArr[i].id === taskId){
      taskIndex = i
    };
  };

  // task configuration events
  if (taskIndex !== false) {
    // Delete button
    if (e.target.classList.contains('delete-btn')) {
      // remove item from array at index
      taskArr.splice(taskIndex, 1);
      renderTasks();
    };

    // Toggle completion checkbox
    if (e.target.classList.contains('toggle-complete')) {
        // update task's checked status in the data model
        taskArr[taskIndex].isCompleted = e.target.checked;
        renderTasks();
      };
    };
});

function priorityColor(priority) {
  switch (priority) {
    case 'High':   return '#d9534f'; // red
    case 'Medium': return '#f0ad4e'; // orange
    default:       return '#5bc0de'; // blue
  };
};

// render tasks on page
function renderTasks(){
  // clear list
  taskmanager.innerHTML = ""

  // extract each task from taskArr and append to task list
  for(i = 0; i < taskArr.length; i++){
    task = taskArr[i]; 
    const taskEl = document.createElement('div');
    taskEl.className = 'task';
    taskEl.dataset.id = task.id;
    taskEl.style.borderLeft = "6px solid " + priorityColor(task.priority), "#6c757d";

    // Conditional styling for important and completed tasks
    if (task.isImportant) {
      taskEl.style.background = '#ffe6e6'; // light red tint
    }
    if (task.isCompleted) {
      taskEl.style.textDecoration = 'line-through';
      taskEl.style.opacity = '0.6';
    } else {
      taskEl.style.textDecoration = 'none';
      taskEl.style.opacity = '1';
    };

    taskEl.innerHTML = `
      <input type="checkbox" class="toggle-complete" ${task.isCompleted ? 'checked' : ''} title="Complete task">
      <div class="taskDetails">
        <strong>${task.name}</strong>
        <small>Added: ${task.date}</small>
      </div>
      <button class="delete-btn" title="Delete">❌</button>
    `
    taskmanager.append(taskEl);
  };
  
  logTasks();
};
