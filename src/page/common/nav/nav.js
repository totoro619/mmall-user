/*
 * @Author: Administrator
 * @Date:   2017-09-21 00:07:01
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-09-21 23:52:49
 */


require('./nav.css');
var _mm = require('util/_mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');

var nav = {
	init: function() {
		this.bindEvent();
		this.loadUserInfo();
		this.loadCartCount();
		return this;
	},
	bindEvent: function() {
		//登录点击事件
		$(".js-login").click(function() {
			_mm.doLogin();
		});
		//注册点击事件
		$('.js-register').click(function() {
			window.location.href = './register.html';
		});
		// 退出点击事件
		$('.js-logout').click(function() {
			_user.logout(function(res) {
				window.location.reload();
			}, function(errMsg) {
				_mm.errTip(errMsg)
			})
		});
	},
	//加载用户信息
	loadUserInfo: function() {
		_user.checkLogin(function(res) {
			$('.not-login').hide().siblings('.user.login').show().find('.username').text(res.username);
		}, function(errMsg) {
			//do nothing
		})
	},
	loadCartCount() {
		_cart.getCartCount(function(res) {
			$('.nav .cart-count').text(res || 0)
		}, function(errMsg) {
			$('.nav .cart-count').text(0)
		})
	}
};

module.exports = nav.init();