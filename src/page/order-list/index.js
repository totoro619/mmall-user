/*
 * @Author: Administrator
 * @Date:   2017-10-07 15:26:38
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-10-07 21:30:40
 */
'use strict'
require('./index.css');
require('page/common/header/header.js');
require('page/common/nav/nav.js');
var navSide = require('page/common/nav-side/nav-side.js');
var _mm = require('util/_mm.js');
var _order = require('service/order-service.js');
var templateIndex = require('./order-list.string');
var Pagination = require('util/pagination/index.js');


var orderList = {
	data: {
		listParam: {
			pageNum: 1,
			pageSize: 10
		}
	},
	init: function() {
		navSide.init({
			name: 'order-list'
		});
		this.loadOrderList();
	},

	//加载订单列表
	loadOrderList: function() {
		var _this = this,
			templateHtml = '';
		_order.getOrderList(_this.data.listParam, function(res) {
			templateHtml = _mm.renderHtml(templateIndex, res);
			$('.order-list-con').html(templateHtml);
			_this.loadPagination({
				hasPreviousPage: res.hasPreviousPage,
				prePage: res.prePage,
				hasNextPage: res.hasNextPage,
				nextPage: res.nextPage,
				pageNum: res.pageNum,
				pages: res.pages
			});
		}, function(errMsg) {
			$('.order-list-con').html('<p class="err-tip">加载订单失败，请刷新后重试</p>');
		})
	},

	//加载分页信息
	loadPagination: function(pageInfo) {
		var _this = this;
		this.pagination ? '' : (this.pagination = new Pagination());
		this.pagination.render($.extend({}, pageInfo, {
			container: $('.pagination'),
			onSelectPage: function(pageNum) {
				_this.data.listParam.pageNum = pageNum;
				_this.loadOrderList();
			}
		}));
	},



};

$(function() {
	orderList.init()
});