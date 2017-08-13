$(function () {

    var url = location.search;
    url = decodeURIComponent(url) + '十大品牌';
    var arr = url.split('=');
    id = parseInt(arr[1]);
    var title = decodeURIComponent(arr[2]);
    title = title.slice(0, -4);
    brandSalesLoad(id, title, url);


});

function brandSalesLoad(id, title, url) {
    var page = 16;
    $.ajax({
        url: 'http://139.199.192.48:9090/api/getbrandproductlist',
        data: {
            brandtitleid: id,
            pagesize: page,
        },
        success: function (data) {
            console.log(data);
            data.title = title;
            $(".brand_sales>ul").html(template('template', data));


            $('.brand_sales h5').html(title + '销量排行')
            $('.nav li:eq(2)>a').html(title + '哪个好? >');
            $('.nav li:eq(2)>a').attr({
                'href': './brand_list.html' + url,
                'target': '_self'
            });
            $('.nav li:eq(3)').html(title + '销量排行');
            for (var i = 0; i < data.result.length; i++) {
                $('.pic').eq(i).html($(data.result[i].productImg)[0]);
            }

            // console.log($('body').width());
            var width = $('body').width() / 2;
            var length = $('.brand_sales li').length;
            for (var i = 0; i < length; i++) {

                if (i < 4) {
                    $('.brand_sales li').eq(i).css('transform', 'rotateY(0deg) translateZ(' + width + 'px)');
                } else if (i < 8 && i >= 4) {
                    $('.brand_sales li').eq(i).css('transform', 'rotateY(-90deg) translateZ(' + width + 'px)');
                } else if (i < 12 && i >= 8) {
                    $('.brand_sales li').eq(i).css('transform', 'rotateY(-180deg) translateZ(' + width + 'px)');
                } else if (i < 16 && i >= 12) {
                    $('.brand_sales li').eq(i).css('transform', 'rotateY(-270deg) translateZ(' + width + 'px)');
                }

            }

            var num = 0;

            itcast($('.brand_sales ul').get(0)).swipe(function (callback) {
                console.log(callback);

                $('.brand_sales li').css('transition', 'all 1s');

                if (callback == 'right') {
                    num++;
                    for (var i = 0; i < length; i++) {
                        if (i < 4) {
                            $('.brand_sales li').eq(i).css('transform', 'rotateY(' + (num * 90) + 'deg) translateZ(' + width + 'px)');
                        } else if (i < 8 && i >= 4) {
                            $('.brand_sales li').eq(i).css('transform', 'rotateY(' + (num * 90 - 90) + 'deg) translateZ(' + width + 'px)');
                        } else if (i < 12 && i >= 8) {
                            $('.brand_sales li').eq(i).css('transform', 'rotateY(' + (num * 90 - 180) + 'deg) translateZ(' + width + 'px)');
                        } else if (i < 16 && i >= 12) {
                            $('.brand_sales li').eq(i).css('transform', 'rotateY(' + (num * 90 - 270) + 'deg) translateZ(' + width + 'px)');
                        }
                    }
                } else if (callback == 'left') {
                    num--;
                    for (var i = 0; i < length; i++) {
                        if (i < 4) {
                            $('.brand_sales li').eq(i).css('transform', 'rotateY(' + (num * 90) + 'deg) translateZ(' + width + 'px)');
                        } else if (i < 8 && i >= 4) {
                            $('.brand_sales li').eq(i).css('transform', 'rotateY(' + (num * 90 - 90) + 'deg) translateZ(' + width + 'px)');
                        } else if (i < 12 && i >= 8) {
                            $('.brand_sales li').eq(i).css('transform', 'rotateY(' + (num * 90 - 180) + 'deg) translateZ(' + width + 'px)');
                        } else if (i < 16 && i >= 12) {
                            $('.brand_sales li').eq(i).css('transform', 'rotateY(' + (num * 90 - 270) + 'deg) translateZ(' + width + 'px)');
                        }
                    }
                }
            });
        }
    });
}