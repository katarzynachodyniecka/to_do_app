import {
  checkIcon,
  getEditIcon,
  getDeleteIcon,
  getConfirmIcon,
} from "./utils/icons";

const todoListEl = document.getElementById("todo-list");
const addTodoBtnEl = document.getElementById("add-todo-btn");
const addTodoInputEl = document.getElementById("add-todo-input");

// #### EVENTS
addTodoBtnEl.addEventListener("click", () => {
  addTask(addTodoInputEl.value);

  addTodoInputEl.value = "";
  renderToDo();
});

const dataFromLocalStorage = localStorage.getItem("todos");

const tasks = dataFromLocalStorage ? JSON.parse(dataFromLocalStorage) : [];

const renderToDo = () => {
  todoListEl.innerHTML = tasks
    .map(
      (task) => `
      
  <div class="flex items-center">
    <div class="mr-3">
      ${checkIcon}
    </div>
    <div class="flex py-2 w-[50%]">
    ${
      task.isEditing
        ? `<input id="confirm-btn-${task.id}" value=${task.text} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5>`
        : `<dd class="mb-1 text-gray-500 md:text-lg">${task.text}</dd>`
    }
    </div>
    <div class="flex ml-auto gap-4">
      ${task.isEditing ? getConfirmIcon(task.id) : getEditIcon(task.id)}
      ${getDeleteIcon(task.id)}
  </div>
    </div><hr class="min-w-max h-0.5 mx-auto my-1 bg-gray-100 border-0 rounded dark:bg-gray-700">
    </div>
  `
    )
    .join("");

  const allTodoDeleteEls = document.querySelectorAll(".todo-delete-icon");
  const allTodoEditEls = document.querySelectorAll(".todo-edit-icon");
  const allTodoConfirmEls = document.querySelectorAll(".todo-confirm-icon");

  allTodoDeleteEls.forEach((node) => {
    node.addEventListener("click", () => {
      deleteTask(parseInt(node.dataset.taskId));
      renderToDo();
    });
  });

  allTodoEditEls.forEach((node) => {
    node.addEventListener("click", () => {
      onEditMode(parseInt(node.dataset.taskId));
      renderToDo();
    });
  });

  allTodoConfirmEls.forEach((node) => {
    node.addEventListener("click", () => {
      const taskId = parseInt(node.dataset.taskId);
      const newText = document.getElementById(`confirm-btn-${taskId}`).value;

      editTask(taskId, newText);
      renderToDo();
    });
  });

  localStorage.setItem("todos", JSON.stringify(tasks));
};

renderToDo();

// ## ADD TASK

const addTask = (text) => {
  tasks.unshift({
    text,
    id: tasks.length,
    completed: false,
    isEditing: false,
  });
};

// ## DELETE TASKs

const deleteTask = (id) => {
  const index = tasks.findIndex((task) => task.id === id);
  tasks.splice(index, 1);
};

// ## EDIT TASK

const editTask = (id, text) => {
  const index = tasks.findIndex((item) => item.id === id);
  tasks[index] = {
    ...tasks[index],
    text,
    isEditing: false,
  };
};
// ## ENTER EDITING

const onEditMode = (id) => {
  const index = tasks.findIndex((item) => item.id === id);
  tasks[index] = {
    ...tasks[index],
    isEditing: true,
  };
};
