// ==UserScript==
// @name         去除多次历史记录&倍速快捷键
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  去除哔哩哔哩讨厌的浏览器中历史记录多个的问题、可以使用>，<和/调整视频倍速、倍速记忆
// @author       KD-happy
// @match        https://www.bilibili.com/video/*
// @match        https://www.bilibili.com/bangumi/*
// @icon         http://bilibili.com/favicon.ico
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @run-at       start-document
// ==/UserScript==

GM_addStyle(`
.web-toast {
    position: fixed;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    line-height: 1;
    padding: 10px;
    border-radius: 3px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    white-space: nowrap;
    user-select: none;
}
@keyframes fadeIn {
    0%    {opacity: 0}
    100%  {opacity: 1}
}
@keyframes fadeOut {
    0%    {opacity: 1}
    100%  {opacity: 0}
}
.fadeOut{
    animation: fadeOut .5s;
}
.fadeIn{
    animation:fadeIn .5s;
}`)

function Toast(child = document.body, message = "已完成", time = 2000) {
    let fadeIn = document.querySelector(".fadeIn");
    fadeIn ? fadeIn.remove() : null;
    /*设置信息框停留的默认时间*/
    let el = document.createElement("div");
    el.setAttribute("class", "web-toast");
    el.innerHTML = message;
    child.appendChild(el);
    el.classList.add("fadeIn");
    setTimeout(() => {
        el.classList.remove("fadeIn");
        el.classList.add("fadeOut");
        /*监听动画结束，移除提示信息元素*/
        el.addEventListener("animationend", () => {
            child.removeChild(el);
        });
        el.addEventListener("webkitAnimationEnd", () => {
            child.removeChild(el);
        });
    }, time);
}

function ToastShow(message) {
    var video_area = document.querySelector("#bilibili-player .bpx-player-video-area")
    if (video_area) {
        Toast(video_area, message)
    } else {
        Toast(document.body, "未知错误")
    }
}

function ChangePlaybackRate(add) {
    var video = document.querySelector('bwp-video') != null ? document.querySelector('bwp-video') : document.querySelector('video');
    // var video = document.querySelector("#bilibili-player .bpx-player-video-area video")
    if (video) {
        if (add) {
            video.playbackRate += 0.25
        } else if(!add && video.playbackRate>0.25) {
            video.playbackRate -= 0.25
        } else {
            ToastShow("不要再减啦~~~")
            return
        }
        ToastShow(video.playbackRate + " x")
        GM_setValue("playbackRate", video.playbackRate)
    }
}

function zero() {
    var video = document.querySelector('bwp-video') != null ? document.querySelector('bwp-video') : document.querySelector('video');
    // var video = document.querySelector("#bilibili-player .bpx-player-video-area video")
    if (video) {
        video.playbackRate = 1
        ToastShow(video.playbackRate + " x")
        GM_setValue("playbackRate", video.playbackRate)
    }
}

function ValueChange() {
    var playbackRate = GM_getValue("playbackRate")
    !playbackRate && GM_setValue("playbackRate", 1)
    playbackRate = GM_getValue("playbackRate")
    if (playbackRate != 1) {
        var clear = setInterval(() => {
            var video = document.querySelector("#bilibili-player .bpx-player-video-area video")
            if (video) {
                clearInterval(clear)
                if (playbackRate<1) {
                    playbackRate = 1
                    GM_setValue("playbackRate", 1)
                }
                video.playbackRate = playbackRate
                ToastShow(playbackRate + " x")
            }
        }, 100)
    }
}

function MouseWheel() {
    var clear = setInterval(function() {
        var playbackrate = document.querySelector(".bpx-player-ctrl-playbackrate") != null ? document.querySelector(".bpx-player-ctrl-playbackrate") : document.querySelector(".squirtle-video-speed")
        if (playbackrate) {
            clearInterval(clear)
            var pd = true
            playbackrate.onmousewheel = function(e) {
                // e.stopPropagation()
                e.preventDefault()
                if (pd) {
                    pd = false
                    setTimeout(function() {
                        pd = true
                    }, 200)
                    if (e.deltaY<0) {
                        ChangePlaybackRate(true)
                    } else {
                        ChangePlaybackRate(false)
                    }
                }
            }
            playbackrate.addEventListener("mouseleave", function() {
                var video = document.querySelector("#bilibili-player .bpx-player-video-area video")
                GM_setValue("playbackRate", video.playbackRate)
            })
        }
    }, 500)

}

function AutoNext() {
    // 没有合集的默认关闭下一个播放
    var next = document.querySelector(".next-button .switch-button")
    var next_on = document.querySelector(".next-button .switch-button.on")
    var multi_page = document.querySelector("#multi_page")
    if (next && next_on && !multi_page) {
        next.click()
        console.log("关闭了连播")
        Toast(document.body, "关闭了连播")
    } else if (next && !next_on && multi_page) {
        next.click()
        console.log("打开了连播")
        Toast(document.body, "打开了连播")
    }
}

(function() {
    var _replaceState = history.replaceState

    history.replaceState = function() {
        ValueChange()
        console.log(arguments)
        if (arguments.length >= 3) {
            if (arguments[2].includes("vd_source")) {
                console.log("去你妈的。。。")
                return
            }
        }
        _replaceState.apply(this, arguments)
    }

    window.onload = function() {
        ValueChange()
        MouseWheel()
        setTimeout(AutoNext, 1500)
    }
    window.onkeydown = function(e) {
        if (e.ctrlKey) {
            switch(e.key) {
                case ">":
                    ChangePlaybackRate(true)
                    break
                case "<":
                    ChangePlaybackRate(false)
                    break
                case "/":
                    zero()
                    break
            }
        }
    }
})();