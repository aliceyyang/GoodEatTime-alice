// console.log($("div.product__rating .fill-ratings"));

// 修改商品星等
// $("div.product__rating .fill-ratings").attr("style", "width: 30%");

/**
 * 抓全部產品、計算星等後放入
 * 資料格式如下
 * -> 已完成
 *
 * 12筆一頁分頁
 * -> 已完成
 * -> lazy loading???
 *
 * 跳轉至商品明細頁面，呈現商品明細
 * -> 已完成
 *
 * 依商品類別篩選
 *
 * 修改資料庫中購物車的內容
 * ->已完成
 *
 * 分頁
 * ->完成一半，重整會回到第一頁
 *
 * 價格排序
 *
 * 優惠券優先排序???
 *
 * 關鍵字搜尋???
 *
 * 漢堡&清單列表拿掉
 *
 */
/* 資料格式
[
    {
       "prodNo":"商品編號",
       "prodName":"商品名稱",
       "restaurantName":"餐廳名稱",
       "prodCategory":"商品類別",
       "prodPrice":"商品價格",
       "averageRating":"平均評分"
    },
    {
       "prodNo":"商品編號",
       "prodName":"商品名稱",
       "restaurantName":"餐廳名稱",
       "prodCategory":"商品類別",
       "prodPrice":"商品價格",
       "averageRating":"平均評分"
    }
 ]
 */
// 抓取頁數資訊
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
let this_page = params.page ? parseInt(params.page) : 1;
let this_restaurant = params.restaurantNo;
let this_prodcategory = params.prodCategoryNo;
let this_keyword = params.keyword;
// console.log(this_page);
var queryString = {};
if (this_keyword) {
  queryString.keyword = this_keyword;
} else if (this_restaurant) {
  queryString.restaurantNo = this_restaurant;
} else if (this_prodcategory) {
  queryString.prodCategoryNo = this_prodcategory;
}
queryString.page = this_page;
let this_order = params.order;
if(!this_order){
  this_order = "";
}
queryString.order = this_order;

// 查詢自串串接
function this_url(QueryString) {
  let url = "./shopping_mall.html?";
  for (const [key, value] of Object.entries(QueryString)) {
    url = url + `${key}=${value}&`;
  }
  url = url.slice(0, -1);
  return url;
}
console.log(this_url(queryString));
// this_restaurant ? (queryString.restaurantNo = this_restaurant) : false;
// this_restaurant ? (this_prodcategory = null) : false;
// this_prodcategory ? (queryString.prodCategoryNo = this_prodcategory) : false;
// console.log(this_restaurant);
// console.log(this_prodcategory);
// console.log(queryString);
// console.log(window.URL);

//更換頁面的功能
function changePage(page, data) {
  // 先刪除原本頁面上的元素
  $("section.shop > div.container > div.row").children().remove();
  $("div.shop__pagination").children().remove();
  // 根據頁面編號放入相對應的產品
  if ((page - 1) * 12 > data.length) {
    page = (data.length - (data.length % 12)) / 12 + 1;
    this_page = (data.length - (data.length % 12)) / 12 + 1;
  }
  for (var i = (page - 1) * 12; i < page * 12; i++) {
    let averageRating =
      data[i].prodCommentQty == 0
        ? 0
        : (data[i].totalCommentRating / data[i].prodCommentQty) * 20;
    // let addCart = data[i].prodNo in shoppingCart ? "已在購物車" : "加入購物車";
    let addCart = shoppingCart
      ? data[i].prodNo in shoppingCart
        ? "已在購物車"
        : "加入購物車"
      : "加入購物車";
    // let addCartClass = data[i].prodNo in shoppingCart ? "cart_add added" : "cart_add";
    let addCartClass = shoppingCart
      ? data[i].prodNo in shoppingCart
        ? "cart_add added"
        : "cart_add"
      : "cart_add";
    let product_html = `<div class="col-lg-3 col-md-6 col-sm-6">
         <div class="product__item">
           <div
             class="product__item__pic set-bg"
             style="background-image: url('../product/mainPic?prodNo=${data[i].prodNo}');" data-prodNo="${data[i].prodNo}"
           >
           <div class="product__rating">
             <div class="fill-ratings" style="width: ${averageRating}%">
               <span>★★★★★</span>
             </div>
             <div class="empty-ratings">
               <span>★★★★★</span>
             </div>
           </div>
             <div class="product__label">
               <span>${data[i].restaurantName}</span>
             </div>
           </div>
           <div class="product__item__text">
             <h6><a href="#" data-prodNo="${data[i].prodNo}">${data[i].prodName}</a></h6>
             <div class="product__item__price">NTD &nbsp; ${data[i].prodPrice}</div>
             <div class="${addCartClass}" data-prodNo="${data[i].prodNo}">
               <a href="#" data-prodNo="${data[i].prodNo}">${addCart}</a>
             </div>
           </div>
         </div>
       </div>`;
    $("section.shop > div.container > div.row").append(product_html);
    if (data.length == i + 1) {
      break;
    }
  }

  // 更新頁面按鈕
  if (page > 1) {
    // 第一頁
    let first_page = `<a href="#" data-page="1"><span class="arrow_carrot-left"></span></a>`;
    $("div.shop__pagination").append(first_page);
  }
  for (var i = 1; i < data.length / 12 + 1; i++) {
    // 每一頁
    let page_html = `<a href="#" data-page="${i}" ${
      page == i ? 'class="here"' : ""
    }>${i}</a>`;
    $("div.shop__pagination").append(page_html);
  }
  if (data.length - page * 12 > 0) {
    // 最後一頁
    let last_page = `<a href="#" data-page="${Math.ceil(
      data.length / 12
    )}"><span class="arrow_carrot-right"></span></a>`;
    $("div.shop__pagination").append(last_page);
  }
}

