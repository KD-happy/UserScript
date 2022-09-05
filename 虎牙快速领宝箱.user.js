// ==UserScript==
// @name         虎牙快速领宝箱
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  虎牙直播快速领取宝箱
// @author       KD-happy
// @match        https://www.huya.com/*
// @icon         https://www.huya.com/favicon.ico
// @run-at       document-start
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    let hookSetInterval=unsafeWindow.setInterval;//将系统提供的setInterval保存
    unsafeWindow.setInterval=function(a,b){//将系统的setInterval替换为我们自己的
        // console.log(a.indexOf("e.length"))
        // console.log(a)
        // console.log(b)
        if (b == 1000) {
            console.log("1秒抓到了")
            // debugger
            console.log(a)
            return hookSetInterval(a,b/20);//经过处理后再调用系统的setInterval
        }
        return hookSetInterval(a,b/1);//经过处理后再调用系统的setInterval
    }
})();