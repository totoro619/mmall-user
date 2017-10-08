/*
 * @Author: Administrator
 * @Date:   2017-09-22 23:55:03
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-10-08 23:20:42
 */

require('./result.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/_mm.js');

$(function() {
	var type = _mm.getUrlParam('type') || 'default',
		$element = $('.' + type + '-success');
	if (type === 'payment') {
		var orderNumber = _mm.getUrlParam('orderNumber'),
			$orderNumber = $element.find('.order-number');
		$orderNumber.attr('href', $orderNumber.attr('href') + orderNumber);
	}
	$element.show();
})