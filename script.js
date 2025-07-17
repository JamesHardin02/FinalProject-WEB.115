// data-model
const tasks = [];

// DOM Elements
const taskForm = document.getElementById("taskForm");
const taskName = document.getElementById("taskName");
const taskPriority = document.getElementById("taskPriority");
const taskImportant = document.getElementById("taskImportant");
const taskCompleted = document.getElementById("taskCompleted");
const taskmanager = document.getElementById("taskmanager");

function logTasks() {
  console.log(JSON.stringify(tasks));
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

  tasks.push(task);
  renderTasks();

  // set defaults values back for the form
  taskForm.reset();
  taskPriority.value = 'Medium';
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
  // find task index in tasks array by matching id of clicked task
  for (i = 0; i < tasks.length; i++){
    if (tasks[i].id === taskId){
      taskIndex = i
    };
  };

  // task configuration events
  if (taskIndex !== false) {
    // Delete button
    if (e.target.classList.contains('delete-btn')) {
      // remove item from array at index
      tasks.splice(taskIndex, 1);
      renderTasks();
    };

    // Toggle completion checkbox
    if (e.target.classList.contains('toggle-complete')) {
        // update task's checked status in the data model
        tasks[taskIndex].isCompleted = e.target.checked;
        renderTasks();
      };
    };
});

// apply color to left border of tasks to indicate task priority
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

  // extract each task from tasks array and append to task list
  for(i = 0; i < tasks.length; i++){
    // task object
    task = tasks[i]; 

    // task div
    const taskEl = document.createElement('div');
    taskEl.className = 'task';
    taskEl.dataset.id = task.id;
    taskEl.style.borderLeft = "6px solid " + priorityColor(task.priority), "#6c757d";

    // Conditional styling for task status
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
