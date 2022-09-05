// ==UserScript==
// @name         去除标签标题乱变
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  一些网站失去焦点时，标签中的标题乱变，烦死人
// @author       KD-happy
// @match        *://*/*
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @require      https://cdn.jsdelivr.net/gh/KD-happy/CDN@master/myfile/noticejs.js
// @resource     noticejsStyle     https://cdn.jsdelivr.net/gh/KD-happy/CDN@master/myfile/noticejs.css
// @resource     animateStyle     https://cdn.jsdelivr.net/gh/KD-happy/CDN@0.0.4/myfile/animate.css
// @run-at       document-start
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
    /* var _addEventListener = addEventListener
    window.addEventListener = function(a, b) {
        if (a == "visibilitychange") {
            console.log(b.toString())
            console.log("抓到尼玛了")
        } else {
            return _addEventListener(a, b)
        }
    }
    var document_addEventListener = document.addEventListener
    document.addEventListener = function(a, b) {
        if (a == "visibilitychange") {
            console.log(b.toString())
            console.log("抓到尼玛了")
        } else {
            return document_addEventListener(a, b)
        }
    }*/
    const _addEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener) {
        if (type === 'visibilitychange') {
            console.log("抓到了", this == window, this == document)
            // debugger
            if (listener.toString().includes('document.title')) { //字符串可以视情况调整
                showMessage("尼玛乱变。。。", 0)
                console.log("尼玛乱变。。。")
                return;
            }
        }
        return _addEventListener.apply(this, arguments);
    }
})();