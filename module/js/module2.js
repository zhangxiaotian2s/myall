(function($) {
	$.fn.mymodule = function(options, ArrClass) {
		var Option = {
				allowmove: true,
				wrap: $("#wrap"),
				m_box: $(".module"),
				touch_box: ".touch_div", //滑动触摸层
				m_length: $(".module").length,
				overtime: 200,
				m_i: 0,
				z_value: $(".module").length,
				height: $(window).height(),
				loadid: $("#loading"), //初次打开的加载的DIV
				blur: "blur", //模糊滤镜
				m_style: function() { //起始设置
					var _this = this;
					_this.wrap.css("height", _this.height);
					_this.m_box.css("height", _this.height);
				},
				m_resize: function(h) { //变化传至控制高度
					var _this = this;
					_this.wrap.css("height", h);
					_this.m_box.css("height", h);
				},

				m_zindex: function(i, zero) {
					if (zero != 0) {
						var _this = this
						Option.m_box.css("z-index", 0)
					} else {
						var _this = this
						_this.z_value++
							Option.m_box.eq(i).css("z-index", _this.z_value)
					}
				}

			}
			//追加
		$.extend(false, Option, options);

		//滑动处理
		var action_touch = { //向上滑
				m_touchup: function(i) {
					Option.allowmove = false
					var j;
					if (i >= Option.m_length - 1) {
						j = Option.m_length - 1
					} else {
						j = i + 1
					}
					if (Option.m_i != j) {
						removeClass_ac(arr_addClass, Option.m_i)
					}
					Option.m_i = j
					var offsertop = Option.m_box.eq(j).height();
					$("#nr").animate({
						"top": -offsertop * j
					}, 500)
					addClass_ac(arr_addClass, Option.m_i)
					Option.allowmove = true
				},
				m_touchdown: function(i) { //向下滑
					Option.allowmove = false
					var j;
					if (i <= 0) {
						j = 0
					} else {
						j = i - 1
					}
					if (Option.m_i != j) {
						removeClass_ac(arr_addClass, Option.m_i)
					}
					Option.m_i = j
					var offsertop = Option.m_box.eq(j).height();
					$("#nr").animate({
						"top": -offsertop * j
					}, 500)
					addClass_ac(arr_addClass, Option.m_i)
					Option.allowmove = true

				}
			}
			//load 处理
		var O_load = {
			loadid: $("#loading"), //初次打开的加载的DIV
			blur: "blur", //模糊滤镜
			remove_load: function() {
				this.loadid.remove();
				Option.m_box.first().removeClass(this.blur);
			}
		}


		//
		//class 与 样式 
		var arr_addClass = [
			[
				[],
				[]
			]
		]


		$.extend(true, arr_addClass, ArrClass); //覆盖追加
		//添加css3样式效果
		function addClass_ac(arr, i) {
			var arr_length = arr[i][0].length;
			for (a = 0; a < arr_length; a++) {
				$(arr[i][0][a]).addClass(arr[i][1][a])
			}
		}

		function removeClass_ac(arr, i) {
			var arr_length = arr[i][0].length;
			for (a = 0; a < arr_length; a++) {
				$(arr[i][0][a]).removeClass(arr[i][1][a])
			}
		}

		//阻止默认的滑动效果
		$("body").bind('touchmove', function(e) {
				e.preventDefault()
			})
			//向上滑动处理
		touch.on(Option.touch_box, 'swipeup', function() {
				if (Option.allowmove == true) {
					var i = $(this).index(Option.touch_box);
					action_touch.m_touchup(i)
				}
			})
			//向下滑动处理
		touch.on(Option.touch_box, 'swipedown', function() {
				if (Option.allowmove == true) {
					var i = $(this).index(Option.touch_box);
					action_touch.m_touchdown(i)
				}
			})
			//click  btn
		$("#btn_next").click(function() {
			if (Option.allowmove == true) {
				action_touch.m_touchup(Option.m_i);
			}
		})

		$("#btn_pre").click(function() {
				if (Option.allowmove == true) {
					action_touch.m_touchdown(Option.m_i);
				}
			})
			//加载时候执行
		$(document).ready(function() {
				Option.m_style()
			})
			//浏览器窗体变化
		$(window).resize(function() {
			var h = $(window).height();
			Option.m_resize(h)
		})
		window.onload = function() {
			O_load.remove_load()
		}

	}

}(jQuery))