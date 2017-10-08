/*
 * @Author: Administrator
 * @Date:   2017-10-07 15:26:38
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-10-08 22:40:49
 */
'use strict'
require('./index.css');
require('page/common/header/header.js');
require('page/common/nav/nav.js');
var navSide = require('page/common/nav-side/nav-side.js');
var _mm = require('util/_mm.js');
var _order = require('service/order-service.js');
var templateIndex = require('./index.string');


// page 逻辑部分
var page = {
	data: {
		orderNumber: _mm.getUrlParam('orderNumber')
	},
	init: function() {
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function() {
		// 初始化左侧菜单
		navSide.init({
			name: 'order-list'
		});
		// 加载detail数据
		this.loadDetail();
	},
	bindEvent: function() {
		var _this = this;
		$(document).on('click', '.order-cancel', function() {
			if (window.confirm('确实要取消该订单？')) {
				_order.cancelOrder(_this.data.orderNumber, function(res) {
					_mm.successTip('该订单取消成功');
					_this.loadDetail();
				}, function(errMsg) {
					_mm.errorTip(errMsg);
				});
			}
		});
	},
	// 加载订单列表
	loadDetail: function() {
		var _this = this,
			orderDetailHtml = '',
			$content = $('.content');
		$content.html('<div class="loading"></div>');
		_order.getOrderDetail(this.data.orderNumber, function(res) {
			_this.dataFilter(res);
			// 渲染html
			orderDetailHtml = _mm.renderHtml(templateIndex, res);
			$content.html(orderDetailHtml);
		}, function(errMsg) {
			$content.html('<p class="err-tip">' + errMsg + '</p>');
		});
	},
	// 数据的适配
	dataFilter: function(data) {
		data.needPay = data.status == 10;
		data.isCancelable = data.status == 10;
	}
};
$(function() {
	page.init();
});