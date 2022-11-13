$(document).ready(() => {
    loadChuSanAccounts();  
    
    $("#add-account-btn").click(handleAddChuSanAccount);
    $("#delete-btn").click(handleDeleteModal);
});

function handleAddChuSanAccount(e){
    let userName = $("#userName").val();
    let firstName = $("#firstName").val();
    let lastName = $("#lastName").val();
    let sex = $("#sex").val();
    let birthDay = $("#birthDay").val();
    let sdt = $("#sdt").val();
    let cmnd = $("#cmnd").val();
    
    let data = {
      userName,
      firstName,
      lastName,
      sex,
      birthDay,
      sdt,
      cmnd
    };
    
    validateEmptyData(data);
    
    if(!isValidPhoneNumber(sdt)){
        showMessage("Vui lòng nhập sdt hợp lệ",false);
        throw new Error("Vui lòng nhập sdt hợp lệ");
    }
    
    if(!isValidCmnd(cmnd)){
        showMessage("Vui lòng nhập cmnd hợp lệ",false);
        throw new Error("Vui lòng nhập cmnd hợp lệ");
    }
    
    $.ajax({
    url: "http://127.0.0.1:8082/api/admin/accounts",
    method: "POST",
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: function (response) {
      showMessage(response.message, response.state);
      if(response.state){
        loadChuSanAccounts();

        setTimeout(() => {
              $("#add-acount-modal").modal("hide");
          }, 1000);
      }
    }
    });
}

function isValidPhoneNumber(phoneNumber){
    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    
    return vnf_regex.test(phoneNumber);
}


function isValidCmnd(cmnd){
    return cmnd.length <= 12;
}
         
function loadChuSanAccounts(){
    $.ajax({
        url: "http://127.0.0.1:8082/api/admin/accounts",
        method: "GET",
        success: function(accounts){
            let table = $("#table-content");
            table.find("tr").remove();
            accounts.forEach((account)=>{
               let content = `
                 <tr>
                    <td>${account.idUser}</td>
                    <td>${account.userName}</td>
                    <td>${account.lastName} ${account.firstName}</td>
                    <td>${account.cmnd}</td>
                    <td>${account.sdt}</td>
                    <td>
                        <a href="/profile/${account.idUser}" class="btn btn-sm btn-primary">
                            <i class="fa-solid fa-eye"></i>
                        </a>
                        <button type="button" class="btn btn-sm btn-danger" data-toggle="modal" data-target="#delete-modal" onclick="passNameToModal(this)" data-id="${account.idUser}" data-name="${account.userName}">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                </tr>`; 
                table.append(content);
            });
        }
    });
}

function handleDeleteModal(e){
    e.preventDefault();
    let idAccount = e.target.getAttribute("data-id");

    $.ajax({
        url: `http://127.0.0.1:8082/api/admin/accounts/${idAccount}`,
        method: "DELETE",
        success: function(response){
            if(response.state){
                showMessage2(response.message);
                loadChuSanAccounts();
                setTimeout(()=>{
                    $("#delete-modal").modal("hide");
                }, 1000);
            }else{
                showMessage2(response.message, false);
            }
        }

});
}

function formatOutputCost(cost){
        // Create our number formatter.
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'VND',
    });

    return formatter.format(cost*1000);
}

function validateDate(openTime, closeTime){
    console.log(openTime, closeTime);
    
    if(openTime >= closeTime){
        showMessage("Giờ mở cửa không được sớm hơn giờ đóng cửa", false);
        throw new Error("Giờ mở cửa không được sớm hơn giờ đóng cửa");
    }
}
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

function passNameToModal(e){
    $("#delete-name").text(e.getAttribute("data-name"));
    $("#delete-btn").attr("data-id", e.getAttribute("data-id"));
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

function showMessage2(message, isSuccess = true) {
  let type = isSuccess ? "success" : "fail";
  $(`#${type}-alert2`).text(message);
  $(`#${type}-alert2`)
    .fadeTo(2000, 500)
    .slideUp(500, function () {
      $(`#${type}-alert`).slideUp(500);
    });
}

function getExtension(filename) {
  return filename.split(".").pop();
}

function formatTime(time){
    return time.length !== 8 ? time+":00" : time;
}

function formatOutputTime(date){
    let tmp = date.split(":");
    return `${tmp[0]}:${tmp[1]}`;
}