const taskList = document.getElementById("task-list");
const inputTask = document.getElementById("input-task");
const addTaskButton = document.getElementById("add-task-button");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask(task) {
    const checked = task.done ? 'checked': null;
    let li = document.createElement("li");
    li.setAttribute("class", "task");
    li.setAttribute("data-key", task.id);
    li.innerHTML = `
        <label>
            <input type="checkbox" ${checked}>
            <span class="task">${task.name}</span>
        </label>
        <button class="delete-btn">Delete Task</button>
    `;
    taskList.append(li);
}

function updateStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addToList(taskName) {
    const task = {
        id: Date.now(),
        name: taskName,
        done: false
    }
    addTask(task);
    tasks.push(task);
    updateStorage(tasks);
}

function toggle(id) {
    tasks.forEach(function (task) {
        if (task.id.toString() === id) {
            task.done = !task.done;
        }
    });
    updateStorage(tasks);
}

function delFromList(id) {
    tasks = tasks.filter(function (task) {
        return task.id.toString() !== id;
    })
    updateStorage(tasks);
}

addTaskButton.addEventListener("click", function () {
    if (inputTask.value) {
        addToList(inputTask.value);
        inputTask.value = "";
    }
});

taskList.addEventListener("click", function (event) {
    if (event.target.type === "checkbox") {
        toggle(event.target.parentElement.parentElement.getAttribute("data-key"));
    }

    if (event.target.classList.contains("delete-btn")) {
        delFromList(event.target.parentElement.getAttribute("data-key"));
        event.target.parentNode.remove();
    }
})

if (tasks) {
    tasks.forEach(function (task) {
        addTask(task);
    });
}
