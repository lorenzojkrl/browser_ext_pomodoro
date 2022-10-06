const tasks = []

const addTaskBtn = document.getElementById("add-task-btn")
addTaskBtn.addEventListener("click", () => addTask())

const renderTask = (taskNumber) => {
  const taskRow = document.createElement("div")

  const text = document.createElement("input")
  text.type = "text"
  text.placeholder = "Enter task..."
  text.value = tasks[taskNumber]
  text.addEventListener("change", () => {
    tasks[taskNumber] = text.value
  })

  const deleteBtn = document.createElement("input")
  deleteBtn.type = "button"
  deleteBtn.value = "x"
  deleteBtn.addEventListener("click", () => {
    deleteTask(taskNumber)
  })

  taskRow.appendChild(text)
  taskRow.appendChild(deleteBtn)

  const taskContainer = document.getElementById("task-container")
  taskContainer.appendChild(taskRow)
}

const addTask = () => {
  const taskNumber = tasks.length
  tasks.push("")
  renderTask(taskNumber)
}

const deleteTask = (taskNumber) => {
  tasks.splice(taskNumber, 1)
  renderTasks()
}

const renderTasks = () => {
  const taskContainer = document.getElementById("task-container")
  taskContainer.textContent = ""
  tasks.forEach((taskText, taskNumber) => {
    renderTask(taskNumber)
  })
}