// ==UserScript==
// @name         跳过腾讯视频广告、爱奇艺视频广告
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  去除腾讯视频、爱奇艺的视频广告
// @author       KD-happy
// @match        https://v.qq.com/*
// @match        https://www.iqiyi.com/*
// @icon         https://v.qq.com/favicon.ico
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    function fuck_tx() {
        console.log("%cFUCK TX", "color:green; font-size: 20px")
        var count = 0
        var clear_id = setInterval(function() {
            if (count++ > 200) {
                clearInterval(clear_id)
                console.log("结束了")
            } else {
                document.querySelectorAll(".txp_ad video").forEach(f => {
                    f.src = ""
                })
            }
        }, 50)
    }
    function fuck_qi() {
        console.log("%cFUCK QI", "color:green; font-size: 20px")
        var clear_id = setInterval(function() {
            document.querySelectorAll(".iqp-player-videolayer-inner video").forEach(f => {
                if (f && f.getAttribute("style") && f.getAttribute("style").includes("default")) {
                    clearInterval(clear_id)
                    console.log("没了")
                } else {
                    f.playbackRate = 10
                    // f.currentTime = f.duration-0.0005
                }
            })
        }, 50)
    }
    if (location.host.includes("iqiyi")) {
        fuck_qi()
    } else if (location.host.includes("qq.com")) {
        fuck_tx()
    }
})();