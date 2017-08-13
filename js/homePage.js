$(function () {
    //菜单导航地址
    var address = ["search.html", "", "localPrice.html", "lowPrice.html", "haitao6_初始化.html", "", "", "", "", "", "", "brand.html"]
    // 首页菜单栏api
    $.ajax({
        url: 'http://139.199.192.48:9090/api/getindexmenu',
        data: null,
        success: function (data) {
            console.log(data);
            for (var i = 0; i < data.result.length; i++) {
                var currentObj = data.result[i];
                $('.item-List').append(template('template', currentObj));
                // if (!address[i])
                //     continue;
                // $("li>a").eq(i).attr("href", address[i])
            }
            // var lis = $('.item-List').children();
            // for(var i=0;i<lis.length;i++){
            //     lis.eq(i).children('a').prepend($(data.result[i].img)[0]);
            // }
        }
    })


    // 绑定事件 点击"更多"下拉
    var flag = true;
    $('.item-List').on('click', '#item7', function () {
        // console.log(1);
        if (flag) {
            $('.xy_navigationBar').css('height', '2.92rem');
            flag = false;
        } else {
            $('.xy_navigationBar').css('height', '1.92rem');
            flag = true;
        }
    })

    // 回到顶部
    $(".footer_tools a:eq(2)").click(function () {

        $("html, body").animate({ scrollTop: 0 }, "slow");
        // 阻止页面跳转
        return false;

    });

    // 首页的折扣列表中的数据api
    $.ajax({
        url: 'http://139.199.192.48:9090/api/getmoneyctrl',
        data: null,
        success: function (data) {
            console.log(data);
            for (var i = 0; i < data.result.length; i++) {
                $('.discoun_list').append(template('template02', data.result[i]))
            }
            // $('.discoun_list').html(template('template02',data));
        }
    })


})