let send_data = {};

// dateTimePicker & 日期驗證
$(function weekDay() {
  $.ajax({
    url: "../reservation/restaurant/date",
    type: "GET",
    dataType: "json",
    success: function (arr) {
      console.log(arr);
      const array1 = arr;
      const weekdays = array1.map((x) => x - 1);
      console.log(weekdays);

      $("#reserveDate")
        .datepicker({
          dateFormat: "yy-mm-dd",
          minDate: +1,
          maxDate: "+1m",
          beforeShowDay: function (dt) {
            return [weekdays.includes(dt.getDay()), ""];
          },
          onClose: function (date, datepicker) {
            if (date != "") {
              let reserveDate = $("#reserveDate").val();
              send_data.reserveDate = reserveDate;
              console.log(send_data.reserveDate);
              document.querySelector(".date_error").innerHTML = "";
              document.querySelector("#reserveDate").style.border = "none";
            } else {
              document.querySelector(".date_error").innerHTML =
                "請輸入想要訂位日期";
              document.querySelector("#reserveDate").style.border =
                "2px solid #F6D0C0";
            }
          },
        })
        .val();
    },
  });
});

// google map
// const params = new Proxy(new URLSearchParams(window.location.search), {
//   get: (searchParams, prop) => searchParams.get(prop),
// });
// let restaurantAddr = params.restaurantAddr;
// console.log(value)
var restaurantAddr = "台南火車站";
function initMap() {
  geocoder = new google.maps.Geocoder();
  var myLatLng = new google.maps.LatLng(25.04, 121.512);
  var mapOptions = {
    center: myLatLng,
    zoom: 16,
  };
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  codeAddress(restaurantAddr);
}
function codeAddress(address) {
  geocoder.geocode({ address: address }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location); //center the map over the result
      //place a marker at the location
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
      });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

// 訂位時段驗證
$("#reserveTime").on("change", () => {
  let reserveTime = $("#reserveTime").val();
  if (reserveTime != "") {
    send_data.reserveTime = reserveTime;
    console.log(send_data.reserveTime);

    document.querySelector(".time_error").innerHTML = "";
    document.querySelector(".nice-select").style.border = "none";
  } else {
    // alert("請輸入想要訂位時段");
    document.querySelector(".time_error").innerHTML = "請輸入想要訂位時段";
    document.querySelector(".nice-select").style.border = "2px solid #F6D0C0";
  }
});

// 可訂位人數驗證
let availableNum;
document.querySelector("#reserveNum").addEventListener("click", () => {
  let date = $("#reserveDate").val();
  let time = $("#reserveTime").val();
  if (!date || !time) {
    if (!date && !time) {
      console.log("1");
      document.querySelector(".date_error").innerHTML = "請輸入想要訂位日期";
      document.querySelector("#reserveDate").style.border = "2px solid #F6D0C0";
      document.querySelector(".time_error").innerHTML = "請輸入想要訂位時段";
      document.querySelector(".nice-select").style.border = "2px solid #F6D0C0";
    } else if (!time) {
      console.log("2");
      document.querySelector(".time_error").innerHTML = "請輸入想要訂位時段";
      document.querySelector(".nice-select").style.border = "2px solid #F6D0C0";
    } else {
      console.log("4");
      document.querySelector(".date_error").innerHTML = "請輸入想要訂位日期";
      document.querySelector("#reserveDate").style.border = "2px solid #F6D0C0";
    }
  } else {
    console.log("3");
    // $("#reserveNum").on("blur", () => {
    $.ajax({
      url: "../reservation/restaurant/seat",
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({
        reserveDate: send_data.reserveDate,
        reserveTime: send_data.reserveTime,
      }),
      success: function (a) {
        availableNum = a;
        console.log(a);
        $("#reserveNum").attr(
          "placeholder",
          "請輸入訂位人數 (可訂位人數：" + a + ")"
        );
        checkReserveNum(a);
      },
    });
    // });
  }
});

