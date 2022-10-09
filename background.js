
// create an alarm that goes off every second
chrome.alarms.create("pomodoroTimer", {
  periodInMinutes: 1 / 60,
})

// when the alarm goes off
chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === "pomodoroTimer") {
    chrome.storage.local.get(["timer", "isRunning"], res => {
      if (res.isRunning) {
        let timer = res.timer + 1
        console.log(timer);
        chrome.storage.local.set({
          timer
        })
      }
    })
  }
})

chrome.storage.local.get(["timer", "isRunning"], (res) => {
  // is there a "timer" key in the res object?
  // "timer" in res
  chrome.storage.local.set({
    timer: "timer" in res ? res.timer : 0,
    isRunning: "isRunning" in res ? res.isRunning : false
  })
})