/*
 * @Author: Administrator
 * @Date:   2017-09-19 00:18:43
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-10-04 15:54:58
 */
'use strict'
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/_mm.js');
var _user = require('service/user-service.js');

var formError = {
	show: function(errMsg) {
		$('.err-item').show().find('.err-msg').text(errMsg);
	},
	hide: function() {
		$('.err-item').hide().find('.err-msg').text('');
	}
};

var login = {
	init: function() {
		this.bindEvent();
	},

	bindEvent: function() {
		var _this = this;
		$('#submit').click(function(event) {
			_this.submit();
		});
	},

	//提交表单
	submit: function() {
		var formData = {
				username: $.trim($('#username').val()),
				password: $.trim($('#password').val())
			},

			//验证结果
			validateResult = this.formValidate(formData);

		//验证成功
		if (validateResult.status) {
			_user.login(formData, function(res) {
				window.location.href = _mm.getUrlParam('redirect') || './index.html';
			}, function(errMsg) {
				formError.show(errMsg);
			})
		}
		//验证失败
		else {
			//错误提示
			formError.show(validateResult.msg);
		}

	},

	formValidate: function(formData) {
		var result = {
			status: false,
			msg: ''
		};

		if (!_mm.validate(formData.username, 'require')) {
			result.msg = '用户名不能为空';
			return result;
		} else
		if (!_mm.validate(formData.password, 'require')) {
			result.msg = '密码不能为空';
			return result;
		} else {
			result.status = true;
			result.msg = '验证成功';
			return result;
		}

	}


};

$(function() {
	login.init();
});