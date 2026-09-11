if (!window.location.origin) {
    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
}
$.getUrlParam = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r !== null)
        return unescape(r[2]);
    return null;
}
;
$(function() {
    var $kw = $('#kw')
      , $searchSubmit = $('#search')
      , $urlOutput = $('#url-output')
      , $tips = $('#tips')
      , $stop = $('#stop')
      , $arrow = $('#arrow');
    var stepTimeout, typeInterval;
    var query = $.getUrlParam('q');
    if (!!query) {
        try {
            query = Base64.decode(query);
        } catch (e) {
            console.log(e);
        }
    }
    if (!!query) {
        $tips.html('让我来教你正确的打开方式');
        $stop.fadeIn();
        stepTimeout = setTimeout(function() {
            $tips.html('1、找到输入框并选中');
            $arrow.removeClass('active').show().animate({
                left: $kw.offset().left + 20 + 'px',
                top: ($kw.offset().top + $kw.outerHeight() / 2) + 'px'
            }, 2000, function() {
                $tips.html('2、输入你要找的内容');
                $arrow.addClass('active');
                stepTimeout = setTimeout(function() {
                    $arrow.fadeOut();
                    var i = 0;
                    typeInterval = setInterval(function() {
                        $kw.val(query.substr(0, i));
                        if (++i > query.length) {
                            clearInterval(typeInterval);
                            $tips.html('3、点击下“Google 搜索”按钮');
                            $arrow.removeClass('active').fadeIn().animate({
                                left: $searchSubmit.offset().left + $searchSubmit.width() / 2 + 'px',
                                top: $searchSubmit.offset().top + $searchSubmit.height() / 2 + 'px'
                            }, 1000, function() {
                                $tips.html('<strong>怎么样，学会了吗？</strong>');
                                $arrow.addClass('active');
                                stepTimeout = setTimeout(function() {
                                    if ($(".search-text").attr("data-site") == "google") {
                                        window.location = 'https://www.google.com/search?q=' + encodeURIComponent(query);
                                    } else {
                                        $tips.html('<strong>连谷歌都上不了？教你用百度</strong>');
                                        setTimeout(function() {
                                            window.location = 'https://lmstfy.net/baidu/?q=' + Base64.encode(query);
                                        }, 1500);
                                    }
                                }, 1000);
                            });
                        }
                    }, 200);
                }, 500);
            });
        }, 1000);
    }
    $stop.click(function() {
        clearTimeout(stepTimeout);
        clearInterval(typeInterval);
        $stop.hide();
        $arrow.stop().hide();
        $kw.val(query);
        query = false;
        $tips.html('输入一个问题，然后按 Google 搜索');
    });
    $('#search').on('click', function() {
        if (!!query)
            return false;
        var question = $.trim($kw.val());
        if (!question) {
            $tips.html('<span style="color: red">搜了个寂寞？</span>');
            setTimeout(function() {
                $tips.html('输入一个问题，然后按 Google 搜索');
            }, 2000);
            $kw.val('');
        } else {
            $tips.html('↓↓↓ 复制下面的链接，教伸手党使用谷歌');
            $('#output').fadeIn();
            $urlOutput.val(window.location.origin + window.location.pathname + '?q=' + Base64.encode(question)).focus().select();
        }
        return false;
    });
    var clipboard = new ClipboardJS('[data-clipboard-target]');
    clipboard.on('success', function(e) {
        $tips.html('<span style="color: #4caf50">复制成功! 赶紧把链接甩给伸手党们!</span>');
    });
    clipboard.on('error', function(e) {
        $tips.html('<span style="color: red">复制失败，请手动复制</span>');
    });
    $('#preview').click(function() {
        var link = $urlOutput.val();
        if (!!link) {
            window.open(link);
        }
    });
    $('#search2').on('click', function() {
        var question = $.trim($kw.val());
        if ($(".search-text").attr("data-site") == "google") {
            if (!question) {
                window.location = 'https://www.google.com/doodles/'
            } else {
                window.location = 'https://www.google.com/search?q=' + question;
            }
        } else {
            $tips.html('<strong>连谷歌都上不了？用百度去</strong>');
            setTimeout(function() {
                window.location = 'https://lmstfy.net/baidu/'
            }, 1500);
        }
    });
});
function showAbout() {
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var popupHeight = $("#msgbox").height();
    var popupWidth = $("#msgbox").width();
    $("#mask").width(windowWidth).height(windowHeight).click(function() {
        hideAbout();
    }).fadeIn(200);
    $("#msgbox").css({
        "position": "absolute",
        "left": windowWidth / 2 - popupWidth / 2,
        "top": windowHeight / 2 - popupHeight / 2
    }).fadeIn(200);
}
function hideAbout() {
    $("#mask").fadeOut(200);
    $("#msgbox").fadeOut(200);
}
function gtest() {
    var img = new Image();
    var timeout = setTimeout(function() {
        img.onerror = img.onload = null;
        $(".search-text").attr("data-site", "google2");
    }, 3000);
    img.onerror = function() {
        clearTimeout(timeout);
        $(".search-text").attr("data-site", "google2");
    }
    ;
    img.onload = function() {
        clearTimeout(timeout);
        $(".search-text").attr("data-site", "google");
    }
    ;
    img.src = "https://www.google.com/favicon.ico?" + +new Date();
}
window.onload = function() {
    gtest();
    window.setInterval("gtest()", 10000);
}
