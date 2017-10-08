/*
 * @Author: Administrator
 * @Date:   2017-09-24 01:11:57
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-09-24 19:01:25
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

var register = {
	init: function() {
		this.bindEvent();
	},

	bindEvent: function() {
		var _this = this;
		//验证username
		$('#username').blur(function() {
			var username = $.trim($(this).val());

			//异步验证用户名是否存在
			_user.checkUserName(username, function(res) {
				formError.hide();
			}, function(errMsg) {
				formError.show(errMsg);
			});
		});
		//注册按钮点击
		$('#submit').click(function(event) {
			_this.submit();
		});
	},

	//提交表单
	submit: function() {
		var formData = {
				username: $.trim($('#username').val()),
				password: $.trim($('#password').val()),
				passwordComfirm: $.trim($('#password-comfirm').val()),
				email: $.trim($('#email').val()),
				phone: $.trim($('#phone').val()),
				question: $.trim($('#question').val()),
				answer: $.trim($('#answer').val()),
			},

			//验证结果
			validateResult = this.formValidate(formData);

		//验证成功
		if (validateResult.status) {
			_user.register(formData, function(res) {
				window.location.href = './result.html?type=register';
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

		//验证用户名是否为空
		if (!_mm.validate(formData.username, 'require')) {
			result.msg = '用户名不能为空';
			return result;
		}
		//验证密码是否为空
		if (!_mm.validate(formData.password, 'require')) {
			result.msg = '密码不能为空';
			return result;
		}
		//验证密码长度
		if (formData.password.length < 6) {
			result.msg = '密码长度不得小于6位';
			return result;
		}
		//验证两次密码输入是否一致
		if (formData.password !== formData.passwordComfirm) {
			console.log(formData.password);
			console.log(formData.passwordComfirm);

			result.msg = '密码输入不一致';
			return result;
		}

		//验证邮箱
		if (!_mm.validate(formData.email, 'email')) {
			result.msg = '邮箱格式不正确';
			return result;
		}
		//验证手机号格式
		if (!_mm.validate(formData.phone, 'phone')) {
			result.msg = '手机号码格式不正确';
			return result;
		}
		//验证密码提示问题是否为空
		if (!_mm.validate(formData.question, 'require')) {
			result.msg = '密码提示问题不能为空';
			return result;
		}
		//验证密码提示问题答案是否为空
		if (!_mm.validate(formData.answer, 'require')) {
			result.msg = '密码提示问题答案不能为空';
			return result;
		}

		result.status = true;
		result.msg = '验证成功';
		return result;

	}


};

$(function() {
	register.init();
});