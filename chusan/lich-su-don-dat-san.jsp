<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> 
<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    

<div id="toast"></div>

<div id="lich-su-dat-san"></div>
<div class="container-fluid">
  <div class="row">
    <div class="col-12 col-md-10 offset-md-1">
      <div class="">
        <h1 class="text-center text-primary mb-3">Lịch sử đơn đặt sân</h1>
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
                  <th>Trạng thái</th>
                  <th>Ngày tạo</th>
                </tr>
              </thead>
              <!-- CONTENT -->
              <tbody id="table-content">
                <tr>
                    <!-- render by ajax -->
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script src="../js/chusan/main.js"></script>
