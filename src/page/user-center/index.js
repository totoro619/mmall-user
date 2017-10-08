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
	},

	loadUserInfo: function() {
		_user.getUserInfo(function(res) {
			var htmlIndex = _mm.renderHtml(templateHtml, res);
			$('.panel-body').html(htmlIndex);
		}, function(errMsg) {
			_mm.errorTip(errMsg);
		})
	},


};

$(function() {
	usercenter.init()
});