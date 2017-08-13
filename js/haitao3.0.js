var pageId = 1;
var totalpage;
$(function () {
    /* ---e------------上翻页---上一页--------------- */
    $('.ht_btn_up').tap(function () {
        console.log('点到了');
        pageId--;
        if (pageId <= 0) {
            pageId = 0;
            alert('哥们到头啦!')
            return;
        }
        console.log(pageId)
        var sele = document.getElementById('page');
        var ops = sele.children;
        ops[pageId - 1].selected = true;
        getdata()
    })
    /* --------------- 下翻页---下一页--------------- */
    // next()
    $('.ht__btn_down').tap(function () {
        console.log('点到了')
        if (pageId >= totalpage) {
            pageId = totalpage;
            alert('哥们最后一页啦!')
            $('#ll').css('transform', 'translate(0, -2.2rem)')
            return;
        }
        pageId++;
        var sele = document.getElementById('page');
        var ops = sele.children;
        ops[pageId - 1].selected = true;
        console.log(pageId)
        getdata()
    })
    /* 选中页码获取相应数据 */
    $('#page').change(function () {
        pageId = $(this).val()
        getdata();
    })
    /* 1声明变量page=1; page++ 点击上下保存数据 传入data */
    getdata();
    /*------------------- 获取数据--刷新页面----------------------------- */
    function getdata() {
        $.ajax({
            url: 'http://139.199.192.48:9090/api/getmoneyctrl',
            data: {
                pageid: pageId
            },
            success: function (res) {
                console.log(res)
                var temp = template("template", res);
                $('#wrapper').html(temp);
                /* ------------修改页码显示----------- */
                totalpage = Math.ceil(res.totalCount / res.pagesize)
                /* 页数显示 */
                if (!$('#page').children().length) {
                    for (var i = 0; i < totalpage; i++) {
                        var opt = document.createElement('option');
                        console.log(opt)
                        $('#page').append($(opt));
                        $(opt).html((i + 1) + '/' + totalpage).val(i + 1);
                    }
                }
                /* 判断是否最后一页,返回页数,但是页面没作用 */
                if (pageId >= 15) {
                    console.log('111111111111')
                    $('#ll').css('transform', 'translate(0, -2.2rem)')
                    $('#ll').css('height', '-2.2rem')
                    return;
                }
            }

        })
    }
    $('#back').tap(function () {
        $('#ll').css('transform', 'translate(0, 0)')
        $('#ll').css(' transition-duration', ' 1000ms')
    });
})
setTimeout(function () {
    var myscroll = new IScroll(".ht_product");
    myscroll.refresh();
}, 100)
