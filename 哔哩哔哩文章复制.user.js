// ==UserScript==
// @name         哔哩哔哩文章复制
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  去除哔哩哔哩文章的来源复制
// @author       KD-happy
// @match        https://www.bilibili.com/read/*
// @icon         http://bilibili.com/favicon.ico
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    const _addEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener) {
        if (type === 'copy') {
            console.log("抓到了", this == window, this == document)
            // debugger
            if (listener.toString().includes('作者')) { //字符串可以视情况调整
                return _addEventListener(type, function(t) {
                    var n = window.getSelection().toString() , a = n;
                    t.clipboardData.setData("text/plain", a),
                    t.preventDefault(),
                    t.stopPropagation()
                })
            }
        }
        return _addEventListener.apply(this, arguments);
    }
})();