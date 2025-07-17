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
  logTasks();
});

// task configuration events
taskList.addEventListener("click", function(e){
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
      logTasks();
      return;
    };

    // Toggle completion checkbox
    if (e.target.classList.contains('toggle-complete')) {
        // update task's checked status in the data model
        taskArr[taskIndex].isCompleted = e.target.checked;
        renderTasks();
        logTasks();
      };
    };
});

// render tasks on page
function renderTasks(){
  // clear list
  taskList.innerHTML = ""

  // extract each task from taskArr and append to task list
  for(i = 0; i < taskArr.length; i++){
    task = taskArr[i]; 
    const taskEl = document.createElement('div');
    taskEl.className = 'task';
    taskEl.dataset.id = task.id;

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
