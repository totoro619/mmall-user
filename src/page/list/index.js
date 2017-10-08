/*
 * @Author: Administrator
 * @Date:   2017-09-27 17:06:54
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-09-29 15:52:03
 */
'use strict'
require('./index.css');
require('page/common/nav/nav.js');
require('page/common/header/header.js');
var _mm = require('util/_mm.js');
var _product = require('service/product-service.js');
var templateHtml = require('./index.string');
var Pagination = require('util/pagination/index.js');

var _list = {
	data: {
		listParam: {
			keyword: _mm.getUrlParam('keyword') || '',
			categoryId: _mm.getUrlParam('categoryId') || '',
			pageNum: _mm.getUrlParam('pageNum') || 1,
			pageSize: _mm.getUrlParam('pageSize') || 20,
			orderBy: _mm.getUrlParam('orderBy') || 'default'
		}
	},

	init: function() {
		this.onLoad();
		this.bindEvent();
	},

	onLoad: function() {
		this.loadList();
	},

	//加载list数据
	loadList: function() {
		var _this = this,
			listHtml = '',
			$pListCon = $('.p-list-con'),
			listParam = this.data.listParam;
		$pListCon.html('<div class="loading"></div>');

		// 删除参数中不必要的字段
		listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);
		_product.getProductList(listParam, function(res) {
			listHtml = _mm.renderHtml(templateHtml, {
				list: res.list
			});
			$pListCon.html(listHtml);
			_this.loadPagination({
				hasPreviousPage: res.hasPreviousPage,
				prePage: res.prePage,
				hasNextPage: res.hasNextPage,
				nextPage: res.nextPage,
				pageNum: res.pageNum,
				pages: res.pages
			});
		}, function(errMsg) {
			_mm.errorTip(errMsg);
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
				_this.loadList();
			}
		}));
	},

	bindEvent: function() {
		var _this = this;

		$('.sort-item').click(function() {
			var $this = $(this);
			//点击默认排序
			if ($this.data('type') === 'default') {
				// 已经有active样式
				if ($this.hasClass('active')) {
					return;
				}
				// 其他
				else {
					$this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
					_this.data.listParam.orderBy = 'default';
				}
			}
			//点击价格排序
			else if ($this.data('type') === 'price') {
				// active class的处理
				$this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
				if (!$this.hasClass('asc')) {
					$this.addClass('asc').removeClass('desc');
					_this.data.listParam.orderBy = 'price_asc';
				}
				// 升序、降序的处理
				else {
					$this.addClass('desc').removeClass('asc');
					_this.data.listParam.orderBy = 'price_desc';
				}
			};

			_this.loadList();
		})
	}
};

$(function() {
	_list.init();
})