let prodQty = -1;
var prodList;
var prodList_price_down_up = new Array();
var prodList_price_up_down = new Array();
var prodCategoryList;
var shoppingCart;

console.log(queryString);
// 載入頁面時先去跟後端拿資料
$.ajax({
  url: `../product/all`,
  type: "GET",
  data: queryString,
  dataType: "json",
  success: function (data) {
    prodQty = data.prodList.length;
    prodList = data.prodList;
    prodCategoryList = data.prodCategoryList;
    shoppingCart = data.shoppingCart;
    // 排序
    if (this_order == "price_down_up") {
      prodList.forEach(element => {
        prodList_price_down_up.push(element);
      });
      prodList_price_down_up.sort((a, b) => a.prodPrice - b.prodPrice);
      changePage(this_page, prodList_price_down_up);
    } else if (this_order == "price_up_down") {
      prodList.forEach(element => {
        prodList_price_up_down.push(element);
      });
      prodList_price_up_down.sort((a, b) => b.prodPrice - a.prodPrice);
      changePage(this_page, prodList_price_up_down);
    } else {
      changePage(this_page, data.prodList);
    }
    // console.log(prodCategoryList);
    $("div.shop__option__search select").children().remove();
    $("div.shop__option__search select").append(
      '<option value="0">商品類別</option>'
    );
    $.each(prodCategoryList, (index, item) => {
      $("div.shop__option__search select").append(
        `<option value="${item.prodCategoryNo}">${item.prodCategory}</option>`
      );
    });
    $("select").niceSelect("update");
    // 如果有商品類別的話，顯示出來
    if (this_prodcategory) {
      $.each($("div.shop__option__search div.nice-select li"), (index, item) => {
        if ($(item).attr("data-value") == this_prodcategory) {
          $(item).addClass("selected");
          $("div.shop__option__search div.nice-select span").text($(item).text());
        } else {
          $(item).removeClass("selected");
        }
      });
    }
    // 如果有排序的話，顯示出來
    if (this_order) {
      $.each($("div.shop__option__right div.nice-select li"), (index, item) => {
        if ($(item).attr("data-value") == this_order) {
          $(item).addClass("selected");
          $("div.shop__option__right div.nice-select span").text($(item).text());
        } else {
          $(item).removeClass("selected");
        }
      });
    }
  },
  error: function (xhr) {
    console.log(xhr);
  },
  complete: function (data) {
    $("div.shop__last__text > p").text(`查詢結果共 ${prodQty} 筆`);
    // prodList.forEach(element => {
    //   prodList_price_down_up.push(element);
    // });
    // prodList_price_down_up.sort((a, b) => a.prodPrice - b.prodPrice);
    // console.log(prodList_price_down_up);
    // prodList.forEach(element => {
    //   prodList_price_up_down.push(element);
    // });
    // prodList_price_up_down.sort((a, b) => b.prodPrice - a.prodPrice);
    // console.log(prodList_price_up_down);
  },
});

