<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<link rel="stylesheet" href="../css/chusan/style.css"/>
<script src="../js/chusan/pitch_detail.js"></script>
<div class="container-fluid">
  <div class="row mb-5">
    <div class="col-12">
      <h1>Trang chi tiết sân bóng</h1>
    </div>
  </div>
  <div class="row mb-5">
    <div class="col-md-12 col-lg-8">
      <img width="100%" alt="" />
    </div>
    <div class="col-md-12 col-lg-4 detail">
        <h2>Mô tả</h2>
      <div class="detail-content" id="textDescription">>
      </div>
    </div>
  </div>
  <div class="row mb-5">
    <div class="col-md-12 col-lg-8 google-map p-0">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4847582195434!2d106.667648514589!3d10.774135592323038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752edc1a966807%3A0x3ca1685aa48db267!2zU8OibiBCw7NuZyDEkcOhIFRp4buDdSBOZ8aw!5e0!3m2!1svi!2s!4v1650001468642!5m2!1svi!2s"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
    <div class="col-md-12 col-lg-4 contact-wrapper">
      <h3>Thông tin chi tiết</h3>
      <ul class="contact-list">
        <li class="contact-item">
          <div class="info-box">
            <span class="info-box__icon">
              <i class="fa-solid fa-futbol"></i>
            </span>
            <p class="info-box__text" id="textName">
              Tên sân: Sân bóng đá Mini cỏ nhân tạo Hồng Bảy
            </p>
          </div>
        </li>
        <li class="contact-item">
          <div class="info-box">
            <span class="info-box__icon">
              <i class="fa-solid fa-hand-holding-dollar"></i>
            </span>
            <p class="info-box__text" id="textPrice">Giá: 400.000Đ</p>
          </div>
        </li>
        <li class="contact-item">
          <div class="info-box">
            <span class="info-box__icon">
              <i class="fa-solid fa-list-ol"></i>
            </span>
            <p class="info-box__text" id="textSlot">Số sân: 4</p>
          </div>
        </li>
        <li class="contact-item">
          <div class="info-box">
            <span class="info-box__icon">
              <i class="fa-solid fa-location-dot"></i>
            </span>
            <p class="info-box__text" id="textAddress">
              Địa chỉ: 780/14e Sư Vạn Hạnh, Phường 12, Quận 10, Thành phố Hồ Chí
              Minh, Việt Nam
            </p>
          </div>
        </li>

        <li class="contact-item">
          <div class="info-box">
            <span class="info-box__icon">
              <i class="fa-solid fa-clock"></i>
            </span>
            <p class="info-box__text" id="textOpenTime">Giờ mở cửa: 9:00AM</p>
          </div>
        </li>

        <li class="contact-item">
          <div class="info-box">
            <span class="info-box__icon">
              <i class="fa-solid fa-clock"></i>
            </span>
            <p class="info-box__text" id="textCloseTime">Giờ đóng cửa: 10:00PM</p>
          </div>
        </li>

        <li class="contact-item">
          <button
            class="btn btn-outline-primary mr-3"
            type="button"
            data-toggle="modal"
            data-target="#edit-modal"
          >
            Sửa sân bóng
          </button>
          <button
            class="btn btn-outline-primary"
            type="button"
            data-toggle="modal"
            data-target="#delete-modal"
          >
            Xóa sân bóng
          </button>
        </li>
      </ul>
    </div>
      
    <!-- Edit MODAL -->
    <div class="modal" id="edit-modal">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title" style="color: var(--main-color)">
              Sửa thông tin sân bóng
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
                  value="Sân bóng đá Mini cỏ nhân tạo Hồng Bảy"
                />
              </div>
              <div class="form-group">
                <label for="address">Description:</label>
                <textarea
                  class="form-control"
                  name="description"
                  rows="3"
                  id="description"
                >
Sân bóng đá Mini cỏ nhân tạo Hồng Bảy được xây dựng hệ thống nhiều sân, tổ hợp gồm 6 sân 5 người. Sân bóng có đầy đủ tiện ích, công trình phụ trợ được đầu tư bài bản. Nằm ở khu vực giao thông thuận lợi, vị trí rộng rãi, thoáng mát.

Nằm ở trung tâm quận Bình Tân, Sân bóng Hồng Bảy là địa điểm yêu thích của công đồng bóng đá phủi quanh khu vực, bên cạnh đó chất lượng mặt cỏ tốt, thái độ nhân viên và giá thuê đều được đánh giá cao.
                  </textarea
                >
              </div>
              <div class="form-group">
                <label for="address">Address:</label>
                <input
                  class="form-control"
                  id="address"
                  type="text"
                  value="780/14e Sư Vạn Hạnh, Phường 12, Quận 10, Thành phố Hồ Chí Minh, Việt Nam"
                />
              </div>
                <div class="form-group">
                <label for="map">Google Map:</label>
                <input
                  class="form-control"
                  id="map"
                  type="text"
                  placeholder="Enter google map link"
                />
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
              id="editSanBongBtn"
              name="submit"
              class="btn btn-sm btn-primary p-2"
            >
              Xác nhận sửa
            </button>
          </div>
        </div>
      </div>
    </div>

    <!--Delete MODAL -->
    <div class="modal" tabindex="-1" role="dialog" id="delete-modal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Xác nhận xóa sân bóng</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>
                Bạn có chắc là bạn muốn xóa <span id="deleteName">Sân bóng đá Mini cỏ nhân tạo Hồng Bảy</span> 
              không?
            </p>
            <div class="form-group">
              <div
                id="fail-alert2"
                class="alert alert-danger mt-2"
                style="opacity: 0; display: none"
              >
                This type of file is not allowed
              </div>
              <div
                id="success-alert2"
                class="alert alert-success mt-2"
                style="opacity: 0; display: none"
              >
                This type of file is allowed
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <a>
              <button
                type="button"
                class="btn btn-danger"
                id="deleteSanBongBtn"
              >
                Confirm
              </button>
            </a>

            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
