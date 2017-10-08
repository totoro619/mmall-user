/*
 * @Author: Administrator
 * @Date:   2017-10-03 15:07:17
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-10-08 22:02:55
 */
var _mm = require('util/_mm.js');

var _order = {

	//获取商品列表
	getProductList: function(resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/order/get_order_cart_product.do'),
			success: resolve,
			error: reject
		});
	},

	// 提交订单
	createOrder: function(orderInfo, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/order/create.do'),
			data: orderInfo,
			success: resolve,
			error: reject
		});
	},

	cancelOrder: function(orderNo, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/order/cancel.do'),
			data: {
				orderNo: orderNo
			},
			success: resolve,
			error: reject
		});
	},

	//获取订单列表
	getOrderList: function(Info, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/order/list.do'),
			data: Info,
			success: resolve,
			error: reject
		});
	},

	//获取订单详情
	getOrderDetail: function(orderNo, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/order/detail.do'),
			data: {
				orderNo: orderNo
			},
			success: resolve,
			error: reject
		});
	},
};

module.exports = _order;