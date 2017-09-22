/*
 * @Author: Administrator
 * @Date:   2017-09-21 23:50:17
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-09-21 23:55:30
 */

var _mm = require('util/_mm.js');

var _cart = {
	getCartCount: function(resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/cart/get_cart_product_count.do'),
			success: resolve,
			error: reject
		});
	},
};

module.exports = _cart;