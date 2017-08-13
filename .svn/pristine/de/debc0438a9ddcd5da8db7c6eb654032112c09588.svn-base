//自己的js
$(function () {
    var id = location.search;
    id = parseInt(id.slice(-1));
    var address = [];
    // console.log(id);  
    $.ajax({
        url: 'http://139.199.192.48:9090/api/getcouponproduct',
        data: {
            couponid: id
        },
        success: function (data) {
            console.log(data);
            $(".cou_list_content>ul").html(template('template', data));
            for (var i = 0; i < data.result.length; i++) {
                // console.log(data.result[i].couponProductImg)
                address.push(data.result[i].couponProductImg)
            }
        }
    });
    //console.log(address)
    /*绑定点击事件*/
    var index = 0;
    $(".cou_list_content>ul").on('click', "li", function () {
        $(".cover").css("display", "block")

        $(".cover").html(address[$(this).index()] + '<span class="prev icon-angle-left "></span>' +
            '<span class="next  icon-angle-right"></span>' + '<span class="close  icon-remove "></span>');
        index = $(this).index();
        stop();
    })
    $(".cover").on('click', '.next', function () {
        index++;
        if (index == address.length) {
            index = address.length;
        }
        $(".cover").html(address[index] +
            '<span class="prev icon-angle-left "></span>' +
            '<span class="next  icon-angle-right"></span>' + '<span class="close  icon-remove"></span>');
    });
    $(".cover").on('click', '.prev', function () {
        index--;
        if (index == -1) {
            index = 0;
        }
        $(".cover").html(address[index] +
            '<span class="prev icon-angle-left "></span>' +
            '<span class="next  icon-angle-right"></span>' + '<span class="close  icon-remove"></span>');
    })
    $(".cover").on('click', '.close', function () {
        $(".cover").css("display", "none")
        move();
    })
});

function stop() {
    document.body.style.overflow = 'hidden';
    document.addEventListener("touchmove", false); //禁止页面滑动
}
function move() {
    document.body.style.overflow = ''; //出现滚动条
    document.removeEventListener("touchmove", false);
}