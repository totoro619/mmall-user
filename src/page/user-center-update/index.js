/*
 * @Author: Administrator
 * @Date:   2017-09-25 18:30:56
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-09-26 15:57:29
 */
/*
 * @Author: Administrator
 * @Date:   2017-09-25 17:22:53
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-09-25 23:11:01
 */
'use strict'
require('./index.css');
require('page/common/nav/nav.js');
require('page/common/header/header.js');
var navSide = require('page/common/nav-side/nav-side.js');
var _mm = require('util/_mm.js');
var _user = require('service/user-service.js');
var templateHtml = require('./index.string');


var usercenter = {
	init: function() {
		navSide.init({
			name: 'user-center'
		});
		this.loadUserInfo();
		this.bindEvent();
	},

	loadUserInfo: function() {

		_user.getUserInfo(function(res) {
			var htmlIndex = _mm.renderHtml(templateHtml, res);
			$('.panel-body').html(htmlIndex);
		}, function(errMsg) {
			_mm.errorTip(errMsg);
		});

	},

	bindEvent: function() {
		var _this = this;

		$(document).on('click', '.btn-submit', function() {

			var userInfo = {
					email: $.trim($('#email').val()),
					phone: $.trim($('#phone').val()),
					question: $.trim($('#question').val()),
					answer: $.trim($('#answer').val())
				},

				//验证结果
				validateResult = _this.formValidate(userInfo);

			//验证成功
			if (validateResult.status) {
				_user.updateUserInfo(userInfo, function(res, msg) {
					_mm.successTip(msg);
					console.log(res);
					window.location.href = './user-center.html';
				}, function(errMsg) {
					_mm.errorTip(errMsg);
				})
			}
			//验证失败
			else {
				//错误提示
				_mm.errorTip(validateResult.msg);
			}
		})

	},

	formValidate: function(formData) {
		var result = {
			status: false,
			msg: ''
		};

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
	usercenter.init()
});