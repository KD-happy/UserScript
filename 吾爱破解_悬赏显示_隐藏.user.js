// ==UserScript==
// @name         吾爱破解 悬赏显示/隐藏
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       KD-happy
// @match        https://www.52pojie.cn/forum.php?*
// @icon         http://52pojie.cn/favicon.ico
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// ==/UserScript==

(function() {
    var aa = [
        {
            id: 'show',
            default: true,
            _true: '✅ 当前隐藏',
            _false: '❌ 当前显示',
            reload: false,
            fun: function() {
                if (document.querySelector(".bm_c")) {
                    document.querySelectorAll(".bm_c table tbody").forEach((f) => {
                        if (f.querySelector(".icn a").getAttribute("title").includes("悬赏")) {
                            f.style.display = this.default ? "none" : ""
                        }
                    })
                }
            }
        }
    ]
    registerMenuCommand(aa)
    run(aa, 'show')
})();
function run(arr, id) {
    arr.forEach(f => {
        f.id == id && (function() {this.fun()}).apply(f)
    })
}
function registerMenuCommand(arr) {
    if (window.menuid == undefined) {
        window.menuid = []
    } else {
        window.menuid.forEach(f => {
            GM_unregisterMenuCommand(f)
        })
        window.menuid = []
    }
    arr.forEach(function(f) {
        if (GM_getValue(f.id) == null) {
            GM_setValue(f.id, f.default)
        } else {
            f.default = GM_getValue(f.id)
        }
        (function() {
            var _this = this
            this.title = this.default ? this._true : this._false
            this._fun = function() {
                GM_setValue(_this.id, _this.default = !_this.default)
                _this.fun()
                registerMenuCommand(arr)
                _this.reload && location.reload()
            }
            window.menuid.push(GM_registerMenuCommand(this.title, this._fun))
        }).apply(f)
    })
}