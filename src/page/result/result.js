/*
 * @Author: Administrator
 * @Date:   2017-09-22 23:55:03
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-09-23 00:45:34
 */

require('./result.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/_mm.js');

$(function() {
	var type = _mm.getUrlParam('type') || 'default';
	$('.' + type + '-success').show();
})