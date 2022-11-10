<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel="stylesheet" href="css/chusan/style.css"/>

<div id="toast"></div>
<main class="body">
  <div class="container-fluid">
    <div class="row mb-5">
      <div class="col-12">
        <h1>Quản lý sân bóng</h1>
      </div>
      <div class="col-12">
        <button
          class="btn btn-outline-primary"
          type="button"
          data-toggle="modal"
          data-target="#add-modal"
        >
          Thêm Mới
        </button>
      </div>
    </div>
    <ul class="row products">
        <!-- Content will be loaded by ajax -->
    </ul>
  </div>
</main>

<!-- ADD MODAL -->
    <div class="modal" id="add-modal">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title" style="color: var(--main-color)">
              Thêm sân bóng mới
            </h3>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>
          <div class="modal-body">
            <form method="POST" enctype="multipart/form-data">
              <div class="form-group">
                <label for="name">Name of the pitch:</label>
                <input
                  class="form-control"
                  id="name"
                  type="text"
                  placeholder="Enter pitch's name"
                />
              </div>
              <div class="form-group">
                <label for="address">Description:</label>
                <textarea
                  class="form-control"
                  name="description"
                  rows="3"
                  id="description"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="address">Address:</label>
                <input
                  class="form-control"
                  id="address"
                  type="text"
                  placeholder="Enter address"
                />
              </div>
              <div class="form-group">
                <label for="address">Google Map:</label>
                <input
                  class="form-control"
                  id="map"
                  type="text"
                  placeholder="Enter google map link"
                />
              </div>
              <div class="form-group">
                <label for="slot">Slot:</label>
                <input
                  class="form-control"
                  id="slot"
                  type="number"
                  min="1"
                  value="1"
                />
              </div>
                <div class="form-group">
                <label for="cost">Cost:</label>
                <input
                  class="form-control"
                  id="cost"
                  type="number"
                  min="1"
                  value="100"
                />
              </div>
              <div class="form-group">
                <label for="openTime">Open Time:</label>
                <input class="form-control" id="openTime" type="time" />
              </div>
              <div class="form-group">
                <label for="closeTime">Close Time:</label>
                <input class="form-control" id="closeTime" type="time" />
              </div>

              <div class="form-group">
                <div class="form-group">
                  <label for="image">Upload your pitch's image</label>
                </div>
                <div class="custom-file">
                  <input
                    type="file"
                    name="file"
                    class="custom-file-input"
                    id="image"
                  />
                  <label class="custom-file-label" for="image"
                    >Choose file</label
                  >
                </div>
              </div>

              <div class="progress">
                <div class="progress-bar" style="width: 0%"></div>
              </div>

              <div class="form-group">
                <div
                  id="fail-alert"
                  class="alert alert-danger mt-2"
                  style="opacity: 0; display: none"
                >
                  This type of file is not allowed
                </div>
                <div
                  id="success-alert"
                  class="alert alert-success mt-2"
                  style="opacity: 0; display: none"
                >
                  This type of file is allowed
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              id="add-pitch-btn"
              name="submit"
              class="btn btn-sm btn-primary p-2"
            >
              Thêm sân bóng
            </button>
          </div>
        </div>
      </div>
 </div>

<script src="js/chusan/main.js"></script>
