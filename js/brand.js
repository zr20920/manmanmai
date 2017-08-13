$(function () {
    // 列表加载
    brandLoad();    
});

function brandLoad() {

    $.ajax({
        url: 'http://139.199.192.48:9090/api/getbrandtitle',
        data: null,
        success: function (data) {
            console.log(data);
            $('.brands>ul').html(template('template', data));
            var lis = $('.brands>ul').children();
            for (var i = 0; i < lis.length; i++) {
                lis.eq(i).css('top', i * 0.4 + "rem").show(1000);
            }
            var num = $('.brands li').length;
            ($('.brands>ul').css('height',num * 0.4 + "rem"));

        }
    });

}