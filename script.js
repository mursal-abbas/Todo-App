// ===============================
// Select Elements
// ===============================
const inputEl = document.getElementById("input-el");
const buttonEl = document.getElementById("button-el");
const todoList = document.querySelector(".todo-list");

// ===============================
// Load Todos from Local Storage
// ===============================
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// ===============================
// Render Todos
// ===============================
function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    if (todo.completed) todoItem.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = todo.text;

    // Toggle complete on click
    todoItem.addEventListener("click", () => {
      todos[index].completed = !todos[index].completed;
      saveTodos();
      renderTodos();
    });

    // Delete on right click
    todoItem.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });

    todoItem.appendChild(span);
    todoList.appendChild(todoItem);
  });
}

// ===============================
// Add Todo
// ===============================
buttonEl.addEventListener("click", addTodo);
inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo();
});

function addTodo() {
  const value = inputEl.value.trim();
  if (!value) return;

  todos.push({
    text: value,
    completed: false,
  });

  inputEl.value = "";
  saveTodos();
  renderTodos();
}

// ===============================
// Save to Local Storage
// ===============================
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// ===============================
// Initial Render
// ===============================
renderTodos();
