// ==UserScript==
// @name         签到脚本
// @version      1.0
// @description  签到一些常见的网站，但是要自己配置脚本
// @author       KD-happy
// @icon         https://kdlong.gitee.io/img/favicon.png
// @match        https://www.jianfast.com/
// @match        https://www.wenshushu.cn/
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_notification
// @grant        GM_xmlhttpRequest
// @grant        GM_listValues
// @grant        GM_openInTab
// ==/UserScript==
/*
已完成签到: ccava, 哔哩漫画, AcFun, 文叔叔, 吾爱破解
blbl查看亲密度
未完成的签到: 什么值得买, 天翼云盘, 哔哩直播, 曲奇云盘, 网易云, 有道云笔记, PTA, 力扣, CSDN, cctv
*/

(function() {
    // console.log(GM_listValues());
    var menu_ALL = [
        ['menu_qd', '签到', '已签到', false]
    ], menu_ID = [];
    for (let i=0;i<menu_ALL.length;i++) { // 如果读取到的值为 null 就写入默认值
        if (GM_getValue(menu_ALL[i][0]) == null){GM_setValue(menu_ALL[i][0], menu_ALL[i][3])};
    }
    registerMenuCommand();

    // 注册脚本菜单
    function registerMenuCommand() {
        if (menu_ID.length+1 > menu_ALL.length) { // 如果菜单ID数组多于菜单数组，说明不是首次添加菜单，需要卸载所有脚本菜单（+1就会使得点击后不会在后面添加菜单）
            for (let i=0;i<menu_ID.length;i++) {
                GM_unregisterMenuCommand(menu_ID[i]);
            }
        }
        for (let i=0;i<menu_ALL.length;i++) { // 循环注册脚本菜单
            menu_ALL[i][3] = GM_getValue(menu_ALL[i][0]);
            menu_ID[i] = GM_registerMenuCommand(`[ ${menu_ALL[i][3]?'√':'×'} ] ${menu_ALL[i][1]}`, function(){menu_switch(`${menu_ALL[i][3]}`,`${menu_ALL[i][0]}`,`${menu_ALL[i][2]}`)});
        }
        //menu_ID[menu_ID.length] = GM_registerMenuCommand('反馈 & 建议', function () {window.GM_openInTab('https://kdlong.gitee.io/', {active: true,insert: true,setParent: true});});
    }

    // 菜单开关
    function menu_switch(menu_status, Name, Tips) {
        if (menu_status == 'true') {
            GM_setValue(`${Name}`, false);
            GM_notification({text: `已关闭 [${Tips}] 功能\n（刷新网页后生效）`, title: '我的小脚本', timeout: 2000});
        } else {
            GM_setValue(`${Name}`, true);
            GM_notification({text: `已开启 [${Tips}] 功能\n（刷新网页后生效）`, title: '我的小脚本', timeout: 2000});
        }
        registerMenuCommand(); // 重新注册脚本菜单
    };

    // 返回菜单值（用于了解菜单开关情况）
    function menu_value(menuName) {
        for (let menu of menu_ALL) {
            if (menu[0] == menuName) {
                return menu[3]
            }
        }
    }
    // ************************************************************************************************************************************************** //
    function myLog(info) { //自定义打印输出
        return console.log('%c'+`${info}`, "color:blue; font-size:15px");
    };
    function myLogs(info) {
        return console.log("%c"+`${info}`, "color:red; font-size:15px");
    };

    var myDate = new Date();
    var dateDay = myDate.toLocaleDateString();

    function closePage() { //关闭当前页面
        if (
            navigator.userAgent.indexOf("Firefox") != -1 ||
            navigator.userAgent.indexOf("Chrome") != -1
        ) {
            window.location.href = "about:blank";
            window.close();
        } else {
            window.opener = null;
            window.open("", "_self");
            window.close();
        }
    }

    if(GM_getValue('MyDate') != dateDay) {
        //GM_setValue('MyDate', dateDay);
        qianDao();
        if(GM_getValue('MyDate') != dateDay) {
            GM_notification({text: '今日还未签到！', title: '签到脚本', timeout: 1500});
        }
    } else if(GM_getValue('menu_qd')) {
        GM_setValue('menu_qd', false);
        registerMenuCommand();
    };
    function qianDao() {
        if(GM_getValue('menu_qd')) {
            blbl(); //哔哩直播
            // blmh(); //哔哩漫画
            ccava(); //CCAVA
            acfun(); //Acfun
            wa(); //吾爱
            azg(); //爱助攻
            qedj(); //企鹅电竞
            pta(); //PTA签到
            csdn();
            GM_setValue('MyDate', dateDay);
            GM_setValue('menu_qd', false); //目录修改
            GM_setValue('wss', 1);
            GM_openInTab('https://www.wenshushu.cn/');
            GM_openInTab('https://cloud.tencent.com/act/integralmall/');
            GM_openInTab('https://plus.tool.lu/user/sign/');

            registerMenuCommand();
        }
    };

    function blbl() {
        return new Promise(a=>{
            GM_xmlhttpRequest({
                url:"https://api.live.bilibili.com/fans_medal/v1/FansMedal/get_list_in_room",
                method :"GET",
                headers: {
                    "Content-type": "application/x-www-form-urlencoded"
                },
                onload:function(xhr){
                    var obj = JSON.parse(xhr.responseText);
                    if(obj.message === "invalid params") {
                        myLogs('哔哩哔哩需要登录');
                        GM_setValue('哔哩', `哔哩哔哩需要登录`); 
                        GM_openInTab('https://passport.bilibili.com/login');
                    } else {
                        obj.data.forEach(element => {
                            if(element.today_intimacy == 0) {
                                myLogs(`${element.target_name}: 快去刷亲密度吧`);
                                GM_setValue(`${element.target_name}`, `快去刷亲密度吧`);
                                GM_openInTab(`https://live.bilibili.com/${element.room_id}`);
                            } else {
                                myLog(`${element.target_name} 亲密度+ ${element.today_intimacy}`);
                                GM_setValue(`${element.target_name}`, `亲密度+ ${element.today_intimacy}`);
                            }
                        });
                    }
                }
            })
        });
    };
    function blmh() {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://manga.bilibili.com/twirp/activity.v1.Activity/ClockIn",
            data: {"platform":"android"},
            responseType: "json",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36"
            },
            onload: function (xhr) {
                var obj = xhr.responseText;
                if(obj.code != 0) {
                    myLogs(`哔哩漫画: ${obj.msg}`);
                    GM_setValue('哔哩漫画', `${obj.msg}`);
                } else {
                    myLog('哔哩漫画: 签到成功');
                    GM_setValue('哔哩漫画', '签到成功');
                }
                GM_xmlhttpRequest({
                    method: "POST",
                    url: "https://manga.bilibili.com/twirp/activity.v1.Activity/GetClockInInfo",
                    responseType: "json",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    },
                    onload: function (xhr) {
                        var obj = xhr.responseText;
                        if(obj.code != 0) {
                            myLogs(`哔哩漫画: 签到天数获取失败`);
                        } else {
                            myLog(`哔哩漫画: 签到天数 ${obj.data.day_count}`);
                        }
                    }
                });
            }
        });
    };
    function ccava() {
        return new Promise(a=>{
            GM_xmlhttpRequest({
                url:"https://pc.ccava.net/zb_users/plugin/mochu_us/cmd.php?act=qiandao",
                headers: {
                    "Content-type": "application/x-www-form-urlencoded"
                },
                onload:function(xhr){
                    var obj = JSON.parse(xhr.responseText);
                    myLog("CCAVA: "+obj.msg);
                    GM_setValue('CCAVA', obj.msg);
                    if(obj.msg == "请登录以后再进行签到！") {
                        GM_openInTab('https://www.ccava.net/login.html');
                    }
                }
            })
        });
    };
    function acfun() {
        return new Promise(a=>{
            GM_xmlhttpRequest({
                url:"https://www.acfun.cn/rest/pc-direct/user/signIn",
                headers: {
                    "Content-type": "application/x-www-form-urlencoded"
                },
                onload:function(xhr){
                    var obj = JSON.parse(xhr.responseText);
                    myLog("Acfun: "+obj.msg);
                    GM_setValue("Acfun", obj.msg);
                    if(obj.msg == undefined) {
                        GM_openInTab('https://www.acfun.cn/login/');
                    }
                }
            })
        });
    }
    function wa() {
        return new Promise(a=>{
            GM_xmlhttpRequest({
                url: "https://www.52pojie.cn/home.php?mod=task&do=apply&id=2",
                method: "GET",
                headers: {
                    "Content-type": "application/x-www-form-urlencoded"
                },
                onload: function(xhr){
                    if(xhr.responseText.includes('恭喜')) {
                        myLog('吾爱破解: 签到成功');
                        GM_setValue('吾爱破解', '签到成功');
                    } else if(xhr.responseText.includes('已申请过此任务')){
                        myLog('吾爱破解: 重复签到');
                        GM_setValue('吾爱破解', '重复签到');
                    } else {
                        myLogs('吾爱破解: 需要登录');
                        GM_setValue('吾爱破解', '需要登录');
                        GM_openInTab('https://www.52pojie.cn/');
                    }
                }
            })
        });
    }
    function azg() {
        return new Promise(a=>{
            GM_xmlhttpRequest({
                url: "https://www.aizhugong.com/plugin.php?id=k_misign:sign&operation=qiandao&formhash=76f8716f",
                method: "GET",
                headers: {
                    "Content-type": "application/x-www-form-urlencoded"
                },
                onload: function(xhr){
                    if(xhr.responseText.includes('恭喜')) {
                        myLog('爱助攻: 签到成功');
                        GM_setValue('爱助攻', '签到成功');
                    } else if(xhr.responseText.includes('今日已签')){
                        myLog('爱助攻: 重复签到');
                        GM_setValue('爱助攻', '重复签到');
                    } else {
                        myLogs('爱助攻: 需要登录');
                        GM_setValue('爱助攻', '需要签到');
                        GM_openInTab('https://www.aizhugong.com/');
                    }
                }
            })
        });
    }
    function qedj() {
        return new Promise(a=> {
            GM_xmlhttpRequest({
                url: 'https://game.egame.qq.com/cgi-bin/pgg_async_fcgi?param={"key":{"module":"pgg.user_task_srf_svr.CPGGUserTaskSrfSvrObj","method":"OldUserCheckin","param":{}}}',
                method: 'GET',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded"
                },
                responseType: "json",
                onload: function(xhr) {
                    if(xhr.uid == 0) {
                        GM_openInTab('https://egame.qq.com/');
                        GM_setValue('企鹅电竞', '需要登录');
                        myLogs('企鹅电竞: 需要登录');
                    } else {
                        GM_setValue('企鹅电竞', xhr.responseText.data.key.retMsg);
                        myLog(`企鹅电竞: ${xhr.responseText.data.key.retMsg}`);
                    }
                }
            })
        })
    }
    function pta() {
        return new Promise(a=> {
            GM_xmlhttpRequest({
                url: 'https://pintia.cn/api/users/checkin',
                method: 'POST',
                onload: function(xhr) {
                    if(xhr.responseText.includes("BILL_ACCOUNT_SERVICE_ALREADY_DAILY_CHECK_IN")) {
                        GM_setValue('PTA', '重复签到');
                        myLog('PTA: 重复签到');
                    } else if(xhr.responseText.includes("DAILY_CHECK_IN")) {
                        GM_setValue('PTA', '签到成功，获得5个金币');
                        myLog('PTA: 签到成功，获得5个金币');
                    } else {
                        GM_setValue('PTA', '需要登录');
                        myLogs('PTA: 需要登录');
                        GM_openInTab('https://pintia.cn/problem-sets?tab=0')
                    }
                }
            })
        })
    }
    function csdn() {
        return new Promise(a=> {
            GM_xmlhttpRequest({
                url: 'https://me.csdn.net/api/LuckyDraw_v2/signIn',
                method: 'POST',
                responseType: "json",
                onload: function(xhr) {
                    var message = xhr.responseText;
                    if(JSON.stringify(message).includes("用户已签到")) {
                        GM_setValue('CSDN', '重复签到');
                        myLog('CSDN: 重复签到');
                    } else if(JSON.stringify(message).includes("成功")) {
                        GM_setValue('CSDN', message.data.msg);
                        myLog(`CSDN: ${message.data.msg}`);
                    } else {
                        GM_setValue('CSDN', '需要登录');
                        myLogs('CSDN: 需要登录');
                        GM_openInTab('https://www.csdn.net/');
                    }
                }
            })
        })
    }
    window.onload = function(){
        if(/^https?:\/\/.*\.wenshushu\.cn\/.*/.test(window.location.href) && GM_getValue('wss') == 1) {
            var m_link = document.querySelector('.m-link');
            var a = document.querySelector('.icon-cont_clock.icon-cont');
            var b = document.querySelector('.icon-cont_clock.icon-cont.icon-cont_complete');

            if(b == null) {
                console.log("没有签到");
                a.click();
                GM_setValue('wss', 0);
                GM_setValue('文叔叔', '签到完毕');
                console.log("签到完毕");
                setTimeout(closePage, 2000);
            } else if(m_link == null) {
                console.log("签到了");
                GM_setValue('wss', 0);
                GM_setValue('文叔叔', '签到了');
                setTimeout(closePage, 2000);
            } else {
                console.log("没有登录");
                GM_setValue('文叔叔', '没有登录');
            }
        }
    }
})();