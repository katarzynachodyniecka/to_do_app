import { checkIcon, editIcon, getDeleteIcon } from "./utils/icons";

const todoListEl = document.getElementById("todo-list");
const addTodoBtnEl = document.getElementById("add-todo-btn");
const addTodoInputEl = document.getElementById("add-todo-input");

// #### EVENTS
addTodoBtnEl.addEventListener("click", () => {
  addTask(addTodoInputEl.value);

  addTodoInputEl.value = "";
  renderToDo();
});

const tasks = [
  { id: 1, text: "Text #1", complete: true },
  { id: 2, text: "Text #2", complete: true },
  { id: 3, text: "Text #3", complete: false },
  { id: 4, text: "Text #4", complete: true },
  { id: 5, text: "Text #5", complete: false },
  { id: 6, text: "Text #6", complete: true },
];
const renderToDo = () => {
  todoListEl.innerHTML = tasks
    .map(
      (task) => `
  <div class="flex items-center">
    <div class="mr-3">
      ${checkIcon}
    </div>
    <div class="flex gap-4 flex-col py-4">
      <dt class="mb-1 text-gray-500 md:text-lg">${task.text}</dt>
    </div>
    <div class="flex ml-auto gap-4">
      ${editIcon}
      ${getDeleteIcon(task.id)}
      </svg>
    </div>
  </div>
  `
    )
    .join("");

  const allTodoDeleteEls = document.querySelectorAll(".todo-delete-icon");

  allTodoDeleteEls.forEach((node) => {
    node.addEventListener("click", () => {
      deleteTask(+node.dataset.taskId);
      renderToDo();
    });
  });
};

renderToDo();

// ## ADD TASK

const addTask = (text) => {
  tasks.unshift({
    text,
    id: tasks.length,
    completed: false,
  });
};

// ## DELETE TASKs

const deleteTask = (id) => {
  const index = tasks.findIndex((task) => task.id === id);
  tasks.splice(index, 1);
};

// ## EDIT TASK

const editTask = (task) => {
  const index = tasks.findIndex((item) => item.id === task.id);
  tasks[index] = task;
};

//-----
addTask("testujemy funkcje #1");
addTask("testujemy funkcje #2");
deleteTask(3);
editTask({ id: 4, text: "Text #4 - został podmieniony", complete: true });

renderToDo();
