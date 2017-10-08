/*
 * @Author: Administrator
 * @Date:   2017-09-22 22:26:14
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-09-26 16:04:47
 */

require('./nav-side.css');
var _mm = require('util/_mm.js');
var templateIndex = require('./nav-side.string');

var navSide = {
	option: {
		name: '',
		navList: [{
			name: 'user-center',
			desc: '个人中心',
			href: './user-center.html'
		}, {
			name: 'order-list',
			desc: '我的订单',
			href: './order-list.html'
		}, {
			name: 'pass-update',
			desc: '修改密码',
			href: './user-pass-update.html'
		}, {
			name: 'about',
			desc: '关于MMALL',
			href: './about.html'
		}]
	},

	init: function(option) {
		$.extend(this.option, option);
		this.renderNav();
	},

	renderNav: function() {
		//计算active数据
		for (var i = 0, iLength = this.option.navList.length; i < iLength; i++) {
			if (this.option.navList[i].name === this.option.name) {
				this.option.navList[i].isActive = true;
			}

		};
		var navhtml = _mm.renderHtml(templateIndex, this.option);

		$('.nav-side').html(navhtml);
	},
};



module.exports = navSide;