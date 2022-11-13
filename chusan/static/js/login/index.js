$(document).ready(() => {
  // Login
  $("#login-button").click(() => {
    // Lấy dữ liệu của các ô input
    let username = $("#username").val();
    let password = $("#password").val();
    
    username = username.toLowerCase();
    
    let data = {
      userName: username,
      password: password,
    };

    validateEmptyData(data);
    
    if(!validateUserName(username)){
        showMessage("Username không được có các ký tự đặc biệt, khoảng trắng", false)
        throw new Error("Username không được có các ký tự đặc biệt, khoảng trắng");
    }
    validatePassword(password);

    $.ajax({
      url: "http://127.0.0.1:8082/login",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (response) {
        if (response.state) {
          showMessage(response.message, true);
          setTimeout(() => {
            redirect("/chusan");
          }, 1000);
        } else {
          showMessage(response.message, false);
        }
      },
    });
  });

  // Register
  $("#register-button").click(() => {
    // Lấy dữ liệu của các ô input
    let userName = $("#userName").val();
    let password = $("#password").val();
    let confirmPassword = $("#confirmPassword").val();

    let phone = $("#phone").val();
    let firstName = $("#firstName").val();

    let data = {
      phone,
      firstName,
      userName,
      password,
      confirmPassword,
    };
    
    
    
    validateEmptyData(data);
    
    if(!isVietnamesePhoneNumberValid(phone)){
        showMessage("Số điện thoại không hợp lệ!", false)
        throw new Error("Số điện thoại không hợp lệ!");
    }
    
    if(!validateUserName(userName)){
        showMessage("Username không được có các ký tự đặc biệt, khoảng trắng", false)
        throw new Error("Username không được có các ký tự đặc biệt, khoảng trắng");
    }
    
    validatePasswordConfirm(password, confirmPassword);
    
    
    $.ajax({
      url: "http://127.0.0.1:8082/register",
      method: "POST",
      data: data,
      success: function (response) {
        if (response.state) {
          showMessage(response.message, true);
          setTimeout(() => {
            redirect("/login");
          }, 1000);
        } else {
          showMessage(response.message, false);
        }
      },
    });
  });
  
  // Register
  $("#change-button").click(() => {
    // Lấy dữ liệu của các ô input
    let currentPassword = $("#currentPassword").val();
    let password = $("#password").val();
    let confirmPassword = $("#confirmPassword").val();

    let data = {
      currentPassword,
      password,
      confirmPassword,
    };
    
    
    
    validateEmptyData(data);
    

    validatePassword(currentPassword)
    validatePasswordConfirm(password, confirmPassword);
    
    if(currentPassword === password){
        showMessage("Mật khẩu mới không được trùng mật khẩu cũ", false);
        throw new Error("Mật khẩu mới không được trùng mật khẩu cũ");
    }
    
    $.ajax({
      url: "http://127.0.0.1:8082/change-password",
      method: "POST",
      data: data,
      success: function (response) {
        if (response.state) {
          showMessage(response.message, true);
          setTimeout(() => {
            redirect("/login");
          }, 1000);
        } else {
          showMessage(response.message, false);
        }
      },
    });
  });
});

function validateEmptyData(data) {
  var result = Object.keys(data).some((currKey) => {
    if (data[currKey].length === 0) {
      $(`#${currKey}`).focus();
      showMessage("Không được để trống thông tin", false);
      throw new Error("Không được để trống thông tin");
    }
  });

  return result === false;
}

function isVietnamesePhoneNumberValid(number) {
  return /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(number);
}

function showMessage(message, isSuccess = true) {
  let type = isSuccess ? "success" : "fail";
  $(`#${type}-alert`).text(message);
  $(`#${type}-alert`)
    .fadeTo(2000, 500)
    .slideUp(500, function () {
      $(`#${type}-alert`).slideUp(500);
    });
}

function redirect(url = "/") {
  window.location.href = url;
}

function validateUserName(username){
  var usernameRegex = /^[a-zA-Z0-9]+$/;
  return usernameRegex.test(username);
}

function validatePassword(password){
  if(password.length < 6){
      showMessage("Password không được có ít hơn 6 ký tự", false);
      throw new Error("Password không được có ít hơn 6 ký tự");
  }
}

function validatePasswordConfirm(password, confirm){
   validatePassword(password);
   validatePassword(confirm);
    if(password !== confirm){
        showMessage("Mật khẩu và mật khẩu xác nhận cần trùng nhau", false);
        throw new Error("Mật khẩu và mật khẩu xác nhận cần trùng nhau");
    }
}