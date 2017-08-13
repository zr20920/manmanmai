$(function () {

    var url = location.search;
    console.log(url);
    
    var arr = url.split('=');
    // 获取id
    id = parseInt(arr[1]);
    var title = decodeURIComponent(arr[2]);
    title = title.slice(0,title.indexOf('&'));
    var min = url.indexOf('img=');
    var max = url.lastIndexOf('&');
    var names = url.slice(max+10);
    names = decodeURIComponent(names);
    var img = url.slice(min+4,max);
    img = decodeURIComponent(img);
    brandCommentLoad(id, title,img,names,url)
});

function brandCommentLoad(id,title,img,names,url) {

    $.ajax({
        url: 'http://139.199.192.48:9090/api/getproductcom',
        data: {
            productid:id
        },
        success: function (data) {
            console.log(data);
            data.names = names;
            $('.title h5').html(title+'最有用的用户评论')
            $('.brand_comment ul').html(template('template',data));
            for (var i = 0; i < data.result.length; i++) {
                $('.pic').eq(i).html($(img)[0]);
            }
            $('.nav li:eq(2) a').html(title+'销量排行').on('click',function(){
                history.back();
            });

        }
    });
}