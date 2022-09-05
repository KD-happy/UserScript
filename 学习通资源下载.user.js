// ==UserScript==
// @name         学习通资源下载
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  可以下载学习通任务点中的资源
// @author       KD-happy
// @match        https://mooc1-1.chaoxing.com/mycourse/studentstudy*
// @match        https://mooc1-1.chaoxing.com/knowledge/cards*
// @match        https://mooc1.chaoxing.com/mycourse/studentstudy*
// @icon         https://kdlong.gitee.io/img/favicon.png
// @grant        GM_xmlhttpRequest
// @grant        GM_openInTab
// @run-at       document-end
// ==/UserScript==

(function() {
    var objectidList = [];
    for(var i=0; i<mArg.attachments.length; i++) {
        var property = mArg.attachments[i].property;
        var objectid = property.objectid;
        objectidList.push(objectid);
    }
    function dowRes() {
        if(objectidList.length == 1) {
            var Url = `https://mooc1-1.chaoxing.com/ananas/status/${objectidList[0]}`;
        } else {
            var value = parseInt(document.querySelector('#myInput').value);
            if(value > objectidList.length || value <= 0 || isNaN(value)) return 0;
            var Url = `https://mooc1-1.chaoxing.com/ananas/status/${objectidList[value-1]}`;
        }
        GM_xmlhttpRequest({
            url: Url,
            method: 'GET',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            responseType: 'json',
            onload: function(xhr) {
                console.log(xhr.responseType);
                // window.open(xhr.responseText.download);
                GM_openInTab(xhr.responseText.download);
            }
        })
    }
    function insertBefore(node, newElement) { // 将Html源码添加到前面
        node.insertBefore(newElement, node.firstChild);
    }
    var Html = `<span style="padding: 0 30px 0 0;">${objectidList.length}个资源</span><input type="number" id="myInput" style="width: 50px;"> <button id="myButton">下载</button>`;
    var div = document.createElement('div');
    div.setAttribute('style', 'text-align: center;');
    div.innerHTML = Html;
    (function() {
        insertBefore(document.querySelector('.tabs'), div);
        setTimeout(function() {
            document.querySelector('#myButton').addEventListener('click', dowRes);
        }, 100);
    })();
})();