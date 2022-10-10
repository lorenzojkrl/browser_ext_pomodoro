let tasks = []

const updateTime = () => {
  chrome.storage.local.get(["timer", "timeOption"], res => {
    const timerElement = document.getElementById('timer')
    const minutes = `${res.timeOption - Math.ceil(res.timer / 60)}`.padStart(2, "0")
    let seconds = "00"
    if (res.timer % 60 != 0) {
      seconds = `${60 - res.timer % 60}`.padStart(2, "0")
    }

    timerElement.textContent = `${minutes}:${seconds}`
  })
}

updateTime()
setInterval(updateTime, 1000)

const startTimerBtn = document.getElementById('start-timer-btn')
chrome.storage.local.get(["isRunning"], res => {
  startTimerBtn.textContent = res.isRunning ? "Pause Timer" : "Start Timer"
})

startTimerBtn.addEventListener("click", () => {
  chrome.storage.local.get(["isRunning"], res => {
    chrome.storage.local.set({
      isRunning: !res.isRunning
    }, () => {
      startTimerBtn.textContent = !res.isRunning ? "Pause Timer" : "Start Timer"
    })
  })


})

const resetTimerBtn = document.getElementById("reset-timer-btn")
resetTimerBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunning: false,
    timer: 0
  }, () => {
    startTimerBtn.textContent = "Start Timer"
  })
})

const addTaskBtn = document.getElementById("add-task-btn")
addTaskBtn.addEventListener("click", () => addTask())

chrome.storage.sync.get(["tasks"], (res) => {
  tasks = res.tasks ? res.tasks : []
  renderTasks()
})

const saveTasks = () => {
  chrome.storage.sync.set({
    tasks
  })
}

const renderTask = (taskNumber) => {
  const taskRow = document.createElement("div")

  const text = document.createElement("input")
  text.type = "text"
  text.placeholder = "Enter task..."
  text.value = tasks[taskNumber]
  text.addEventListener("change", () => {
    tasks[taskNumber] = text.value
    saveTasks()
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
  saveTasks()
}

const deleteTask = (taskNumber) => {
  tasks.splice(taskNumber, 1)
  renderTasks()
  saveTasks()
}

const renderTasks = () => {
  const taskContainer = document.getElementById("task-container")
  taskContainer.textContent = ""
  tasks.forEach((taskNumber) => {
    renderTask(taskNumber)
  })
}