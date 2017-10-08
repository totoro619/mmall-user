/*
 * @Author: Administrator
 * @Date:   2017-10-03 23:25:27
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-10-06 23:02:33
 */
/*
 * @Author: Administrator
 * @Date:   2017-10-03 15:07:17
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-10-03 15:08:07
 */
var _mm = require('util/_mm.js');

var _address = {

	//获取地址列表
	getAddressList: function(resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/shipping/list.do'),
			data: {
				pageSize: 50
			},
			success: resolve,
			error: reject
		});
	},

	//添加收件地址
	addAddress: function(addressInfo, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/shipping/add.do'),
			data: addressInfo,
			success: resolve,
			error: reject
		});
	},

	updateAddress: function(addressInfo, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/shipping/update.do'),
			data: addressInfo,
			success: resolve,
			error: reject
		});
	},

	deleteAddress: function(shippingId, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/shipping/del.do'),
			data: {
				shippingId: shippingId
			},
			success: resolve,
			error: reject
		});
	},

	// 获取单条收件人信息
	getAddress: function(shippingId, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/shipping/select.do'),
			data: {
				shippingId: shippingId
			},
			success: resolve,
			error: reject
		});
	},


};

module.exports = _address;