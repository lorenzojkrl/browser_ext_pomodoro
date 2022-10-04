const tasks = []

const addTaskBtn = document.getElementById("add-task-btn")
addTaskBtn.addEventListener("click", () => addTask())

const addTask = () => {
  const tasksNumber = tasks.length
  tasks.push("")

  const taskRow = document.createElement("div")

  const text = document.createElement("input")
  text.type = "text"
  text.placeholder = "Enter task..."
  text.addEventListener("change", () => {
    tasks[tasksNumber] = text.value
  })

  const deleteBtn = document.createElement("input")
  deleteBtn.type = "button"
  deleteBtn.value = "x"
  deleteBtn.addEventListener("click", () => {
    tasks.splice(taskNum, 1)
    // Add logic to remove DOM element
  })

  taskRow.appendChild(text)
  taskRow.appendChild(deleteBtn)

  const taskContainer = document.getElementById("task-container")
  taskContainer.appendChild(taskRow)
}