const form = document.querySelector("#new-todo-form")
const todoInput = document.querySelector("#todo-input")
const list = document.querySelector("#list")
const template = document.querySelector("#list-item-template")
const LOCAL_STORAGE_PREFIX = "ADVANCED_TODO_LIST-"
const TODOS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-todos`
const todos = loadTodos()
todos.forEach(renderTodo)

form.addEventListener("submit", e => {
  e.preventDefault()

  const todoName = todoInput.value
  if (todoName === "") return
  const newTodo = {
    name: todoName,
    complete: false,
  }
  todos.push(todoName)
  renderTodo(todoName)
  saveTodos()
  todoInput.value = ""
})

function renderTodo(todoName) {
  const templateClone = template.content.cloneNode(true)
  const textElement = templateClone.querySelector("[data-list-item-text]")
  textElement.innerText = todoName
  list.appendChild(templateClone)
}

function loadTodos() {
  const todosString = localStorage.getItem(TODOS_STORAGE_KEY)
  return JSON.parse(todosString) || []
}

function saveTodos() {
  localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos))
}

// function handleFormSubmit(event) {

//   const newItem = document.importNode(template.content, true)
//   const listItemText = newItem.querySelector("[data-list-item-text]")

//   listItemText.textContent = todoInput.value

//   list.appendChild(newItem)

//   inputField.value = ""
// }
