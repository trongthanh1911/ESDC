$(document).ready(() => {
    let searchParams = new URLSearchParams(window.location.search);
    
    if(!searchParams.has("id")){
        redirect();
        throw new Error("Trang chi tiết sân phải có id");
    }
    let id = searchParams.get('id');
    
    loadPitch(id);
});

function loadPitch(idSB) {
  $.ajax({
    url: `http://127.0.0.1:8082/api/sanbong/${idSB}`,
    method: "GET",
    success: function (pitch) {
    if(pitch){
        displayData(pitch);
        handleSuaSanBong(pitch);
        handleXoaSanBong(pitch); 
    }else{
        redirect();
    }
     

    }
  });
}

function displayData(pitch){
    // Display data
    pitch.image = pitch.image ? "../" + pitch.image : "../images/football-card-img.jpg";
    let contactList = $(".contact-list");

    let name = contactList.find("#textName").text(`Tên sân: ${pitch.name}`);
    let price = contactList.find("#textPrice").text(`Giá sân: ${pitch.price}`);
    let slot = contactList.find("#textSlot").text(`Số sân: ${pitch.slot}`);
    let img = $("img").attr("src", pitch.image);
    
    let cost = contactList.find("#textPrice").text(`Giá: ${formatOutputCost(pitch.cost)}`);   
    
    let address = contactList
      .find("#textAddress")
      .text(`Địa chỉ: ${pitch.address}`);
    let openTime = contactList
      .find("#textOpenTime")
      .text(`Giờ mở cửa: ${pitch.openTime}`);
    let closeTime = contactList
      .find("#textCloseTime")
      .text(`Giờ đóng cửa: ${pitch.closeTime}`);
    let description = $("#textDescription")
    .html(`<p>${pitch.description}</p>`);
      
    let googleMap = $(".google-map");
    googleMap.find("iframe").remove();
    
    googleMap.append(` 
        <iframe
            src="${pitch.map}"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
        ></iframe>`);
    
    let deleteName = $("#deleteName")
    .text(`${pitch.name}`);
    $("#deleteSanBongBtn").attr("data-id", `${pitch.idSB}`);
    $("#editSanBongBtn").attr("data-id", `${pitch.idSB}`);
}

function handleSuaSanBong(pitch){
    let name = $("#name");
    let description = $("#description");
    let address = $("#address");
    let map = $("#map");

    name.val(pitch.name);
    description.val(pitch.description);
    address.val(pitch.address);
    map.val(pitch.map);
    
    $("#editSanBongBtn").unbind("click");
    $("#editSanBongBtn").click((e) => {
        let name = $("#name");
        let description = $("#description");
        let address = $("#address");
        let map = $("#map");
        
        let data = {     
            idSB: pitch.idSB,
            idUser: pitch.idUser,
            name: name.val(),
            description: description.val(),
            address: address.val(),
            map: map.val(),
        };
                
        $.ajax({
            url: `http://127.0.0.1:8082/api/sanbong/${pitch.idSB}`,
            method: "PUT",
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (response) {
             if(response.state){
                 loadPitch(pitch.idSB);
                 showMessage("Sửa sân bóng thành công", true);
                 
                 setTimeout(() => {
                        $("#edit-modal").modal("hide");
                    }, 1000);
             }else{
                 showMessage("Sửa sân bóng thất bại!", false);
             }
            }
          });
    });
}

function handleXoaSanBong(pitch){
    $("#deleteSanBongBtn").unbind("click");
    $("#deleteSanBongBtn").click(() => {
        $.ajax({
            url: `http://127.0.0.1:8082/api/sanbong/${pitch.idSB}`,
            method: "DELETE",
            success: function (response) {        
             if(response.state){
                 showMessage2("Xóa sân bóng thành công", true);
                 setTimeout(()=>{
                     redirect();
                 },1000);
             }else{
                 showMessage2("Xóa sân bóng thất bại", false);
             }
            }
        });
    })
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
      $(`#${type}-alert2`).slideUp(500);
    });
}

function redirect(href="/chusan"){
    window.location.href=href;
}

function formatTime(time){
    return time.length !== 8 ? time+":00" : time;
}
function formatOutputCost(cost){
        // Create our number formatter.
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'VND',
    });

    return formatter.format(cost*1000);
}