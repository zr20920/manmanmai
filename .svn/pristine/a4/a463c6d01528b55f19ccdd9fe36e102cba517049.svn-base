
var pageid = 1;
var pageNum=0;
$(function () {
    $.ajax({
        url: 'http://139.199.192.48:9090/api/getmoneyctrl',
        data: {
            pageid: pageid,
        },
        success: function (data) {
         
            $('.list').html(template('template', data))

            for (var i = 0; i < data.result.length; i++) {
                $('.pic').eq(i).html($(data.result[i].productImgSm)[0]);
            }

            //总页数
            var pageNum = Math.ceil(data.totalCount / data.pagesize);
             
              for (var i = 0; i < pageNum; i++) {
                var opt = document.createElement('option');
                $('.page select').append($(opt));
                $(opt).html((i + 1) + '/' + pageNum).val(i + 1);
            }

        }
    })
 //下一页
    $('.next').tap(function () {
       
        pageid++;
        $.ajax({
            url: 'http://139.199.192.48:9090/api/getmoneyctrl',
            data: {
                pageid: pageid,
            },
            success: function (data) {
                $('.list').html(template('template', data))

                for (var i = 0; i < data.result.length; i++) {
                    $('.pic').eq(i).html($(data.result[i].productImgSm)[0]);
                     $('.page select').val(pageid)
                }
            }
        })


    })
//上一页
    $('.pre').tap(function () {
        if(pageid<=1){
             $('.pre').attr('disabled', true);
                return;
        }
        pageid--;
        $.ajax({
            url: 'http://139.199.192.48:9090/api/getmoneyctrl',
            data: {
                pageid: pageid,
            },
            success: function (data) {

                $('.list').html(template('template', data))

                for (var i = 0; i < data.result.length; i++) {
                    $('.pic').eq(i).html($(data.result[i].productImgSm)[0]);
                     $('.page select').val(pageid)
                }
            }
        })


    })

    //option

    $('.page select').change(function(){
          pageid = $(this).val();
           $.ajax({
            url: 'http://139.199.192.48:9090/api/getmoneyctrl',
            data: {
                pageid: pageid,
            },
            success: function (data) {

                $('.list').html(template('template', data))

                for (var i = 0; i < data.result.length; i++) {
                    $('.pic').eq(i).html($(data.result[i].productImgSm)[0]);
                     $('.page select').val(pageid)
                }
            }
        })
          
    })

})


$("a[href='#top']").click(function() { 
  
  $("html, body").animate({ scrollTop: 0 }, "slow"); 
  
  return false; 
  
}); 

