<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> 
<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    

<div id="toast"></div>

<div id="quan-ly-dat-san"></div>
<div class="container-fluid">
  <div class="row">
    <div class="col-12 col-md-10 offset-md-1">
      <div class="">
        <h1 class="text-center text-primary mb-3">Quản lý đặt sân</h1>
        <div class="info-body">
          <div class="table-wrapper-scroll-y">
            <table
              class="table table-bordered table-hover mt-4 table-responsive-md"
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên khách hàng</th>
                  <th>Số điện thoại</th>
                  <th>Sân Bóng</th>
                  <th>Sân</th>
                  <th>Khung giờ</th>
                  <th>Ngày tạo</th>
                  <th>Action</th>
                </tr>
              </thead>
              <!-- CONTENT -->
              <tbody id="table-content">
                  <!-- render by ajax -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!--Disapprove MODAL -->
<div class="modal" tabindex="-1" role="dialog" id="disapprove-modal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Xác nhận từ chối hóa đơn</h5>
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
            Bạn có chắc là bạn muốn từ chối đơn đặt sân của <span id="disapprove-name">Hoàng</span> không?
        </p>
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
      </div>

      <div class="modal-footer">
        <a>
          <button
            type="button"
            class="btn btn-danger"
            id="disapprove-btn"
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

<!--Approve MODAL -->
<div class="modal" tabindex="-1" role="dialog" id="approve-modal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Xác nhận đơn đặt sân</h5>
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
            Bạn có chắc là bạn muốn xác nhận đơn đặt sân của <span id="approve-name">Hoàng</span> không?
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
            class="btn btn-success"
            id="approve-btn"
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
<script src="../js/chusan/main.js"></script>
