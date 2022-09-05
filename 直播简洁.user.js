// ==UserScript==
// @name         直播简洁
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  斗鱼、虎牙、哔哩哔哩直播的简化界面 快捷键实现B站下一个视频 添加三大直播的快捷键&默认最高清
// @author       KD-happy
// @match        https://www.huya.com/*
// @match        https://www.douyu.com/*
// @match        https://live.bilibili.com/*
// @icon         https://kdlong.gitee.io/img/favicon.png
// @require      https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @grant        GM_notification
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle(`
.web-toast {
    position: fixed;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    font-size: 14px;
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

function Toast(message = "已完成", time = 2000) {
    let fadeIn = document.querySelector(".fadeIn");
    fadeIn ? fadeIn.remove() : null;
    /*设置信息框停留的默认时间*/
    let el = document.createElement("div");
    el.setAttribute("class", "web-toast");
    el.innerHTML = message;
    document.body.appendChild(el);
    el.classList.add("fadeIn");
    setTimeout(() => {
        el.classList.remove("fadeIn");
        el.classList.add("fadeOut");
        /*监听动画结束，移除提示信息元素*/
        el.addEventListener("animationend", () => {
            document.body.removeChild(el);
        });
        el.addEventListener("webkitAnimationEnd", () => {
            document.body.removeChild(el);
        });
    }, time);
}

function Del(str) {
    var del = document.querySelector(str);
    if(del != null) {
        del.remove();
    }
}
function DoDel(select, time, No) { // 选择器选中的东西  运行的时间间隔  次数
    var end = setInterval(function() {
        DelInterval(select);
    }, time);
    var no = 0;
    function DelInterval(select) {
        var pd = document.querySelector(select);
        if(pd == null) {
            no ++;
        } else {
            pd.remove();
            clearInterval(end);
        }
        if(no == No) {
            clearInterval(end);
        }
        console.log('我是2');
    }
}

function HY() {
    //Del('#matchComponent2'); //头图
    //Del('#match-cms-content'); //下面
    //Del('.mod-sidebar'); //左边的东西，去掉丑
    /*              头图                下面                  游戏下载那一块                                                                                                        公爵什么弹幕弹窗    上座                                    主播的推荐广告                      左侧的选项栏   主播推荐广告, '#root'*/
    var delList = ["#matchComponent2", "#match-cms-content",".room-gameBuy", ".room-gamePromote", ".jump-to-phone", ".share-entrance", ".illegal-report" ,".room-business-game", "#J_box_msgOfKing", "#J_roomWeeklyRankList",'.room-footer', '#player-ext-wrap', '.special-bg', '.mod-sidebar', '#wrap-ext'];
    // 虎牙首页里面的东西
    var delMain = [".mod-game-type", ".mod-news-section", ".mod-index-recommend", ".mod-index-list", ".mod-actlist", ".huya-footer", "#banner"]
    delList.forEach(f => {
        Del(f)
    })
    delMain.forEach(f => {
        Del(f)
    })
    document.querySelector('.hy-hd-logo-0').src = "https://a.msstatic.com/huya/main3/static/img/logo2.png";
    var Jm = document.querySelector('#J_mainRoom');
    if(Jm != null) {
        Jm.style = "background-color: rgb(56, 56, 56); padding: 0px 140px;"; //background-color: rgb(56, 56, 56); padding: 0px 40px 0px; height:100%;
    }
    /* setInterval(function() {
        $(".msg-bubble").each(function(i) {
            if ($(this).css("background-image").includes("https")) {
                $(this).css("background-image", "")
                console.log("有")
            }
        })
    }, 500) */
    setTimeout(function() {
        var qxd = document.querySelector('.player-videotype-list > li');
        if(qxd.getAttribute('class') == 'on') {return;}
        if(qxd != null) {
            qxd.click();
        }
    }, 2000);
    DoDel('.helperbar-root--12hgWk_4zOxrdJ73vtf1YI', 50, 100);
}
function HYStyle() {
    var Style = `body{background-color:#383838}#J-room-fans-color,#J-room-shield-box,.chat-room__ft,.fansBadge-box,.hy-header-loading,.Links--3qeaudLDSzr9KrbYRy2S2P,.msg-nobleSpeak,.nav-expand-list,.Panel--TRN_ASs06cu2GFpywmzHr,.player-gift-wrap,.room-core,.room-hd,.room-sidebar,.roomBlockWords,.UserCard--srzRzKX1anekXO4abMMkG,.UserInfo--1yqM8VNAJvOcxyIRonbpBW,a.nav-expand-list-more.clickstat,i.svelte-1s3x1bb{background-color:#262626}.duya-header-wrap.clearfix,.room-core,body.mode-page-theater .room-core{background-color:#383838}.player-face-arrow.player-face-next,.player-face-arrow.player-face-pre{background-color:#464646}.player-face{left:-50px}#J_roomTitle,#live-count,.Assets--32BQNVuxRTSN66JtczX_R8,.exp---o2CtArlEvd_o6_OF8CA8,.host-name,.host-rid,.hy-header-match-list li .match-item,.hy-header-match-preview-name,.hy-header-match-sec-hd,.hy-header-video-panel .video-item,.hy-header-video-panel .video-title,.hy-nav-link.clickstat,.hy-nav-link.hy-nav-link-ext,.name--jvYTA8pB5vC7KtjbPX4Dm,.nav-expand-game dt,.roomBlockWords,.UserCard--srzRzKX1anekXO4abMMkG a,a.nav-expand-list-more.clickstat,dd>a.clickstat{color:#ccc}.fansBadge-detail-empty,.fansBadge-hig,.J_msg,.msg-nobleSpeak,li.checked{color:#ddd}.msg-onTVLottery{display:none}.room-profileNotice,.room-profileNotice div{border:none;background-color:#262626;color:#ccc}#pub_msg_input,#search-bar-input,.J_input{background-color:#ddd}#player-gift-tip{border:none}#player-gift-tip,#player-gift-tip .bottom{background-color:#282828}.hy-header-style-normal .duya-header-wrap{height:60px;border:none}#diy-pet-icon,#J_hyHdNavItemCloudGame,#J_hyHdNavItemGame,#J_roomSideHd,#week-star-btn,#wrap-ext,#wrap-income>*,.diy-activity-icon,.fans-icon,.more-activity-icon,.msg-bubble-decorationPrefix,.msg-bubble-decorationSuffix>img,.msg-bubble-icon,.msg-noble.noble-recharge.noble-recharge-level-1,.msg-nobleEnter,.msg-nobleSpeak-decorationPrefix>img,.msg-nobleSpeak-decorationSuffix>img,.msg-normal-decorationSuffix>img,.NavItem--1jr9x80QTPbnrDwqn834hF.NavDownload--14eln2LYTFMgF_MZOue4Gu,.NavItem--1jr9x80QTPbnrDwqn834hF.NavKaiBo--3_pcnDZbeaycODmpgNFBtt,.player-gift-right,.room-chat-tool.RoomMemePanel--1-Uraz9-spzxKdxRf7sxyB,p.msg-normal-decorationPrefix>img{display:none!important}.box-noble-level-1:after,.box-noble-level-2:after,.box-noble-level-3:after,.box-noble-level-4:after,.box-noble-level-5:after,.box-noble-level-6:after,.box-noble-level-7:after{background-image:none}.msg-noble.noble-recharge-level-1,.msg-noble.noble-recharge-level-2,.msg-noble.noble-recharge-level-3,.msg-noble.noble-recharge-level-4,.msg-noble.noble-recharge-level-5,.msg-noble.noble-recharge-level-6,.msg-noble.noble-recharge-level-7{background-color:none}.BrowseHistory--27MT17iO4tRmuOUrhc7Ojr .history-wrap--1owOFO3WK-QeirdFHhwKDX,.roomBlockWords-nav-item,.subscribe-bd--uAnKdg75m6ZqUcyE8tNc9,.subscribe-tit--27roiaLDJp7Mr5zcqn8qjy{background-color:#323232}.nav-expand-history-more--1TWrgxbomwUlFPl-6GrV_F.nav-expand-list-more,.nav-expand-list-more.subscribe-all--3QFx_y9htRjf0uPrmQOq_T{background-color:#1f1b1b}.history-nick--HhWrc6DM14dWgPMvOzzVq,.name--2kANJMwl4jiKmzxY8dKL4r{color:#746f6f}.BrowseHistory--27MT17iO4tRmuOUrhc7Ojr .history-bd--37LOkryl_GY9n1Yk3UQ1gR li:hover,.FavoritePresenter--MMD7zrcd7sYoYy4-nf4LW .subscribe-bd--uAnKdg75m6ZqUcyE8tNc9 .video-link--28eciHH-liUq8yNabxIn9f:hover,.hy-header-match-list li .match-item:hover,.hy-header-video-panel .video-item:hover{background:#111}.main-wrap{padding-left:0}[style="display: block; pointer-events: none;"]{display:none}p.msg-nobleSpeak-decorationPrefix,p.msg-normal-decorationPrefix{display:none!important}.main-wrap,.sidebar-min .main-wrap{padding-left:0}.danmu-item,span.msg{color:#ccc!important}p.msg-watchTogetherVip-decorationSuffix,span.name{color:#3c9cfe!important}.match-schedule-box,.search-suggest.header,div#main_col{background-color:#383838!important}.msg-bubble,.msg-watchTogetherVip{background-color:#262626!important;background-image:none!important}.chat-room__list .msg-watchTogetherVip:after,img.msg-bubble-icon{display:none}.main-room{min-width:1010px}.mod-list{padding:0 60px}h2.liveList-title a,h2.search-title,h2.title,i.key{color:#ccc!important}.search-suggest .search-item:hover{background-color:#111}`
    let style = document.createElement("style");
    style.appendChild(document.createTextNode(Style));
    document.body.appendChild(style);

    var clickstat = document.querySelector('.clickstat');
    clickstat.removeAttribute('href');
    clickstat.style = 'cursor: pointer;';
    clickstat.addEventListener('click', getHL);

    window.onload = function() {
        setTimeout(function() { // 种豆弄到下面
            var zd = document.querySelector('.guess-icon.more-attivity-icon-padding');
            var g = document.querySelector('.player-gift-left');
            zd != null && g != null ? g.append(zd) : void 0;
        }, 500);
    }
    // setTimeout(function() { // 种豆弄到下面
    //     var zd = document.querySelector('.guess-icon.more-attivity-icon-padding');
    //     var g = document.querySelector('.player-gift-left');
    //     zd != null && g != null ? g.append(zd) : void 0;
    // }, 5000);
}
function getHL() { //获取虎粮的全部
    var data_sign, data_time, HLNum;
    GM_xmlhttpRequest({
        url:"https://q.huya.com/index.php?m=PackageApi&do=getTimeSign",
        method :"GET",
        onload:function(xhr){
            var obj = JSON.parse(xhr.responseText);
            data_sign = obj.data.sign;
            data_time = obj.data.time;
            GM_xmlhttpRequest({
                url:`https://q.huya.com/index.php?m=PackageApi&time=${data_time}&sign=${data_sign}`,
                method :"GET",
                onload:function(xhr){
                    var obj = JSON.parse(xhr.responseText);
                    HLNum = obj.data.package[0].num;
                    GM_notification({text: `还有 ${HLNum} 个虎粮`, title: '直播简洁', timeout: 2000});
                }
            })
        }
    })
}
function HYkjj() {
    window.onkeydown = function(e) {
        var config = {
            'd': "#player-danmu-btn",
            'w': "#player-fullpage-btn",
            'f': "#player-fullscreen-btn",
            'm': "#player-sound-btn",
            's': ".player-refresh-btn"
        }
        for (let _key in config) {
            if (!e.ctrlKey && (_key == e.key || _key == e.key.toLowerCase())) {
                var _config = document.querySelector(config[_key])
                var danmu_pane = document.querySelector(".player-danmu-pane")
                if (_config) {
                    if (_config.classList.value.includes("player-sound-on")) {
                        Toast("开启静音")
                    } else if (_config.classList.value.includes("player-sound-off")) {
                        Toast("取消静音")
                    } else {
                        Toast(_config.getAttribute("title"))
                    }
                    _config.click()
                    if (danmu_pane && _key == 'd' && danmu_pane.style.display != 'none') {
                        danmu_pane.style.display = 'none'
                    }
                } else {
                    Toast("现不可用")
                }
            }
        }
    }
}
function HYUserLevel() {
    if (location.href == 'https://i.huya.com/index.php?m=UserLevel') {

    }
}

function DY() {
    /*              下面的鱼吧     左侧分类       伸长             录屏                 房间活动*/
    var delList = ['#js-bottom', '#js-aside', '#ex-cinema', '.wonderful-85a057', '#js-room-activity'];
    delList.forEach(f => {
        Del(f)
    })
    var del = document.querySelectorAll("#root > div"); //消除其他垃圾东西  上面的东西  往上移动
    var myStyle = "margin-right:auto;vertical-align:top;top:60px;left:0;width:100%;position:relative;height:828px";
    if(del.length != 0) {
        if (del.length != 1) {
            for (var i = 0; i < del.length; i++) {
                if(del[i].querySelector('.layout-Player-video') == null) {
                    del[i].remove();
                } else {
                    del[i].style = myStyle;
                }

            }
        } else {
            del[0].style = myStyle;
        }
    }
    setTimeout(function() {
        var qxd = document.querySelector('.tip-e3420a > ul > li');
        if (qxd) {
            if(qxd.getAttribute('class') == 'selected-3a8039') {return;}
            qxd.click();
        }
    }, 10000);
    DoDel('div.ToolbarActivityArea > div:nth-child(2)', 50, 100); // 删除下面礼物栏中间的没用的玩意
    DoDel('#ex-cinema', 50, 100); // 删除全屏下面的 伸长
    DoDel('.wonderful-85a057', 50, 100); // 删除全屏下面的 录屏
    DoDel('#js-main', 50, 100); // 首页推荐
    DoDel('#js-footer', 50, 100); // 首页推荐
    DoDel('.layout-Slide-bannerInner', 50, 100); // 首页推荐
    DoDel('#js-right-nav', 50, 100); // 右侧小蓝框
    setTimeout(function() { // 将鱼丸预言移到下面
        var yyyy = document.querySelector('.ToolbarActivityArea > div > div');
        var lwl = document.querySelector('.ActivityItem[data-flag="anchor_quiz"]');
        yyyy != null && lwl != null ? yyyy.append(lwl) : void 0;
        yyyy && yyyy.addEventListener('click', function() { // 当预言页面出现后, 再次点击后就可以关闭语言页面
            var Close = document.querySelector('.GuessMainPanelHeader-close')
            if(Close != null) {
                Close.click();
            }
        })
    }, 8000);
}
function DYStyle() {
    var Style = `body{background-color:#383838}#J-room-fans-color,#J-room-shield-box,.chat-room__ft,.fansBadge-box,.hy-header-loading,.Links--3qeaudLDSzr9KrbYRy2S2P,.msg-nobleSpeak,.nav-expand-list,.Panel--TRN_ASs06cu2GFpywmzHr,.player-gift-wrap,.room-core,.room-hd,.room-sidebar,.roomBlockWords,.UserCard--srzRzKX1anekXO4abMMkG,.UserInfo--1yqM8VNAJvOcxyIRonbpBW,a.nav-expand-list-more.clickstat,i.svelte-1s3x1bb{background-color:#262626}.duya-header-wrap.clearfix,.room-core,body.mode-page-theater .room-core{background-color:#383838}.player-face-arrow.player-face-next,.player-face-arrow.player-face-pre{background-color:#464646}.player-face{left:-50px}#J_roomTitle,#live-count,.Assets--32BQNVuxRTSN66JtczX_R8,.exp---o2CtArlEvd_o6_OF8CA8,.host-name,.host-rid,.hy-header-match-list li .match-item,.hy-header-match-preview-name,.hy-header-match-sec-hd,.hy-header-video-panel .video-item,.hy-header-video-panel .video-title,.hy-nav-link.clickstat,.hy-nav-link.hy-nav-link-ext,.name--jvYTA8pB5vC7KtjbPX4Dm,.nav-expand-game dt,.roomBlockWords,.UserCard--srzRzKX1anekXO4abMMkG a,a.nav-expand-list-more.clickstat,dd>a.clickstat{color:#ccc}.fansBadge-detail-empty,.fansBadge-hig,.J_msg,.msg-nobleSpeak,li.checked{color:#ddd}.msg-onTVLottery{display:none}.room-profileNotice,.room-profileNotice div{border:none;background-color:#262626;color:#ccc}#pub_msg_input,#search-bar-input,.J_input{background-color:#ddd}#player-gift-tip{border:none}#player-gift-tip,#player-gift-tip .bottom{background-color:#282828}.hy-header-style-normal .duya-header-wrap{height:60px;border:none}#diy-pet-icon,#J_hyHdNavItemCloudGame,#J_hyHdNavItemGame,#J_roomSideHd,#week-star-btn,#wrap-income>*,.diy-activity-icon,.fans-icon,.more-activity-icon,.msg-bubble-decorationPrefix,.msg-bubble-decorationSuffix>img,.msg-bubble-icon,.msg-noble.noble-recharge.noble-recharge-level-1,.msg-nobleEnter,.msg-nobleSpeak-decorationPrefix>img,.msg-nobleSpeak-decorationSuffix>img,.msg-normal-decorationSuffix>img,.NavItem--1jr9x80QTPbnrDwqn834hF.NavDownload--14eln2LYTFMgF_MZOue4Gu,.NavItem--1jr9x80QTPbnrDwqn834hF.NavKaiBo--3_pcnDZbeaycODmpgNFBtt,.player-gift-right,.room-chat-tool.RoomMemePanel--1-Uraz9-spzxKdxRf7sxyB,p.msg-normal-decorationPrefix>img{display:none!important}.box-noble-level-1:after,.box-noble-level-2:after,.box-noble-level-3:after,.box-noble-level-4:after,.box-noble-level-5:after,.box-noble-level-6:after,.box-noble-level-7:after{background-image:none}.msg-noble.noble-recharge-level-1,.msg-noble.noble-recharge-level-2,.msg-noble.noble-recharge-level-3,.msg-noble.noble-recharge-level-4,.msg-noble.noble-recharge-level-5,.msg-noble.noble-recharge-level-6,.msg-noble.noble-recharge-level-7{background-color:none}.BrowseHistory--27MT17iO4tRmuOUrhc7Ojr .history-wrap--1owOFO3WK-QeirdFHhwKDX,.roomBlockWords-nav-item,.subscribe-bd--uAnKdg75m6ZqUcyE8tNc9,.subscribe-tit--27roiaLDJp7Mr5zcqn8qjy{background-color:#323232}.nav-expand-history-more--1TWrgxbomwUlFPl-6GrV_F.nav-expand-list-more,.nav-expand-list-more.subscribe-all--3QFx_y9htRjf0uPrmQOq_T{background-color:#1f1b1b}.history-nick--HhWrc6DM14dWgPMvOzzVq,.name--2kANJMwl4jiKmzxY8dKL4r{color:#746f6f}.BrowseHistory--27MT17iO4tRmuOUrhc7Ojr .history-bd--37LOkryl_GY9n1Yk3UQ1gR li:hover,.FavoritePresenter--MMD7zrcd7sYoYy4-nf4LW .subscribe-bd--uAnKdg75m6ZqUcyE8tNc9 .video-link--28eciHH-liUq8yNabxIn9f:hover,.hy-header-match-list li .match-item:hover,.hy-header-video-panel .video-item:hover{background:#111}.main-wrap{padding-left:0}[style="display: block; pointer-events: none;"]{display:none}p.msg-nobleSpeak-decorationPrefix,p.msg-normal-decorationPrefix{display:none!important}.main-wrap,.sidebar-min .main-wrap{padding-left:0}.danmu-item,span.msg{color:#ccc!important}p.msg-watchTogetherVip-decorationSuffix,span.name{color:#3c9cfe!important}.match-schedule-box,.search-suggest.header,div#main_col{background-color:#383838!important}.msg-bubble,.msg-watchTogetherVip{background-color:#262626!important}.chat-room__list .msg-watchTogetherVip:after,img.msg-bubble-icon{display:none}.main-room{min-width:1010px}.mod-list{padding:0 60px}h2.liveList-title a,h2.search-title,h2.title,i.key{color:#ccc!important}.search-suggest .search-item:hover{background-color:#111}`;
    let style = document.createElement("style");
    style.appendChild(document.createTextNode(Style));
    document.body.appendChild(style);
}
function DYkjj() {
    var config = {
        m: {
            on: '.volume-8e2726',
            off: '.volume-silent-3eb726',
            on_message: '开启静音',
            off_message: '取消静音'
        },
        f: {
            on: '.fs-781153',
            off: '.fs-exit-b6e6a7',
            on_message: '打开全屏',
            off_message: '关闭全屏'
        },
        d: {
            on: '.hidedanmu-5d54e2',
            off: '.showdanmu-42b0ac',
            on_message: '开启弹幕',
            off_message: '关闭弹幕'
        },
        w: {
            on: '.wfs-2a8e83',
            off: '.wfs-exit-180268',
            on_message: '打开网页全屏',
            off_message: '关闭网页全屏'
        }
    }
    window.onkeydown = function(e) {
        for (let _key in config) {
            if (!e.ctrlKey && (e.key == _key || e.key.toLowerCase() == _key)) {
                let _config = config[_key]
                let _on = document.querySelector(_config.on)
                let _off = document.querySelector(_config.off)
                if (_on && _off) {
                    if (!_on.classList.value.includes("removed")) {
                        _on.click()
                        Toast(_config.on_message)
                    } else if (!_off.classList.value.includes("removed")) {
                        _off.click()
                        Toast(_config.off_message)
                    }
                } else {
                    Toast("现不可用")
                }
            } else if (!e.ctrlKey && (e.key == 's' || e.key.toLowerCase() == 'S')) {
                let reload = document.querySelector(".reload-76970c")
                if (reload) {
                    if (window.reload_==null || window.reload_) {
                        reload.click()
                        Toast("刷新成功")
                        window.reload_=false
                        setTimeout(function() {
                            window.reload_ = true
                        }, 10000)
                    } else {
                        Toast("现不可用 或 等待10秒")
                    }
                } else {
                    Toast("现不可用")
                }
            }
        }
        // if (window.event.altKey && e.key == 'a') {
        //     console.log("尼玛")
        // }
    }
}

function BL() {
    setTimeout(function() {
        // 设置最高画质
        if (document.querySelector("#web-player-controller-wrap-el")) {
            var event = new Event('mousemove');
            var live_player = document.querySelector('#live-player')
            live_player && live_player.dispatchEvent(event);

            var quality = document.querySelector(".quality-wrap")
            var event = new Event('mouseenter');
            quality && quality.dispatchEvent(event);

            setTimeout(function() {
                document.querySelector(".quality-it").click()
                var event = new Event('mouseleave');
                quality && quality.dispatchEvent(event);
            }, 200)
        }
    }, 5000)
    setTimeout(function() {
        // B站垃圾活动跳转至简洁链接
        let iframe = document.querySelector("#player-ctnr iframe")
        iframe && iframe.src.includes("live.bilibili.com") && (location.href = iframe.src)
    }, 3000)
    var delList = ["#sections-vm", "#link-footer-vm", ".right-action-ctnr.live-skin-normal-a-text.pointer.dp-i-block.btn"];
    for(var i=0; i<delList.length; i++) {
        Del(delList[i]);
    }
    document.querySelector('[role="img.webp"]') && document.querySelector('[role="img.webp"]').removeAttribute('style');
}
function Next() {
    document.onkeydown = function() {
        if(e.ctrlKey && window.event.keyCode == 39) {
            (function(){document.querySelector("div.bilibili-player-video-btn.bilibili-player-video-btn-next > button > span").click()})()
        }
    }
}
function BLkjj() {
    function mouse_move() {
        var event = new Event('mousemove');
        var live_player = document.querySelector('#live-player')
        live_player && live_player.dispatchEvent(event);
    }
    function blbl_toast(e, t) {
        document.querySelectorAll(".web-player-toast").forEach(function(e) {
            return e.remove()
        });
        var n = document.createElement("div");
        n.classList.add("web-player-toast"),
        n.textContent = e,
        n.style.cssText = "\n    font-size: 14px;\n    color: #fff;\n    background-color: rgba(0, 0, 0, 0.6);\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    z-index: 11;\n    padding: 6px 12px;\n    border-radius: 6px;\n    transition: opacity 1s;\n  ",
        t.appendChild(n),
        setTimeout(function() {
            n.style.opacity = "0"
        }, 1500),
        setTimeout(function() {
            n.remove()
        }, 2500)
    }
    window.onkeydown = function(e) {
        if (!e.ctrlKey) {
            if (e.key == 'd' || e.key == 'D') {
                mouse_move();
                var _click = document.querySelector(".right-area div:nth-child(4) > div > span")
                blbl_toast('弹幕切换', document.querySelector('#live-player'))
            } else if (e.key == 'w' || e.key == 'W') {
                mouse_move()
                var _click = document.querySelector(".right-area div:nth-child(2) > div > span")
                blbl_toast('网页全屏切换', document.querySelector('#live-player'))
            } else if (e.key == 'f' || e.key == 'F') {
                mouse_move()
                var _click = document.querySelector(".right-area div:nth-child(1) > div > span")
                blbl_toast('全屏模式切换', document.querySelector('#live-player'))
            }
            _click && _click.click()
        }
    }
}

(function() {
    'use strict';
    $(document).ready(function() {
        if(/^https?:\/\/.*\.huya\.com\/.*/.test(window.location.href)) {HY(); HYStyle(); HYkjj();};
        if(/^https?:\/\/.*\.douyu\.com\/.*/.test(window.location.href)) {DY(); DYkjj();};
        if(/^https?:\/\/live\.bilibili\.com\/.*/.test(window.location.href)) {BL(); BLkjj();};
        if(/^https?:\/\/www\.bilibili\.com\/.*/.test(window.location.href)) {Next()};
    });
})();