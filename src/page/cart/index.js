/*
 * @Author: Administrator
 * @Date:   2017-10-01 15:29:34
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-10-04 19:04:02
 */
'use strict'
require('./index.css');
require('page/common/header/header.js');
var nav = require('page/common/nav/nav.js');
var _mm = require('util/_mm.js');
var _cart = require('service/cart-service.js');
var templateHtml = require('./index.string');

var detail = {
	data: {

	},

	init: function() {
		this.onLoad();
		this.bindEvent();
	},

	onLoad: function() {
		this.loadCart();
	},

	//加载购物车
	loadCart: function() {
		var _this = this;

		_cart.getCartList(function(res) {
			_this.renderCart(res);
		}, function(errMsg) {
			_this.showCartError();
		});

	},

	renderCart: function(data) {
		this.filter(data);
		// 缓存购物车信息
		this.data.cartInfo = data;
		//
		var cartHtml = _mm.renderHtml(templateHtml, data);
		$('.page-wrap').html(cartHtml);

		nav.loadCartCount();
	},

	filter: function(data) {
		data.notEmpty = !!data.cartProductVoList.length;
	},

	bindEvent: function() {
		var _this = this;
		//商品选中/取消
		$(document).on('click', '.cart-select', function() {
			var $this = $(this),
				productId = $this.parents('.cart-table').data('product-id');
			//选中
			if ($this.is(':checked')) {
				_cart.selectProduct(productId, function(res) {
					_this.renderCart(res);
				}, function(errMsg) {
					_this.showCartError();
				})
			}
			//取消
			else {
				_cart.unselectProduct(productId, function(res) {
					_this.renderCart(res);
				}, function(errMsg) {
					_this.showCartError();
				})
			}

		});

		// 商品的全部选中/全部取消选中
		$(document).on('click', '.cart-select-all', function() {
			var $this = $(this);
			//全部选中
			if ($this.is(':checked')) {
				_cart.selectAllProduct(function(res) {
					_this.renderCart(res);
				}, function(errMsg) {
					_this.showCartError();
				})
			}
			//全部取消
			else {
				_cart.unselectAllProduct(function(res) {
					_this.renderCart(res);
				}, function(errMsg) {
					_this.showCartError();
				})
			}

		});

		// 商品数量的变化
		$(document).on('click', '.count-btn', function() {
			var $this = $(this),
				$pCount = $this.siblings('.count-input'),
				currCount = parseInt($pCount.val()),
				productId = $this.parents('.cart-table').data('product-id'),
				type = $this.hasClass('plus') ? 'plus' : 'minus',
				minCount = 1,
				maxCount = parseInt($this.data('max')),
				newCount = 0;

			if (type === 'plus') {
				if (currCount >= maxCount) {
					_mm.errorTip('该商品数量已到达上限');
					return;
				}
				newCount = currCount + 1;
			} else if (type === 'minus') {
				if (currCount <= minCount) {
					return;
				}
				newCount = currCount - 1;
			}

			_cart.updateCount({
				productId: productId,
				count: newCount
			}, function(res) {
				_this.renderCart(res)
			}, function(errMsg) {
				_this.showCartError();
			})


		});

		// 删除某个商品
		$(document).on('click', '.cart-delete', function() {
			if (window.confirm('确定删除该商品？')) {
				var productId = $(this).parents('.cart-table').data('product-id');
				_this.deleteCartProduct(productId);
			}
		});

		//删除选中的商品
		$(document).on('click', '.delete-selected', function() {
			if (window.confirm('确定删除该商品？')) {
				var arrProductIds = [],
					$selectedItem = $('.cart-select:checked');

				// 循环查找选中的productIds
				for (var i = 0, iLength = $selectedItem.length; i < iLength; i++) {
					arrProductIds.push($($selectedItem[i]).parents('.cart-table').data('product-id'));
				}

				if (arrProductIds.length) {
					_this.deleteCartProduct(arrProductIds.join(','));
				} else {
					_mm.errorTip('您还没有选中要删除的商品')
				}

			}
		});

		$(document).on('click', '.btn-submit', function() {
			if (_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0) {
				window.location.href = './order-confirm.html';
			} else {
				_mm.errorTip('请选择商品后再提交');
			}
		});



	},

	deleteCartProduct: function(productIds) {
		var _this = this;
		_cart.deleteProduct(productIds, function(res) {
			_this.renderCart(res);
		}, function(errMsg) {
			_this.showCartError();
		})
	},

	showCartError: function() {
		$('.page-wrap').html('<p>刷新一下，哪里不对了</p>');
	}
};

$(function() {
	detail.init();
})