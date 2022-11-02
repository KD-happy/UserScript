// ==UserScript==
// @name         蓝奏云密码自动填写
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  通过链接自带的密码填写，https://www.lanzoui.com/xxxxx#pasd
// @author       KD-happy
// @match        http*://*.lanzoui.com/*
// @match        http*://*.lanzouw.com/*
// @match        http*://*.lanzouy.com/*
// @match        http*://*.lanzouj.com/*
// @match        http*://*.lanzouv.com/*
// @icon         https://www.lanzoui.com/favicon.ico
// @run-at       document-end
// @require      https://cdn.jsdelivr.net/npm/sweetalert2@10.10.0/dist/sweetalert2.all.min.js
// @grant        none
// ==/UserScript==

(function() {
    let Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    // if (!window.location.hash && !window.location.hash.slice(1))
    if(/^https?:\/\/.*\.?lanzou[a-z]?\.com\/.*#.*/.test(location.href)) {
        let pwdload = document.querySelector("#pwdload")
        let passwddiv = document.querySelector("#passwddiv")
        if (pwdload == null && passwddiv == null) {
            console.log("不需要输入密码")
        } else {
            let password = location.hash.replace("#", "")
            if (password == null) {
                console.log("链接没有密码")
                Toast.fire({
                    icon: 'error',
                    text: '链接没有密码'
                })
            } else {
                console.log(password)
                if (password != "") {
                    document.querySelector("#pwd").value = password
                    document.querySelector("#sub") != null && document.querySelector("#sub").click()
                    document.querySelector(".passwddiv-btn") != null && document.querySelector(".passwddiv-btn").click()
                    Toast.fire({
                        icon: 'success',
                        text: '获取提取码成功！'
                    })
                } else {
                    Toast.fire({
                        icon: 'error',
                        text: '链接没有密码'
                    })
                }
            }
        }
    }
})();