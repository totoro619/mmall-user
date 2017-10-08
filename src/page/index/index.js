/*
 * @Author: Administrator
 * @Date:   2017-09-19 00:17:45
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-09-27 01:16:43
 */
'use strict'
require('./index.css');
require('page/common/nav/nav.js');
require('page/common/header/header.js');
require('util/slider/index.js');
var mm = require('util/_mm.js');
var templateSlider = require('./slider.string');

$(function() {
	//渲染banner的html
	$('.banner-con').html(templateSlider);
	//初始化banner
	var $slider = $('.banner').unslider({
		dots: true
	});

	//前一张和后一张操作的事件绑定
	$('.banner-con .banner-arrow').click(function() {
		var forward = $(this).hasClass('.prev') ? 'prev' : 'next';
		$slider.data('unslider')[forward]();
	})
});