/*
 * @Author: Administrator
 * @Date:   2017-09-29 15:41:26
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-10-04 16:42:21
 */
'use strict'
require('./index.css');
require('page/common/nav/nav.js');
require('page/common/header/header.js');
var _mm = require('util/_mm.js');
var _product = require('service/product-service.js');
var _cart = require('service/cart-service.js');
var templateHtml = require('./index.string');

var detail = {
	data: {
		productId: _mm.getUrlParam('productId') || '',
	},


	init: function() {
		this.onLoad();
		this.bindEvent();
	},

	onLoad: function() {
		if (!this.data.productId) {
			_mm.goHome();
		}

		this.loadDetail();
	},

	loadDetail: function() {
		var _this = this,
			html = '',
			$pageWrap = $('.page-wrap');
		//loading
		$pageWrap.html('<div class="loading"></div>')
			//请求detail信息
		_product.getProductDetail(this.data.productId, function(res) {
			_this.filter(res);
			_this.data.detailInfo = res;
			html = _mm.renderHtml(templateHtml, res);
			$pageWrap.html(html);
		}, function(errMsg) {
			$pageWrap.html('<p class="err-tip">此商品已下架或删除</p>');
		});
	},

	filter: function(data) {
		data.subImages = data.subImages.split(',');
	},

	bindEvent: function() {
		var _this = this;
		//图片预览
		$(document).on('mouseenter', '.p-img-item', function() {
			var imageUrl = $(this).find('.p-img').attr('src');
			$('.main-img').attr('src', imageUrl);
		});
		// count的操作
		$(document).on('click', '.p-count-btn', function() {
			var type = $(this).hasClass('plus') ? 'plus' : 'minus',
				$pCount = $('.p-count'),
				currCount = parseInt($pCount.val()),
				minCount = 1,
				maxCount = _this.data.detailInfo.stock || 1;
			if (type === 'plus') {
				$pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
			}
			if (type === 'minus') {
				$pCount.val(currCount > maxCount ? currCount - 1 : minCount);
			}

		});
		//加入购物车
		$(document).on('click', '.cart-add', function() {
			_cart.addToCart({
				productId: _this.data.productId,
				count: $('.p-count').val()
			}, function(res) {
				window.location.href = './result.html?type=cart-add';
			}, function(errMsg) {
				_mm.errorTip(errMsg);
			})
		});

	}
};

$(function() {
	detail.init();
})