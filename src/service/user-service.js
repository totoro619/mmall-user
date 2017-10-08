/*
 * @Author: Administrator
 * @Date:   2017-09-21 22:54:10
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-09-26 16:51:16
 */

var _mm = require('util/_mm.js');

var _user = {
	//用户登录
	login: function(userInfo, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/login.do'),
			data: userInfo,
			method: 'POST',
			success: resolve,
			error: reject
		});
	},

	//登出
	logout: function(resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/logout.do'),
			method: 'POST',
			success: resolve,
			error: reject
		});
	},

	//注册
	register: function(userInfo, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/register.do'),
			method: 'POST',
			data: userInfo,
			success: resolve,
			error: reject
		});
	},

	//检查登录状态
	checkLogin: function(resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/get_user_info.do'),
			method: 'POST',
			success: resolve,
			error: reject
		});
	},

	//检查用户名是否存在
	checkUserName: function(username, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/check_valid.do'),
			method: 'POST',
			data: {
				type: 'username',
				str: username
			},
			success: resolve,
			error: reject
		});
	},

	//找回密码问题
	getQuestion: function(username, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/forget_get_question.do'),
			method: 'POST',
			data: username,
			success: resolve,
			error: reject
		});
	},

	//提交问题答案
	checkAnswer: function(userInfo, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/forget_check_answer.do'),
			method: 'POST',
			data: userInfo,
			success: resolve,
			error: reject
		});
	},

	//忘记密码的重设密码
	resetPassword: function(userInfo, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/forget_reset_password.do'),
			method: 'POST',
			data: userInfo,
			success: resolve,
			error: reject
		});
	},

	//获取用户信息
	getUserInfo: function(resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/get_information.do'),
			method: 'POST',
			success: resolve,
			error: reject
		});
	},

	//更新用户信息
	updateUserInfo: function(userInfo, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/update_information.do'),
			method: 'POST',
			data: userInfo,
			success: resolve,
			error: reject
		});
	},

	passwordReset: function(userInfo, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/reset_password.do'),
			method: 'POST',
			data: userInfo,
			success: resolve,
			error: reject
		});
	}
};

module.exports = _user;