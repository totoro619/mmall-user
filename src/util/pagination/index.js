/*
 * @Author: Administrator
 * @Date:   2017-09-28 22:54:06
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-09-29 00:30:47
 */
require('./index.css');
var templatePagination = require('./index.string');
var _mm = require('util/_mm.js');

var Pagination = function() {
	var _this = this;
	this.defaultOption = {
		container: null,
		pageNum: 1,
		pageRange: 4,
		onSelectPage: null
	};

	$(document).on('click', '.pg-item', function() {
		var $this = $(this);
		if ($this.hasClass('active') || $this.hasClass('disabled')) {
			return;
		}

		typeof _this.option.onSelectPage === 'function' ? _this.option.onSelectPage($this.data('value')) : null;
	})
};

Pagination.prototype.render = function(userOption) {
	//合并选项
	this.option = $.extend({}, this.defaultOption, userOption);
	//判断容器是否为合法的jquery对象
	if (!(this.option.container instanceof jQuery)) {
		return;
	}
	// // 判断是否只有一页
	if (this.option.pages <= 1) {
		return;
	}
	// 渲染分页内容
	this.option.container.html(this.getPaginationHtml());
};

//获取分页的html, |上一页| 1 2 3 4 =5= 6 |下一页|  5/6
Pagination.prototype.getPaginationHtml = function() {
	var html = '',
		pageArray = [],
		start = this.option.pageNum - this.option.pageRange > 0 ? this.option.pageNum - this.option.pageRange : 1,
		end = this.option.pageNum + this.option.pageRange < this.option.pages ? this.option.pageNum + this.option.pageRange : this.option.pages;

	//上一页按钮的数据
	pageArray.push({
		name: '上一页',
		value: this.option.prePage,
		disabled: !(this.option.hasPreviousPage)
	});

	// 数字按钮的处理
	for (var i = start; i <= end; i++) {
		pageArray.push({
			name: i,
			value: i,
			active: (i === this.option.pageNum)
		});
	};

	//下一页按钮的数据
	pageArray.push({
		name: '下一页',
		value: this.option.nextPage,
		disabled: !(this.option.hasNextPage)
	});

	html = _mm.renderHtml(templatePagination, {
		pageArray: pageArray,
		pageNum: this.option.pageNum,
		pages: this.option.pages
	});

	return html;
};

module.exports = Pagination;