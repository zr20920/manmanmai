$(function () {
    $('.footer_tools a:last-child').tap(function () {
        scroll('0px', 500);
    });

    function scroll(scrollTo, time) {
        var scrollFrom = parseInt(document.body.scrollTop),
            i = 0,
            runEvery = 5; // run every 5m
        scrollTo = parseInt(scrollTo);
        time /= runEvery;
        var interval = setInterval(function () {
            i++;
            document.body.scrollTop = (scrollTo - scrollFrom) / time * i + scrollFrom;
            if (i >= time) {
                clearInterval(interval);
            }
        }, runEvery);
    }

    var categoryid = 0;
    var productid = 0;
    var pageid = 1;
    var pageSum = 0;
    //section1
    $.ajax({
        url: 'http://139.199.192.48:9090/api/getcategorytitle',
        data: {},
        success: function (backData) {
            // console.log(backData);
            $('.section1 ul').append(template('template_bigTitle', backData))
        }
    });

    $('.section1 ul').on('tap', '.section1 ul li h3', function () {
        $this = $(this);
        $.ajax({
            url: 'http://139.199.192.48:9090/api/getcategory',
            data: {
                titleid: $this.next().data('titleid')
            },
            success: function (backData) {
                // console.log(backData);
                $this.next().html(template('template_smallTitle', backData))
            }
        });
        $this.next().toggle()
            .parent().siblings().children('ul').hide();
        $this.children('span').toggleClass('fa-angle-right').toggleClass('fa-angle-down')
            .parent().parent().siblings().children('h3').children('span').removeClass('fa-angle-down').addClass('fa-angle-right');;
    });
    $('.section1 ul').on('tap', '.section1 ul li ul li a', function () {
        $('.section1').hide();
        $('.section2').show();
        categoryid = $(this).data('categoryid');
        console.log(categoryid);
        //section2
        $.ajax({
            url: 'http://139.199.192.48:9090/api/getcategorybyid',
            data: {
                categoryid: categoryid
            },
            success: function (backData) {
                $('.section2 .topBar a:last-of-type').html(backData.result[0].category + ">");
            }
        });
        $.ajax({
            url: 'http://139.199.192.48:9090/api/getproductlist',
            data: {
                categoryid: categoryid,
                pageid: pageid
            },
            success: function (backData) {
                // console.log(backData);
                pageSum = Math.ceil(backData.totalCount / backData.pagesize);
                // console.log(pageSum);
                if (backData.totalCount) {
                    $('.section2 .content ul').html(template('template_list', backData))
                } else {
                    $('.section2 .content ul').html('<li><div>暂无</div></li>');
                }
                for (var i = 0; i < pageSum; i++) {
                    var opt = document.createElement('option');
                    $('.section2 .pageBar select').append($(opt));
                    $(opt).html((i + 1) + '/' + pageSum).val(i + 1);
                }
                $('.section2 .pageBar button:first-of-type').attr('disabled', true);
            }
        });
        $('.section2 .pageBar button:first-of-type').tap(function () {
            $(this).siblings('button').removeAttr('disabled');
            if (pageid <= 1) {
                $(this).attr('disabled', true);
                return;
            }
            pageid--;
            $.ajax({
                url: 'http://139.199.192.48:9090/api/getproductlist',
                data: {
                    categoryid: categoryid,
                    pageid: pageid
                },
                success: function (backData) {
                    $('.section2 .content ul').html(template('template_list', backData))
                    $('.section2 .pageBar select').val(pageid)
                }
            });
        });
        $('.section2 .pageBar button:last-of-type').tap(function () {
            $(this).siblings('button').removeAttr('disabled');
            if (pageid >= pageSum) {
                $(this).attr('disabled', true);
                return;
            }
            pageid++;
            $.ajax({
                url: 'http://139.199.192.48:9090/api/getproductlist',
                data: {
                    categoryid: categoryid,
                    pageid: pageid
                },
                success: function (backData) {
                    $('.section2 .content ul').html(template('template_list', backData))
                    $('.section2 .pageBar select').val(pageid)
                }
            });
        });
        $('.section2 .pageBar select').change(function () {
            pageid = $(this).val();
            $('.section2 .pageBar button').removeAttr('disabled');
            if (pageid <= 1) {
                $('.section2 .pageBar button:first-of-type').attr('disabled', true);
            } else if (pageid >= pageSum) {
                $('.section2 .pageBar button:last-of-type').attr('disabled', true);
            }
            $.ajax({
                url: 'http://139.199.192.48:9090/api/getproductlist',
                data: {
                    categoryid: categoryid,
                    pageid: pageid
                },
                success: function (backData) {
                    $('.section2 .content ul').html(template('template_list', backData))
                    $('.section2 .pageBar select').val(pageid)
                }
            });
        });
        $('.section2 .content ul').on('tap', '.section2 .content ul li a', function () {
            $('.section2').hide();
            $('.section3').show();
            productid = $(this).data('productid');
            console.log(productid);
            //section3
            $.ajax({
                url: 'http://139.199.192.48:9090/api/getproduct',
                data: {
                    productid: productid
                },
                success: function (backData) {
                    // console.log(backData);
                    productName = backData.result[0].productName.split(' ')[0].slice(0, 15);
                    $('.section3 .content').html(template('template_detail', backData.result[0]));
                    $('.section3 .topBar a:nth-child(2)').html($('.section2 .topBar a:last-of-type').html());
                    $('.section3 .topBar a:last-of-type').html(productName + ">");
                }
            });
            $.ajax({
                url: 'http://139.199.192.48:9090/api/getproductcom',
                data: {
                    productid: productid
                },
                success: function (backData) {
                    // console.log(backData);
                    if (backData.result.length) {
                        $('.section3 .content .comp ul').html(template('template_comp', backData))
                    } else {
                        $('.section3 .content .comp ul').html('<li><div>暂无</div></li>');
                        $('.section3 .pageBar').hide();
                    }
                }
            });
            $('.section3 .topBar a:nth-child(2)').tap(function () {
                $('.section3').hide();
                $('.section2').show();
            });
        });
    });



    // //反序列化
    // function serializeTurn(data) {
    //     // var data = 'name=val&age=val&charId=val';
    //     var obj = {};
    //     data.split('&').forEach(function (param) {
    //         param = param.split('=');
    //         obj[param[0]] = param[1];
    //     });
    //     return obj;
    // }
});