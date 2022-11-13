$(document).ready(() => {
  const SUPPORTED_EXTENSIONS = ["jpg", "png"];
  const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB

  loadPitches();

  $("#add-pitch-btn").click(() => {
    handleUploadPitch();
    
  });
    
    if(document.getElementById("quan-ly-dat-san")){
         loadDonDatSan();
         handleDisapproveModal();
         handleApproveModal();
    }
    if(document.getElementById("lich-su-dat-san")){
        loadLichSuDonDatSan();
    }
     
});

function handleUploadPitch(){
    // Lấy dữ liệu của các ô input
    let name = $("#name").val();
    let description = $("#description").val();
    let address = $("#address").val();
    let map = $("#map").val();
    let slot = $("#slot").val();
    let cost = $("#cost").val();
    let openTime = $("#openTime").val();
    let closeTime = $("#closeTime").val();

    let data = {
      name,
      description,
      address,
      map,
      slot,
      cost,
      openTime,
      closeTime
    };
    
 
    validateEmptyData(data);
    
    data.openTime = formatTime(openTime);
    data.closeTime = formatTime(closeTime);
    
    validateDate(data.openTime, data.closeTime);
    
    let input = document.getElementById("image");
    
    if(!input.files[0]){
        showMessage("Phải thêm hình ảnh mô tả sân", false);
        throw new Error("Phải thêm hình ảnh mô tả sân!");
    }
//  Sau này làm chức năng login sẽ lấy idUser trong session
    data.idUser = 1; 
    
    $.ajax({
    url: "http://127.0.0.1:8082/api/sanbong",
    method: "POST",
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: function (response) {
      if(response.state){
            handleUploadImagePitch();
            showMessage(response.message, true);
        }else{
            showMessage("Thêm sân bóng thất bại!", false);
        }
    }
    });
}

function handleUploadImagePitch(){
    const SUPPORTED_EXTENSIONS = ["jpg", "png"];
    const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB 
  
    let input = document.getElementById("image");

    data = new FormData();

    if (input.files[0]) {
      let file = input.files[0];
      let extension = getExtension(file.name);
      let size = file.size;

      if (size >= MAX_FILE_SIZE) {
        showMessage("Vui lòng upload ảnh có kích thước < 500MB", false);
        throw new Error("Vui lòng upload ảnh có kích thước < 500MB");
      }
      if (!SUPPORTED_EXTENSIONS.includes(extension)) {
        showMessage(
          "Kiểu dữ liệu không được hỗ trợ (Chỉ hỗ trợ jpg, png)",
          false
        );
        throw new Error("Kiểu dữ liệu không được hỗ trợ (Chỉ hỗ trợ jpg, png)");
      }
      data.append("file_name", file.name);
      data.append("file", file);
    }

    let xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", function (e) {
      let loaded = e.loaded;
      let total = e.total;
      let progress = (loaded * 100) / total;

      $(".progress-bar").attr("style", "width: " + progress + "%;");
    });

    xhr.onload = function () {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
          let response = JSON.parse(xhr.responseText);
          loadPitches();
          setTimeout(() => {
                $("#add-modal").modal("hide");
            }, 1000);
          // RESET PROGRESS BAR
          setTimeout(function () {
            $(".progress-bar").attr("style", "width: 0");
          }, 2000);
        }
      }
    };

    xhr.open("POST", "upload/sanbong", true);
    xhr.send(data);
}
function handleDisapproveModal(){
    $("#disapprove-btn").click((e)=>{
        e.preventDefault();
        let idDon = e.target.getAttribute("data-id");
        
        $.ajax({
            url: `http://127.0.0.1:8082/api/chusan/don-dat-san/${idDon}`,
            method: "DELETE",
            success: function(response){
                if(response.state){
                    showMessage(response.message);
                    loadDonDatSan();
                    setTimeout(()=>{
                        $("#disapprove-modal").modal("hide");
                    }, 1000);
                }else{
                    showMessage(response.message, false);
                }
            }
            
    });
    });
}

