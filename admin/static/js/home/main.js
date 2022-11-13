// Sroll navbar
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;

  if (currentScrollPos > 20) {
    $(".navbar").css(
      "background",
      "linear-gradient(to right, #8e54e9, #4776e6)"
    );
  } else {
    $(".navbar").css("background", "");
  }
};

$(document).ready(function () {
  // Login drop-down menu
  $("#login-menu-btn").click((e) => {
    $(".drop-down").toggle("active");
  });

  // Slider
  var sliderDotItems = $(".slider-dots__item");
  var sliderMain = $(".slider-main");
  var sliderMainItems = $(".slider-main__item");

  var index = 0;
  sliderDotItems.click(handleDotClicked);

  function handleDotClicked(e) {
    index = parseInt(e.target.getAttribute("data-index"));

    sliderMain.css({ transform: `translateX(${-1 * index * 100}%)` });
  }

  function handleArrowLeft(e) {
    if (index <= 0) {
      index = sliderMainItems.length;
    }
    index--;
    sliderMain.css({ transform: `translateX(${-1 * index * 100}%)` });
  }

  function handleArrowRight(e) {
    if (index >= sliderMainItems.length - 1) {
      index = -1;
    }
    index++;
    sliderMain.css({ transform: `translateX(${-1 * index * 100}%)` });
  }

  var arrowLeft = $(".slider-arrow--left");
  var arrowRight = $(".slider-arrow--right");

  arrowLeft.click(handleArrowLeft);
  arrowRight.click(handleArrowRight);

  $("#menu-btn").click(() => {
    $(".navbar").toggleClass("active");
  });
  
  $("#search-by-name").on('keypress',function(e) {
    if(e.which == 13) {
        e.preventDefault();
        loadPitchesByKeyWord(e.target.value);
    }
});

  $(".product-search__btn").click(()=>{
      let keyword = $("#search-by-name").val();
       loadPitchesByKeyWord(keyword);
  });
  // load sân
  loadPitches();
  

  // JS for don-dat-san page
  if (document.getElementById("don-dat-san")) {
    loadLichSuDatSan();
  }
  // JS for san-bong-detail page
  if (document.getElementById("home-san-bong-detail")) {
    let searchParams = new URLSearchParams(window.location.search);

    if (!searchParams.has("idSB")) {
      redirect();
      throw new Error("Trang chi tiết sân phải có id");
    }
    
    let cost = $(".price-value").text();
    $(".price-value").text(formatOutputCost(cost));
    
    //  Load đặt sân modal
    $("#selectBox").change((e) => {
      // load schedules to the schedule modal
      loadModal();
    });

    $("#confirm-btn").click(() => {
      // get selected time schedules;
      var selectedTimes = document.querySelectorAll(".time-item.selected-link");
      var idSchedules = [];
      selectedTimes.forEach((curr, idx) => {
        // get out id schedules
        let idSchedule = curr.querySelector("span").getAttribute("data-id");
        idSchedules.push(parseInt(idSchedule));
      });

      if (idSchedules) {
        // Đẩy dữ liệu lên server
        $.ajax({
          url: `http://127.0.0.1:8082/api/sanbong/schedule`,
          method: "POST",
          contentType: "application/json",
          data: JSON.stringify(idSchedules),
          success: function (response) {
            showMessage(response.message, response.state);
            if (response.state) {
                loadModal();
                setTimeout(() => {
                    $("#book-modal").modal("hide");
                }, 1000);
                
            };
          },
        });
      } else {
        showMessage("Vui lòng chọn Sân và chọn giờ đặt sân!", false);
      }
    });
  }
});

function loadLichSuDatSan() {
  $.ajax({
    url: "http://127.0.0.1:8082/api/don-dat-san",
    method: "GET",
    success: function (histories) {
      let table = $("#table-content");
      table.find("tr").remove();
      let totalCost = 0;
      histories.forEach((history) => {
        let statusMessage = {
          "-1": "Từ chối",
          0: "Chờ thanh toán",
          1: "Thành công"
        };
        
        if(!history.state){
            totalCost += history.cost;
        }
        let type = history.state == 1 ? "success" : "danger";
        let content = `
                 <tr>
                  <td>${history.idSchedule}</td>
                  <td>${history.name}</td>
                  <td>${history.address}</td>
                  <td>${formatOutputCost(history.cost)}</td>
                  <td class="text-success font-weight-bold">${formatOutputTime(
                    history.batDau
                  )} - ${formatOutputTime(history.ketThuc)}</td>
                  <td class="text-${type} font-weight-bold">${
          statusMessage[history.state]
        }</td>
                  <td>${history.createdAt}</td>
                  <td>
                    <a class="btn btn-sm btn-primary" href="/sanbong?idSB=${
                      history.idSB
                    }">View</a>
                  </td>
                </tr>`;
        table.append(content);
        $("#payment").text(formatOutputCost(totalCost));
      });
    },
  });
}
function loadModal() {
  let searchParams = new URLSearchParams(window.location.search);
  let idSB = parseInt(searchParams.get("idSB"));
  let idSlot = $("#selectBox").val();

  // Dùng để load dữ liệu của modal đặt sân
  $.ajax({
    url: `http://127.0.0.1:8082/api/sanbong/schedule/${idSB}/${idSlot}`,
    method: "GET",
    success: function (schedules) {
      let ul = $(".time-list");
      ul.find("div").remove();
      schedules.forEach((schedule) => {
        let listItem = `<div class="col-6 col-sm-4 mb-3">
                                <li class="time-item" onclick="timeClicked(this)">
                                <span data-id="${
                                  schedule.idSchedule
                                }">${formatOutputTime(
          schedule.batDau
        )} - ${formatOutputTime(schedule.ketThuc)}</span>
                                </li>
                            </div>`;
        ul.append(listItem);
      });
    },
  });
}

function loadPitches() {
  $.ajax({
    url: `http://127.0.0.1:8082/api/sanbong`,
    method: "GET",
    success: function (pitches) {
      let ul = $(".products");
      ul.find("li").remove();

      pitches.forEach((pitch) => {
        pitch.image = pitch.image
          ? "../" + pitch.image
          : "../images/football-card-img.jpg";
          
        let listItem = `<li class="col-sm-6 col-md-4 col-lg-3 products__item">
          <a href="/sanbong?idSB=${pitch.idSB}">
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

function loadPitchesByKeyWord(keyword) {
  $.ajax({
    url: `http://127.0.0.1:8082/api/sanbong/keyword`,
    method: "POST",
    data: { keyword },
    success: function (pitches) {
        
      let ul = $(".products");
      ul.find("li").remove();
      
      pitches.forEach((pitch) => {
        pitch.image = pitch.image
          ? "../" + pitch.image
          : "../images/football-card-img.jpg";
          
        let listItem = `<li class="col-sm-6 col-md-4 col-lg-3 products__item">
          <a href="/sanbong?idSB=${pitch.idSB}">
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

function timeClicked(e) {
  e.classList.toggle("selected-link");
}

function redirect(href = "/") {
  window.location.href = href;
}

function formatOutputTime(date) {
  let tmp = date.split(":");
  return `${tmp[0]}:${tmp[1]}`;
}

function formatOutputCost(cost){
        // Create our number formatter.
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'VND',
    });

    return formatter.format(cost*1000);
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
