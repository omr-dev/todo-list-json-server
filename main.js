import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import axios from "axios";


document.querySelector("#app").innerHTML = `
<div class="container-lg pt-4">
<div class="card mx-auto" style="width: 80%;">
  <div class="card-header">
    <div class="input-group">
      <input type="text" class="form-control" placeholder="New item">
      <button class="btn btn-success" type="button" id="button-add-item">Add Item</button>
    </div>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">
      <div class="d-flex justify-content-between p-2">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="">
          <label class="form-check-label" for="flexCheckChecked">
            test item
          </label>

        </div>
        <div class="delete-button">
          <i class="fa-solid fa-trash text-danger"></i>
        </div>
    </li>
  </ul>
</div>

  
  
`;