function goToShopDeatil(prodNo) {
  window.location.href = `./shop_details.html?prodNo=${prodNo}`;
}

$(function () {
  // 更換頁面事件註冊
  $("div.shop__pagination").on("click", "a", function (e) {
    e.preventDefault();
    // console.log($(this).attr("data-page"));
    let click_page = $(this).attr("data-page");
    // console.log(click_page);
    // console.log(page);
    // console.log(click_page == page);
    if (this_page == click_page) {
      // 已在當前頁面的話不再跳轉
      return;
    }
    // let getByRestaurant = this_restaurant
    //   ? `restaurantNo=${this_restaurant}&`
    //   : "";
    // let getByProdCategory = this_prodcategory
    //   ? `prodCategoryNo=${this_prodcategory}&`
    //   : "";
    // window.location.href = `./shopping_mall.html?${getByRestaurant}${getByProdCategory}page=${click_page}`;
    queryString.page = click_page;
    window.location.href = this_url(queryString);
    // if (page != "last") {
    //   changePage(page, prodList);
    // } else {
    //   // (35/12)|0 = 2; 無條件捨去取整數
    //   changePage((prodQty / 12) | 0, prodList);
    // }
  });

  // 點圖片進入商品明細頁面
  $("#product_area").on("click", "div.product__item__pic", function (e) {
    e.preventDefault();
    // console.log($(this).attr("data-prodNo"));
    goToShopDeatil($(this).attr("data-prodNo"));
  });

  // 點商品名稱進入商品明細頁面
  $("#product_area").on(
    "click",
    "div.product__item__text > h6 > a",
    function (e) {
      e.preventDefault();
      goToShopDeatil($(this).attr("data-prodNo"));
      // console.log($(this).attr("data-prodNo"));
    }
  );

  // 加入購物車功能
  $("#product_area").on("click", "div.cart_add > a", function (e) {
    e.preventDefault();
    if ($(this).closest("div").hasClass("added")) {
      return;
    }
    var data = { prodNo: parseInt($(this).attr("data-prodNo")) };
    // console.log(data.prodNo);
    // console.log(data);
    // let form_data = new FormData();
    // form_data.append("prodNo", parseInt($(this).attr("data-prodNo")));
    fetch("../cart/insert", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
      redirect: "follow",
    })
      .then((r) => {
        if (r.redirected) {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "請先登入",
            showConfirmButton: false,
            timer: 1000,
          }).then(() => {
            sessionStorage.setItem("URL_before_login", window.location.href);
            window.location.href = r.url;
          });
        } else {
          return r.json();
        }
      })
      ?.then((data) => {
        // console.log(data);
        $(this).closest("div").addClass("added");
        $(this).text("已在購物車");
      });
  });

  // 商品類型搜尋功能
  $("div.shop__option__search").on("click", "li", function () {
    // console.log($(this).text());
    // console.log($(this).attr("data-value"));
    let goToProdCategoryNo = $(this).attr("data-value");
    if (goToProdCategoryNo == 0) {
      window.location.href = "./shopping_mall.html";
      return;
    }
    window.location.href = `./shopping_mall.html?prodCategoryNo=${goToProdCategoryNo}`;
  });

  // 關鍵字搜尋
  $("#keyword_search").on("click", function (e) {
    e.preventDefault();
    let keyword = $(this).prev().val();
    if (!keyword) {
      return;
    }
    window.location.href = `./shopping_mall.html?keyword=${keyword}`;
  });

  // 排序功能
  $("div.shop__option__right").on("click", "li.option", function(){
    console.log($(this).attr("data-value"));
    console.log($(this).attr("data-value") == this_order);
    let order = $(this).attr("data-value");
    if (order == this_order) {
      return;
    }
    queryString.order = order;
    window.location.href = this_url(queryString);
    // if (order == "") {
    //   window.location.href = `${window.location.href}order`;
    //   return;
    // }
    // if (order == "price_down_up") {
    //   changePage(1, prodList_price_down_up);
    //   this_order = "price_down_up";
    //   return;
    // }
    // if (order == "price_up_down") {
    //   changePage(1, prodList_price_up_down);
    //   this_order = "price_up_down";
    //   return;
    // }
  });
});
