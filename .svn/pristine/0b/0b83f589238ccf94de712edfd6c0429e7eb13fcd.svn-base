$(function () {

    //设置标题数组
    var titleArr = ['白菜价-淘宝内部券', '1小时热销-白菜价', '9块9包邮-白菜价', '19快邮-白菜价', '数码家电-白菜价', '居家-白菜价', '美食-白菜价', '男装-白菜价', '女装-白菜价', '鞋包服饰-白菜价', '文体-白菜价', '母婴-白菜价', '美妆-白菜价']
    var product_scroll;
    //加载tab栏数据
    $.ajax({
        type: 'get',
        url: 'http://139.199.192.48:9090/api/getbaicaijiatitle',
        success: function (data) {
            console.log(data);
            $('.nav_container').append(template('nav_template', data));
            //加载成功之后,给当前"全部"添加样式
            $('.nav_container li').eq(0).addClass('active')
            //实现水平滚动的功能
            var nav_scroll = new IScroll("#wrapper", {
                scrollX: true,
                scrollY: false,
            });
            //成功加载完毕后 执行for循环
            for (var i = 0; i < $('.nav_container>li').length; i++) {
                $('.nav_container li').eq(i).click(function () {
                    //重新更换标题栏 设置
                    var titleIndex = $(this).attr("data-titleid");
                    $('.top_title').html(titleArr[titleIndex]);
                    //给当前点击的tab标签设置样式
                    $(this).addClass('active').siblings().removeClass("active");
                    $.ajax({
                        type: 'get',
                        url: 'http://139.199.192.48:9090/api/getbaicaijiaproduct',
                        data: {
                            "titleid": titleIndex,
                        },
                        success: function (data) {
                            //重新加载数据
                            $('.product_container').html('');
                            $('.product_container').append(template('product_template', data));

                            //实现垂直滑动效果
                            product_scroll = new IScroll("#P_wrapper");
                            //给每张图片都绑定onerror事件
                            for (var i = 0; i < $('.product_container li').length; i++) {
                                $('.product_container img').eq(i).on('error', function () {
                                    this.src = "http://img3.imgtn.bdimg.com/it/u=294463859,3588585994&fm=26&gp=0.jpg";
                                    this.onerror = null;
                                    // console.log(1);
                                })
                            }
                        }
                    })
                })
            }
        }
    })

    //加载商品列表数据
    $.ajax({
        type: 'get',
        url: 'http://139.199.192.48:9090/api/getbaicaijiaproduct',
        data: {
            'titleid': 0,
        },
        success: function (data) {
            console.log(data);
            $('.product_container').append(template('product_template', data));
            //实现垂直滑动效果
            product_scroll = new IScroll("#P_wrapper");
            //给每张图片都绑定onerror事件
            for (var i = 0; i < $('.product_container li').length; i++) {
                $('.product_container img').eq(i).on('error', function () {
                    var img = event.srcElement;
                    img.src = "http://img3.imgtn.bdimg.com/it/u=294463859,3588585994&fm=26&gp=0.jpg";
                    img.onerror = null;
                })
            }


        }
    })

    //点击返回顶部效果
    $('.lowPrice_bottom .Top').click(function () {
        product_scroll.scrollToElement(document.querySelector('.product_container li:nth-child(1)'));
    })

})