function checkReserveNum(num) {
  document.querySelector("#reserveNum").addEventListener("focusout", () => {
    console.log(availableNum);
    let reserveNum = $("#reserveNum").val();
    console.log("reserveNum=" + reserveNum);
    if (!reserveNum) {
      document.querySelector(".num_error").innerHTML = "請輸入想要訂位人數";
      document.querySelector("#reserveNum").style.border = "2px solid #F6D0C0";
      document.querySelector("#reserveNum").style.paddingLeft = "40px";
    } else if (reserveNum > num) {
      document.querySelector(".num_error").innerHTML =
        "超出可訂位人數，請重新填寫";
      document.querySelector("#reserveNum").style.border = "2px solid #F6D0C0";
    } else {
      send_data.reserveNum = reserveNum;
      document.querySelector(".num_error").innerHTML = "";
      document.querySelector("#reserveNum").style.border = "none";
    }
  });
}

// submit訂位資訊 + 驗證
$("#btn_reserve").on("click", function (e) {
  e.preventDefault();

  if (
    !send_data.reserveDate &&
    !send_data.reserveTime &&
    !send_data.reserveNum
  ) {
    console.log("b");
    document.querySelector(".date_error").innerHTML = "請輸入想要訂位日期";
    document.querySelector("#reserveDate").style.border = "2px solid #F6D0C0";
    document.querySelector(".time_error").innerHTML = "請輸入想要訂位時段";
    document.querySelector(".nice-select").style.border = "2px solid #F6D0C0";
    document.querySelector(".num_error").innerHTML = "請輸入想要訂位人數";
    document.querySelector("#reserveNum").style.border = "2px solid #F6D0C0";
    document.querySelector(".num_error").style.marginLeft = "40px";
    return;
  }

  if (!send_data.reserveDate) {
    console.log("b");
    document.querySelector(".date_error").innerHTML = "請輸入想要訂位日期";
    document.querySelector("#reserveDate").style.border = "2px solid #F6D0C0";
    return;
  }

  if (!send_data.reserveTime) {
    console.log("a");
    document.querySelector(".time_error").innerHTML = "請輸入想要訂位時段";
    document.querySelector(".nice-select").style.border = "2px solid #F6D0C0";
    return;
  }

  if (send_data.reserveNum > availableNum || !send_data.reserveNum) {
    console.log("c");
    if (send_data.reserveNum > availableNum) {
      document.querySelector(".num_error").innerHTML =
        "超出可訂位人數，請重新填寫";
      document.querySelector("#reserveNum").style.border = "2px solid #F6D0C0";
      return;
    } else {
      document.querySelector(".num_error").innerHTML = "請輸入想要訂位人數";
      document.querySelector("#reserveNum").style.border = "2px solid #F6D0C0";
      document.querySelector(".num_error").style.marginLeft = "40px";
      return;
    }
  }

  if ($("#remark").val() != "") {
    send_data.remark = $("#remark").val();
  } else {
    send_data.remark = "無";
  }

  send_data.memberNo = 2; // 暫時寫死
  send_data.tel = "0921399718"; // 暫時寫死
  send_data.restaurantNo = 2; // 暫時寫死
  // console.log(send_data);
  sessionStorage.setItem("reservation_inf", JSON.stringify(send_data));
  location.href = "./reservation_confirm.html";
});

// Session資料
var reserve_data = function () {
  if (sessionStorage.getItem("reservation_inf") != null) {
    const reservation_inf = JSON.parse(
      sessionStorage.getItem("reservation_inf")
    );
    console.log(reservation_inf);
    reservation_inf.reserveNum = $("#reserveNum").val();
    reservation_inf.reserveDate = $("#reserveDate").val();
    reservation_inf.reserveTime = $("#reserveTime").val();
    reservation_inf.remark = $("#remark").val();
    reservation_inf.tel = "0921399718"; // 暫時寫死
    reservation_inf.memberNo = 2; // 暫時寫死
    reservation_inf.restaurantNo = 2; // 暫時寫死
  }
};
reserve_data();
