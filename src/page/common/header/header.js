/*
 * @Author: Administrator
 * @Date:   2017-09-22 00:23:10
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-09-22 22:44:56
 */
require('./header.css');
var _mm = require('util/_mm.js');

var header = {
	init: function() {
		this.bindEvent();
		this.onLoad();
	},

	onLoad: function() {
		var keyword = _mm.getUrlParam('keyword');
		//若keyword存在，则搜索输入框回填
		if (keyword) {
			$('#search-input').val(keyword);
		}
	},

	bindEvent: function() {
		var _this = this;
		// 点击搜索按钮，作搜索提交
		$('#search-btn').click(function() {
			_this.searchSubmit();
		});
		//回车，搜索提交
		$('#search-input').keyup(function(e) {
			if (e.keyCode === 13) {

				_this.searchSubmit();
			}

		});
	},

	//搜索提交
	searchSubmit: function() {
		var keyword = $.trim($('#search-input').val());
		if (keyword) {
			window.location.href = './list.html?keyword=' + keyword;
		} else {
			_mm.goHome();
		}
	}
};

header.init();