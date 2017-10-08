/*
 * @Author: Administrator
 * @Date:   2017-09-24 23:20:19
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-09-25 17:04:27
 */
'use strict'
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/_mm.js');
var _user = require('service/user-service.js');

var formError = {
	show: function(errMsg) {
		$('.err-item').show().find('.err-msg').text(errMsg);
	},
	hide: function() {
		$('.err-item').hide().find('.err-msg').text('');
	}
};

var passReset = {
	data: {
		username: '',
		question: '',
		answer: '',
		token: ''
	},

	init: function() {
		this.bindEvent();
	},

	bindEvent: function() {
		var _this = this;
		$('#submit-username').click(function(event) {
			var username = $.trim($('#username').val());

			//用户名存在
			if (username) {
				_user.getQuestion(username, function(res) {
					_this.data.username = username;
					_this.data.question = res;
					_this.loadStepQuestion();
				}, function(err) {
					formError.show(err);
				});
			}
			//用户名为空
			else {
				formError.show('请输入用户名');
			}

		});

		$('#submit-question').click(function() {
			var answer = $.trim($('#answer').val());

			//答案存在
			if (answer) {
				_user.checkAnswer({
					username: _this.data.username,
					question: _this.data.question,
					answer: answer
				}, function(res) {
					_this.data.answer = answer;
					_this.data.token = res;
					_this.loadStepPassword();
				}, function(err) {
					formError.show(err);
				});
			}
			//答案为空
			else {
				formError.show('请输入提示问题答案');
			}

		});

		$('#submit-password').click(function() {
			var passwordNew = $.trim($('#password').val());

			//答案存在
			if (passwordNew && passwordNew.length >= 6) {
				_user.resetPassword({
					username: _this.data.username,
					passwordNew: passwordNew,
					forgetToken: _this.data.token
				}, function(res) {
					window.location.href = './result.html?type=pass-reset';
				}, function(err) {
					formError.show(err);
				});
			}
			//答案为空
			else {
				formError.show('请输入不少于6位的新密码');
			}

		});
	},

	loadStepQuestion: function() {
		formError.hide();
		$('.step-username').hide();
		$('.step-question').show().find('.question').text(this.data.question);

	},

	loadStepPassword: function() {
		formError.hide();
		$('.step-question').hide();
		$('.step-password').show();

	},



};

$(function() {
	passReset.init();
});