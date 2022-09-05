// ==UserScript==
// @name         CSDN免登录复制&去除关注续读
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  通过设置用户名来达到免登录复制的功能、自动打开续读、自动打开隐藏代码
// @author       KD-happy
// @match        http*://*.csdn.net/*
// @icon         https://cdn.jsdelivr.net/gh/KD-happy/CDN@master/img/icon.png
// @require      https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js
// @require      https://cdn.bootcdn.net/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js
// @require      https://cdn.jsdelivr.net/gh/KD-happy/CDN@master/myfile/noticejs.js
// @resource     noticejsStyle     https://cdn.jsdelivr.net/gh/KD-happy/CDN@master/myfile/noticejs.css
// @resource     animateStyle     https://cdn.jsdelivr.net/gh/KD-happy/CDN@0.0.4/myfile/animate.css
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==

GM_addStyle(GM_getResourceText("noticejsStyle"))
GM_addStyle(GM_getResourceText("animateStyle"))

function showMessage(msg, type) {
    console.log(msg)
    // type: success[green] error[red] warning[orange] info[blue]
    let color = ['success', 'error', 'warning', 'info'];
    new NoticeJs({
        text: msg,
        type: color[type],
        position: 'bottomRight', //topLeft topCenter topRight middleLeft middleCenter middleRight bottomLeft bottomCenter bottomRight
        animation: { //网站：https://animate.style/ 其中的带In Out基本上都是可以用的 但是要一一对应
            open: 'animated bounceIn',
            close: 'animated bounceOut',
        }
    }).show();
}

(function() {
    'use strict';
    if (/https?:\/\/blog.csdn.net\/.*/.test(location.href)) {
        if ($.cookie("UserName") == null) {
            $.cookie('UserName', 'NMM', { domain: 'csdn.net', expires: 15 }); //! 设置一个cookie
            showMessage("设置了新用户", 0)
        } else {
            showMessage("当前登录用户：" + $.cookie("UserName"), 0)
        }
    }
    $(document).ready(() => {
        if (/https?:\/\/blog\.csdn\.net\/.*/.test(location.href)) {
            if ($(".hide-article-box") != null && $(".hide-article-box").length > 0) {
                $(".hide-article-box").remove();
                $("#article_content").removeAttr("style")
                showMessage("续读成功", 0)
            } else {
                showMessage("没有续读", 0)
            }
            if ($(".hide-preCode-bt").length > 0) {
                $(".hide-preCode-bt").parents("pre").removeClass("set-code-hide")
                $(".hide-preCode-bt").parents(".hide-preCode-box").hide().remove()
                showMessage("打开全部隐藏代码", 0)
            } else {
                showMessage("没有隐藏代码", 0)
            }
        } else if (/https?:\/\/link\.csdn\.net\/.*/.test(location.href)) {
            let search = Object.fromEntries(new URLSearchParams(location.search))
            if (search.target) {
                window.open(search.target, "_self")
            }
        }
    })
})();