function handleApproveModal(){
    $("#approve-btn").click((e)=>{
        e.preventDefault();
        let idDon = e.target.getAttribute("data-id");
        
        $.ajax({
            url: `http://127.0.0.1:8082/api/chusan/don-dat-san/${idDon}`,
            method: "POST",
            success: function(response){
                if(response.state){
                    showMessage2(response.message);
                    loadDonDatSan();
                    setTimeout(()=>{
                        $("#approve-modal").modal("hide");
                    }, 1000);
                }else{
                    showMessage2(response.message, false);
                }
            }
            
    });
    });
}

function passNameToModal(e){
    $("#approve-name").text(e.getAttribute("data-name"));
    $("#approve-btn").attr("data-id", e.getAttribute("data-id"));
    
    $("#disapprove-name").text(e.getAttribute("data-name"));
    $("#disapprove-btn").attr("data-id", e.getAttribute("data-id"));
}
         
function loadDonDatSan(){
    $.ajax({
        url: "http://127.0.0.1:8082/api/chusan/don-dat-san",
        method: "GET",
        success: function(histories){
            let table = $("#table-content");
            table.find("tr").remove();
            histories.forEach((history)=>{
               let content = `
                 <tr>
                  <td>${history.idDon}</td>
                  <td>${history.name}</td>
                  <td>${history.sdt}</td>
                  <td>${history.pitchName}</td>
                  <td>Sân ${history.idSlot}</td>
                  <td class="text-success font-weight-bold">${formatOutputTime(history.batDau)} - ${formatOutputTime(history.ketThuc)}</td>
                  <td>${history.createdAt}</td>
                  <td>
                    <button type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#approve-modal" onclick="passNameToModal(this)" data-id="${history.idDon}" data-name="${history.name}">
                        <i class="fa-solid fa-check"></i>
                    </button>
                    <button type="button" class="btn btn-sm btn-danger" data-toggle="modal" data-target="#disapprove-modal" onclick="passNameToModal(this)" data-id="${history.idDon}" data-name="${history.name}">
                        <i class="fa-solid fa-circle-xmark"></i>
                    </button>
                  </td>
                </tr>`; 
                table.append(content);
            });
        }
    });
}

function loadLichSuDonDatSan(){
    $.ajax({
        url: "http://127.0.0.1:8082/api/chusan/lich-su-don-dat-san",
        method: "GET",
        success: function(histories){
            let table = $("#table-content");
            table.find("tr").remove();
            histories.forEach((history)=>{
                let statusMessage = {
                    "-1": "Từ chối",
                    0: "Chờ thanh toán",
                    1: "Thành công",
                };
              let type = history.state == 1 ? "success" : "danger";
               let content = `
                 <tr>
                  <td>${history.idDon}</td>
                  <td>${history.name}</td>
                  <td>${history.sdt}</td>
                  <td>${history.pitchName}</td>
                  <td>Sân ${history.idSlot}</td>
                  <td class="text-success font-weight-bold">${formatOutputTime(history.batDau)} - ${formatOutputTime(history.ketThuc)}</td>
                  <td class="text-${type} font-weight-bold">${statusMessage[history.state]}</td>
                  <td>${history.createdAt}</td>      
                </tr>`; 
                table.append(content);
            });
        }
    });
}


function loadPitches() {
  $.ajax({
    url: `http://127.0.0.1:8082/api/sanbong/chusan`,
    method: "GET",
    success: function (pitches) {
      let ul = $(".products");
      ul.find("li").remove();
      
      pitches.forEach((pitch) => {
          pitch.image = pitch.image ? "../" + pitch.image : "../images/football-card-img.jpg";
            let listItem = `<li class="col-sm-6 col-md-4 col-lg-3 products__item">
              <a href="/chusan/sanbong?id=${pitch.idSB}">
                <div class="products__card">
                  <img
                    src="${pitch.image}"
                    alt="#"
                    class="products__card-img"
                  />
                  <div class="products__card-body">
                    <h5 class="products__card-title">
                      ${pitch.name}
                    </h5>
                    <p>
                      Giá <span class="products__card-price">${formatOutputCost(pitch.cost)}</span> /
                      Trận
                    </p>
                    <p class="products__card-description">
                      ${pitch.address}
                    </p>
                  </div>
                </div>
              </a>
            </li>`;
            ul.append(listItem);
        
      });
    },
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