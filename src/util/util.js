'use strict';
const $ = require('jquery');
const hogan = require('hogan');


var conf = {
    serverHost: '',
}
var _util = {
    request: function (para) {
        var _this = this;
        $.ajax({
            type: para.method || 'get',
            url: para.url || '',
            dataType: para.type || 'json',
            data: para.data || '',
            success: function (res) {
                if (0 === res.status) {
                    //请求成功
                    typeof para.success === 'function' && para.success(res.data, res.msg);
                } else if (10 === status) {
                    //未登录状态
                    _this.doLogin();
                } else if (0 === status) {
                    typeof para.error === 'function' && para.error(res.msg);
                }
            },
            error: function (err) {
                typeof para.error === 'function' && para.error(err.statusText);
            }
        })
    },
    //登陆处理
    doLogin: function () {
        window.location.href= './login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    //回到主页
    goHome: function () {
        window.location.href = './index.html';
    },
    //获取服务器地址
    getServerUrl: function (path) {
        return confirm.serverHost + path;
    },
    //获取URL参数
    getUrlParam: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substring(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    //渲染html模板
    renderHtml: function (htmlTemp, data) {
        var compiledTemplate = hogan.compile(htmlTemp);
        var result = compiledTemplate.render(data);
        return result;
    },
    // 提示
    successTips: function (msg) {
        alert(msg);
    },
    errorTips: function (msg) {
        alert(msg);
    },
    //字段验证
    validate:function(value,type){
        var value = $.trim(value);
        if('require'=== type){
            //验证非空
            return !!value;
        }else if('phone'=== type){
            //验证手机
            return /^1[34578]\d{9}$/.test(value);
        }else if('email'=== type){
            return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
        }
    }
};

module.exports = _util;