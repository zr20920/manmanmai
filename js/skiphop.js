$(function() {
  var myScroll;
  $.ajax({
    url: "http://139.199.192.48:9090/api/getgsshop",
    success: function(data) {
      $(".shop_Name").html(template("mmb_shopName", data));
      // 默认显示第一个对勾（添加active）
      $(".shop_Name span").removeClass("active").first().addClass("active");
      $(".shopName div").html(data.result[0].shopName);
    }
  });
  $.ajax({
    url: "http://139.199.192.48:9090/api/getgsshoparea",
    success: function(data) {
      $(".area_Name").html(template("mmb_areaName", data));
      $(".area_Name span").removeClass("active").first().addClass("active");
      $(".areaName div").html(data.result[0].areaName.trim().slice(0, 2));
    }
  });
  $.ajax({
    url: "http://139.199.192.48:9090/api/getgsproduct",
    data: {
      shopid: $(".shopName").attr("data-shopId"),
      areaid: $(".areaName").attr("data-areaId")
    },
    success: function(data) {
      $(".mmb_loading").hide();
      $(".mmb_goods").html(template("mmb_goods", data));
      setTimeout(function() {
        var imgH = $(".mmb_goods img").eq(10).height();

        if (imgH != 0) {
          for (var i = 0; i < $(".mmb_goods").find("img").length; i++) {
            $(".mmb_goods").find("img").eq(i).height(imgH);
          }
        }
        setTimeout(function() {
          myScroll = new IScroll(".mmb_goods");
        }, 100);
      }, 0);
    }
  });
  $(".price_Name").html(template("mmb_allPrice"), null);
  $(".price_Name span").removeClass("active").first().addClass("active");
  /* 商店名 */
  $(".shopName").click(changeName);
  /* 地区 */
  $(".areaName").click(changeName);
  /* 价格 */
  $(".allPrice").click(changeName);
  /* 商店名下拉栏 */
  $(".shop_Name").on("click", "li", changeDropDown);
  /* 地区下拉栏 */
  $(".area_Name").on("click", "li", changeDropDown);
  /* 价格下拉栏 */
  $(".price_Name").on("click", "li", changeDropDown);

  $(".search_r").click(function() {
    $(".searchDrop").slideToggle();
    $(this).find("span").toggleClass("icon-search").toggleClass("icon-remove");
    $(".searchBox").find("input").focus();
  });
  $(".searchSort").on("click", "a:not(.spe)", function() {
    $(".searchSort a").removeClass("active");
    $(this).addClass("active");
  });
  $(".searchItem").on("click", "a:not(.spe)", function() {
    $(".searchItem a").removeClass("active");
    $(this).addClass("active");
  });
  $(".searchDrop").on("click", "a", function() {
    $(".searchDrop").slideUp();
    $(".search_r span").removeClass("icon-remove").addClass("icon-search");
  });

  function changeName() {
    /* 有on类名代表模板显示 */
    if (!$(".mmb_dropDown").eq($(this).index()).hasClass("on")) {
      // 移除其它模板类名on并隐藏
      $(".mmb_dropDown").slideUp().removeClass("on");
      // 自己添加类名on
      $(".mmb_dropDown").eq($(this).index()).slideDown().addClass("on");
      // 自己对应三角向上（添加类名icon-sort-up）
      $(this)
        .find("span")
        .removeClass("icon-sort-down")
        .addClass("icon-sort-up");
      // 其它三角向下
      $(this)
        .siblings()
        .find("span")
        .removeClass("icon-sort-up")
        .addClass("icon-sort-down");
    } else {
      $(".mmb_dropDown").eq($(this).index()).slideUp().removeClass("on");
      $(this).siblings().find("span").removeClass("icon-sort-up");
      $(this)
        .find("span")
        .removeClass("icon-sort-up")
        .addClass("icon-sort-down");
    }
  }

  function changeDropDown() {
    // 排他
    $(this).parent().find("span").removeClass("active");
    $(this).find("span").addClass("active");
    $(this).parent().parent().slideUp().removeClass("on");
    $(".search_l li")
      .eq($(this).parent().parent().index())
      .siblings()
      .find("span")
      .removeClass("icon-sort-up");
    $(".search_l li")
      .eq($(this).parent().parent().index())
      .find("span")
      .removeClass("icon-sort-up")
      .addClass("icon-sort-down");
    // 替换商店名
    if ($(this).find("a").text().trim().length > 7) {
      $(".search_l li")
        .eq($(this).parent().parent().index())
        .find("div")
        .text($(this).find("a").text().trim().slice(0, 2));
    } else {
      $(".search_l li")
        .eq($(this).parent().parent().index())
        .find("div")
        .text($(this).find("a").text());
    }
    // 替换对应Id（存储在data-）
    if ($(this).attr("data-shopId")) {
      $(".search_l li")
        .eq($(this).parent().parent().index())
        .attr("data-shopId", $(this).attr("data-shopId"));
    }
    if ($(this).attr("data-areaId")) {
      $(".search_l li")
        .eq($(this).parent().parent().index())
        .attr("data-areaId", $(this).attr("data-areaId"));
    }
    $.ajax({
      url: "http://139.199.192.48:9090/api/getgsproduct",
      data: {
        shopid: $(".shopName").attr("data-shopId"),
        areaid: $(".areaName").attr("data-areaId")
      },
      success: function(data) {
        $(".mmb_loading").hide();
        $(".mmb_goods").html(template("mmb_goods", data));
        setTimeout(function() {
          var imgH = $(".mmb_goods img").eq(10).height();

          if (imgH != 0) {
            for (var i = 0; i < $(".mmb_goods").find("img").length; i++) {
              $(".mmb_goods").find("img").eq(i).height(imgH);
            }
          }
          setTimeout(function() {
            myScroll = new IScroll(".mmb_goods");
          }, 100);
        }, 0);
      }
    });
  }
});
