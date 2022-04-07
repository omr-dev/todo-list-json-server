import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import axios from "axios";

const appElem = document.querySelector("#app");
const dbUrl = "http://localhost:3002/todos";

appElem.innerHTML = `
<div class="container-lg pt-4">
<div class="card mx-auto" style="width: 80%;">
  <div class="card-header">
    <div class="input-group">
      <input type="text" class="form-control new-task-input" placeholder="New item">
      <button class="btn btn-success" type="button" id="button-add-item">Add Item</button>
    </div>
  </div>
  <ul class="list-group list-group-flush tasks-list">
  </ul>
  </div>`;

const addTaskElem = document.querySelector("#button-add-item");
const newTaskDetails = document.querySelector(".new-task-input");
newTaskDetails.addEventListener("keydown",(e)=>e.keyCode===13? addNewTask():"");
addTaskElem.addEventListener("click", addNewTask);

async function addNewTask() {
  await axios.post(dbUrl, {
    detail: newTaskDetails.value,
    isCompleted: false,
  });
  document.querySelector(".new-task-input").value = "";
  loadTasks();
}
async function deleteTask(e) {
  const targetTaskId = e.target.getAttribute("data-task-id");
  await axios.delete(dbUrl + "/" + targetTaskId);
  loadTasks();
}
async function updateTaskStatus(e) {
  const targetTaskId = e.target.getAttribute("data-task-id");

  if (this.checked) {
    console.log("checked task");
    await axios.patch(dbUrl + "/" + targetTaskId, { isCompleted: true });
  } else {
    console.log("unchecked");
    await axios.patch(dbUrl + "/" + targetTaskId, { isCompleted: false });
  }
  loadTasks();
}

async function loadTasks() {
  const response = await axios.get(dbUrl);
  const tasks = response.data;
  const tasksListElem = document.querySelector(".tasks-list");
  tasksListElem.innerHTML = "";

  tasks.map((task) => {
    tasksListElem.innerHTML += ` 
        <li class="list-group-item">
      <div class="d-flex justify-content-between p-2">
        <div class="form-check">
          
          <input class="form-check-input" type="checkbox" data-task-id="${
            task.id
          }" value="" ${task.isCompleted ? "checked" : ""}>
          <label class="form-check-label" for="flexCheckChecked">
          ${task.isCompleted ? "<s>" : ""}${task.detail} ${
      task.isCompleted ? "</s>" : ""
    }
          </label>

        </div>
        <div class="delete-button" >
          <i class="fa-solid fa-trash text-danger" data-task-id="${
            task.id
          }"></i>
        </div>
    </li>`;
  });
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", deleteTask);
  });
  const checkboxes = document.querySelectorAll(".form-check-input");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", updateTaskStatus);
  });
}
loadTasks();
