$(function () {
    var id = location.search;
    id = decodeURIComponent(id);
    var arr = id.split('=');
    id = parseInt(arr[1]);
    var title = decodeURIComponent(arr[2]);    
    title = title.slice(0, -4);
    brandListLoad(id, title);
    mScroll();
});

function brandListLoad(id, title) {
    $.ajax({
        url: 'http://139.199.192.48:9090/api/getbrand',
        data: {
            brandtitleid: id,
        },
        success: function (data) {
            console.log(data);
            data.title = title;
            $('.title>h5').html(title + '哪个好?');
            $('.nav li').eq(2).html(title + '哪个好?');
            $('.brand_list>ul').html(template('template', data));

            var div = "<div><p>我是有底线的</p></div>";

            $('.brand_list>ul').append(div);
        }
    });
}


function mScroll() {

    var l_menu = document.querySelector('.brand_list ul');
    var startY;
    var preDistance = 0;
    var springs = 50;
    l_menu.addEventListener("touchstart", function (e) {
        if (e.targetTouches.length > 1) {
            return;
        }
        startY = e.targetTouches[0].clientY;
        l_menu.style.transition = "none";
    });

    l_menu.addEventListener("touchmove", function (e) {
        if (e.targetTouches.length > 1) {
            return;
        }
        var moveY = e.targetTouches[0].clientY;
        var distance = moveY - startY + preDistance;
        if (distance > springs) {
            distance = springs;
            l_menu.style.transform = "translateY(" + distance + "px)";
        }
    });

    l_menu.addEventListener("touchend", function (e) {
        if (e.changedTouches.length > 1) {
            return;
        }
        var endY = e.changedTouches[0].clientY;
        preDistance = endY - startY;
        if (preDistance > 0) {
            preDistance = 0;
            l_menu.style.transition = "transform .3s";
            l_menu.style.transform = "translateY(" + preDistance + "px)";
        }
    });
}