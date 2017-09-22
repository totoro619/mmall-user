/*
 * @Author: Administrator
 * @Date:   2017-09-19 17:44:01
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-09-21 23:56:36
 */
var hogan = require('hogan.js');

var conf = {
	serverHost: ''
};

var _mm = {

	// 网络请求
	request: function(param) {
		var _this = this;
		$.ajax({
			type: param.method || 'get',
			url: param.url || '',
			dataType: param.type || 'json',
			data: param.data || '',
			success: function(res) {
				if (res.status === 0) {
					typeof param.success === 'function' && param.success(res.data, res.msg)
				}
				//没有登录状态，需要强制登录
				else if (res.status === 10) {
					_this.doLogin();
				}
				//请求数据错误
				else if (res.status === 1) {
					typeof param.error === 'function' && param.error(res.msg)
				}
			},
			error: function(err) {
				typeof param.error === 'function' && param.error(err.statusText)
			}
		});
	},

	//获取服务器地址
	getServerUrl: function(path) {
		return conf.serverHost + path;
	},

	//获取url参数
	getUrlParam: function(name) {
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		var result = window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null
	},

	//渲染HTML模板
	renderHtml: function(htmlTemplate, data) {
		var compiledTemplate = hogan.compile(htmlTemplate),
			result = compiledTemplate.render(data);
		return result;
	},

	//成功提示
	successTip: function(msg) {
		alert(msg || '操作成功！')
	},

	//错误提示
	errorTip: function(msg) {
		alert(msg || '操作失误~')
	},

	//非空验证，手机号、邮箱验证
	validate: function(value, type) {
		var value = $.trim(value);
		if (type = 'require') {
			return !!value;
		}
		if (type = 'phone') {
			return /^1\d{10}$/.test(value);
		}
		if (type = 'email') {
			return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
		}
	},

	//统一登录处理
	doLogin: function() {
		window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
	},

	// 返回首页
	goHome: function() {
		window.location.href = './index.html';
	}
};

module.exports = _mm;