/*
 * @Author: Administrator
 * @Date:   2017-09-26 15:59:42
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-09-26 16:47:14
 */
'use strict'
require('./index.css');
require('page/common/nav/nav.js');
require('page/common/header/header.js');
var navSide = require('page/common/nav-side/nav-side.js');
var _mm = require('util/_mm.js');
var _user = require('service/user-service.js');

var passUpdate = {
	init: function() {
		navSide.init({
			name: 'pass-update'
		});
		this.bindEvent();
	},

	bindEvent: function() {
		$(document).on('click', '.btn-sbmit', function() {
			var userInfo = {
					password: $.trim($('#password').val()),
					passwordNew: $.trim($('#passwordNew').val()),
					passwordComfirm: $.trim($('#password-comfirm').val()),
				},

				//验证结果
				validateResult = _this.formValidate(userInfo);

			//验证成功
			if (validateResult.status) {
				_user.passwordReset({
					passwordOld: userInfo.password,
					passwordNew: userInfo.passwordNew
				}, function(res, msg) {
					_mm.successTip(msg);
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

		// 验证原密码是否为空
		if (!_mm.validate(formData.password, 'require')) {
			result.msg = '原密码不能为空';
			return result;
		}
		// 验证新密码长度
		if (!formData.passwordNew || formData.passwordNew.length < 6) {
			result.msg = '密码长度不得少于6位';
			return result;
		}
		// 验证两次输入的密码是否一致
		if (formData.passwordNew !== formData.passwordConfirm) {
			result.msg = '两次输入的密码不一致';
			return result;
		}
		result.status = true;
		result.msg = '验证成功';
		return result;

	}


};

passUpdate.init();