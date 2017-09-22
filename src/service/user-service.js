/*
 * @Author: Administrator
 * @Date:   2017-09-21 22:54:10
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-09-21 23:34:39
 */

var _mm = require('util/_mm.js');

var _user = {
	//登出
	logout: function(resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/logout.do'),
			method: 'POST',
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
};

module.exports = _user;