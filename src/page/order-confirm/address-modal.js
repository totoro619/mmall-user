/*
 * @Author: Administrator
 * @Date:   2017-10-04 22:23:20
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-10-06 22:58:21
 */
var _mm = require('util/_mm.js');
var _address = require('service/address-service.js');
var _cities = require('util/cities/index.js');
var templateIndex = require('./address-modal.string');

var addressModal = {
	show: function(option) {
		//option的绑定
		this.option = option;
		this.option.data = option.data || {};
		this.$modalWrap = $('.modal-wrap');
		// 渲染页面
		this.loadModal();
		// 绑定事件
		this.bindEvent();
	},

	bindEvent: function() {
		var _this = this;
		//省份和城市的二级联动
		this.$modalWrap.find('#receiver-province').change(function() {
			var selectedProvince = $(this).val();
			_this.loadCities(selectedProvince);
		});

		// 提交收货地址
		this.$modalWrap.find('.address-btn').click(function() {
			var receiverInfo = _this.getReceiverInfo(),
				isUpdate = _this.option.isUpdate;
			// 使用新地址，且验证通过
			if (!isUpdate && receiverInfo.status) {
				_address.addAddress(receiverInfo.data, function(res) {
					_mm.successTip('新建地址成功');
					_this.hide();
					if (typeof _this.option.onSuccess === 'function') {
						_this.option.onSuccess(res);
					}
				}, function(errMsg) {
					_mm.errorTip(errMsg);
				});
			}
			//更新地址，且验证通过
			else if (isUpdate && receiverInfo.status) {
				_address.updateAddress(receiverInfo.data, function(res) {
					_mm.successTip('地址更新成功');
					_this.hide();
					if (typeof _this.option.onSuccess === 'function') {
						_this.option.onSuccess(res);
					}
				}, function(errMsg) {
					_mm.errorTip(errMsg);
				});
			}
			//验证不通过
			else {
				_mm.errorTip(receiverInfo.errMsg || '哪里不对了~')
			}

		});

		//点击modal-container区域，不关闭弹窗，阻止事件冒泡
		this.$modalWrap.find('.modal-container').click(function(event) {
			event.stopPropagation();
		});

		//点击叉或遮罩层，关闭弹窗
		this.$modalWrap.find('.close').click(function() {
			_this.hide();
		});
	},

	//获取表单中收件人信息，并作验证
	getReceiverInfo: function() {
		var receiverInfo = {},
			result = {
				status: false
			};

		receiverInfo.receiverName = $.trim(this.$modalWrap.find('#receiver-name').val());
		receiverInfo.receiverProvince = this.$modalWrap.find('#receiver-province').val();
		receiverInfo.receiverCity = this.$modalWrap.find('#receiver-city').val();
		receiverInfo.receiverAddress = $.trim(this.$modalWrap.find('#receiver-address').val());
		receiverInfo.receiverMobile = $.trim(this.$modalWrap.find('#receiver-mobile').val());
		receiverInfo.receiverZip = $.trim(this.$modalWrap.find('#receiver-zip').val());

		if (this.option.isUpdate) {
			receiverInfo.id = this.$modalWrap.find('#receiver-id').val();
		}

		if (!receiverInfo.receiverName) {
			result.errMsg = '请输入收件人姓名';
		} else if (!receiverInfo.receiverProvince) {
			result.errMsg = '请选择收件人所在省份';
		} else if (!receiverInfo.receiverCity) {
			result.errMsg = '请选择收件人所在城市';
		} else if (!receiverInfo.receiverAddress) {
			result.errMsg = '请输入收件人的详细地址';
		} else if (!receiverInfo.receiverMobile) {
			result.errMsg = '请输入收件人的联系方式';
		}
		//所有验证都通过了
		else {
			result.status = true;
			result.data = receiverInfo;
		}

		return result;
	},

	loadModal: function() {
		var templateModal = _mm.renderHtml(templateIndex, {
			isUpdate: this.option.isUpdate,
			data: this.option.data
		});
		this.$modalWrap.html(templateModal);
		//加载省份信息
		this.loadProvice();
	},

	//加载省份信息
	loadProvice: function() {
		var provinces = _cities.getProvince() || [],
			$provinceSelect = this.$modalWrap.find('#receiver-province');
		$provinceSelect.html(this.getSelectOptin(provinces));

		//如果更新地址，且有省份信息，做省份信息的回填
		if (this.option.isUpdate && this.option.data.receiverProvince) {
			$provinceSelect.val(this.option.data.receiverProvince);
			this.loadCities(this.option.data.receiverProvince)
		}
	},

	loadCities: function(provinceName) {
		var cities = _cities.getCities(provinceName) || [],
			$citySelect = this.$modalWrap.find('#receiver-city');
		$citySelect.html(this.getSelectOptin(cities));

		//如果更新地址，且有城市信息，做城市信息的回填
		if (this.option.isUpdate && this.option.data.receiverCity) {
			$citySelect.val(this.option.data.receiverCity);
		}
	},

	//获取select选项，输入：array，输出：HTML
	getSelectOptin: function(optionArray) {
		var html = '<option value="">请选择</option>';
		for (var i = 0, length = optionArray.length; i < length; i++) {
			html += '<option value="' + optionArray[i] + '">' + optionArray[i] + '</option>';
		}

		return html;
	},

	// 关闭弹窗
	hide: function() {
		this.$modalWrap.empty();
	}
};

module.exports = addressModal;