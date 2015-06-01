(function($) {
	$.fn.mymodule = function(options) {
		//获得常用变量
		var w_height = $(window).height();
		var M_parameter = {
				allowmove: true,
				c_wrap: "#wrap",
				c_module: ".module",
				c_touchbox: ".touch_div", //滑动触摸层
				loadid: "#loading", //初次打开的加载的DIV
				blur: "blur", //模糊滤镜
				c_btnnext: "#btn_next",
				c_btnpre: "#btn_pre",
				height: w_height,
				zindex: 4,
				m_length: 4,
				overtime: 200,
				m_i: 0 //参数,
			}
			//追加
		$.extend(false, M_parameter, options);

		var Basicfn = { //一些基本的方法库
				fn_style: function() { //起始样式设置
					if (Basicfn.isMoble()) {
						$(M_parameter.c_wrap).css("height", M_parameter.height);
						$(M_parameter.c_module).css("height", M_parameter.height);
					} else {
						$('body').addClass("isPC")
					}
					Basicfn.fn_hide()
				},
				fn_resize: function(h) { //变化传至控制高度
					$(M_parameter.c_wrap).css("height", h);
					$(M_parameter.c_module).css("height", h);
				},
				fn_hide: function() { //初始显示隐藏控制方法
					$(M_parameter.c_module).hide()
					$(M_parameter.c_module).first().show()
				},
				fn_uptop: function(i) { //向上滑动时的 位置控制
					$(M_parameter.c_module).css("top", M_parameter.height)
					$(M_parameter.c_module).eq(i).css("top", 0)
				},
				fn_downtop: function(i) { //向下滑动时的位置控制
					$(M_parameter.c_module).css("top", 0)
					$(M_parameter.c_module).eq(i).css("top", -M_parameter.height)
				},
				fn_zindexadd: function(i) { //z-index 的控制累加 保证需要显示的div 处于最上层
					M_parameter.zindex++
						$(M_parameter.c_module).eq(i).css("z-index", M_parameter.zindex)
				},
				fn_removeload: function() { //监听网页加载完成后 删除等等页面
					$(M_parameter.loadid).remove();
					$(M_parameter.c_module).first().removeClass(M_parameter.blur);
				},
				fn_getindex: function(mythis, ClassName) { //类似JQ  index()效果 滑时获取 当前次序替代zepto 的 index功能的缺陷
					var arr = document.getElementsByClassName(ClassName)
					for (i = 0; i < arr.length; i++) {
						if (mythis == arr[i]) {
							return i
						}
					}
				},
				addlandscape: function() { //判断 如果不是PC 就添加横屏浮层
					if (this.isMoble()) {
						var landscapehtml = '<div id="landscape"><p class="text-center">子曰：竖屏浏览比较好!</p></div>';
						$('body').append(landscapehtml)
					}
				},
				isMoble: function() {
					var sUserAgent = navigator.userAgent.toLowerCase(),
						bIsIpad = sUserAgent.match(/ipad/i) == "ipad",
						bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os",
						bIsMidp = sUserAgent.match(/midp/i) == "midp",
						bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
						bIsUc = sUserAgent.match(/ucweb/i) == "ucweb",
						bIsAndroid = sUserAgent.match(/android/i) == "android",
						bIsCE = sUserAgent.match(/windows ce/i) == "windows ce",
						bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile",
						bIsWebview = sUserAgent.match(/webview/i) == "webview";
					return (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM);
				}
			}
			//滑动处理
		var action_touch = { //向上滑
				m_touchup: function(i) {
					M_parameter.allowmove = false
					var j;
					if (i >= M_parameter.m_length - 1) {
						j = 0
					} else {
						j = i + 1
					}
					M_parameter.m_i = j
					Basicfn.fn_zindexadd(j)
					Basicfn.fn_uptop(i)
//					$(M_parameter.c_module).eq(j).show().addClass('bottom-top-in duration500  timing-linear fill-mode-forwards')
//					setTimeout(function(){
//						$(M_parameter.c_module).eq(i).hide(M_parameter.overtime + 100)
//						M_parameter.allowmove = true
//					},M_parameter.overtime)
					$(M_parameter.c_module).eq(j).show().animate({
						"top": '0px'
					}, M_parameter.overtime, 'linear', function() {
						$(M_parameter.c_module).eq(i).hide(M_parameter.overtime + 100)
						M_parameter.allowmove = true
					})

				},
				m_touchdown: function(i) { //向下滑
					M_parameter.allowmove = false
					var j;
					if (i <= 0) {
						j = M_parameter.m_length - 1
					} else {
						j = i - 1
					}
					M_parameter.m_i = j
					Basicfn.fn_zindexadd(j)
					Basicfn.fn_downtop(j)
					$(M_parameter.c_module).eq(j).show().animate({
						"top": '0px'
					}, M_parameter.overtime, 'linear', function() {
						$(M_parameter.c_module).eq(i).hide();
						M_parameter.allowmove = true;
					})

				}
			}
			//load 处理
		var O_load = {
				loadid: $(M_parameter.loadid), //初次打开的加载的DIV
				fn_removeload: function() {
					this.loadid.remove();
					$(M_parameter.c_module).first().removeClass(M_parameter.blur);
				}
			}
			//阻止默认的滑动效果
		$("body").bind('touchmove', function(e) {
				e.preventDefault()
			})
			//向上滑动处理

		touch.on(M_parameter.c_touchbox, 'swipeup', function() {
			if (M_parameter.allowmove == true) {
				var i = Basicfn.fn_getindex(this, 'touch_div')
				action_touch.m_touchup(i)
			}
		})
		touch.on(M_parameter.c_touchbox, 'swipedown', function() {
				if (M_parameter.allowmove == true) {
					var i = Basicfn.fn_getindex(this, 'touch_div')
					action_touch.m_touchdown(i)
				}
			})
			//tap  btn
		touch.on(M_parameter.c_btnnext, 'tap', function() {
			if (M_parameter.allowmove == true) {
				action_touch.m_touchup(M_parameter.m_i);
			}
		})
		touch.on(M_parameter.c_btnpre, 'tap', function() {
			if (M_parameter.allowmove == true) {
				action_touch.m_touchup(M_parameter.m_i);
			}
		})




		//加载时候执行
		$(document).ready(function() {
				Basicfn.fn_style()
			})
						//浏览器窗体变化
					$(window).resize(function() {
						var h = $(window).height();
						Basicfn.fn_resize(h)
					})
		window.onload = function() {

			O_load.fn_removeload()
		}



	}

}(Zepto))

;
(function($) {
	$.fn.GroupImg = function() {
		var G_parameter = {
			module: 'module',
			G_module: '.module',
			G_btn: '.groupbtn',
			blur: 'blur',
			Group_div: '#Group_div',
			Group_box: '#Group_box',
			Group_img: '.Group_img',
			groupimg: 'Group_img',
			G_i: 0,
			zindex: 4,
			allowmove: true
		}
		var G_imglength = $(G_parameter.Group_img).length;

		var Basicfn = {
			fn_getindex: function(mythis, ClassName) { //类似JQ  index()效果 滑时获取 当前次序替代zepto 的 index功能的缺陷
				var arr = document.getElementsByClassName(ClassName)
				for (i = 0; i < arr.length; i++) {
					if (mythis == arr[i]) {
						return i
					}
				}
			},
			fn_zindexadd: function(i) { //z-index 的控制累加 保证需要显示的div 处于最上层
				G_parameter.zindex++
					$(G_parameter.Group_img).eq(i).css("z-index", G_parameter.zindex)
			},

			starhide: function() {

				var Group_div = $(G_parameter.Group_div)
				var Group_img = $(G_parameter.Group_img);
				Group_div.hide()
				Group_img.hide();
				Group_img.first().show();
				touch.on(G_parameter.G_btn, 'tap', function() {
					Group_div.removeClass('min-fade-out').show()
				})
			},
			fn_blur: function(ac) {
				if (ac == 'add') {
					$(G_parameter.G_module).addClass(G_parameter.blur)
				} else if (ac == 'rm') {
					$(G_parameter.G_module).removeClass(G_parameter.blur)
				}
			},
			fn_start: function() {
				Basicfn.starhide()

			}
		}
		var Touchfn = {
				doubletap_fn: function() {
					$(G_parameter.Group_div).addClass('min-fade-out')
					setTimeout(function() {
						$(G_parameter.Group_div).hide()

					}, 500)
				},

				swipeleft: function(i) {
					G_parameter.allowmove = false
					var j;
					if (i >= G_imglength - 1) {
						j = 0
					} else {
						j = i + 1
					}
					G_parameter.m_i = j
					Basicfn.fn_zindexadd(i)
					$(G_parameter.Group_img).eq(j).show()
					$(G_parameter.Group_img).eq(i).addClass('left_fade_rotateZ-out')
					setTimeout(function() {
						$(G_parameter.Group_img).eq(i).removeClass('left_fade_rotateZ-out')
						$(G_parameter.Group_img).eq(i).hide()
						G_parameter.allowmove = true
					}, 500)
				},
				swiperight: function(i) { //向右侧
					G_parameter.allowmove = false
					var j;
					if (i <= 0) {
						j = G_imglength - 1
					} else {
						j = i - 1
					}
					G_parameter.m_i = j
					Basicfn.fn_zindexadd(i)
					$(G_parameter.Group_img).eq(i).addClass('right_fade_rotateZ-out')
					$(G_parameter.Group_img).eq(j).show()
					setTimeout(function() {
						$(G_parameter.Group_img).eq(i).removeClass('right_fade_rotateZ-out')
						$(G_parameter.Group_img).eq(i).hide()
						G_parameter.allowmove = true
					}, 500)

				}


			}
			//阻止默认的滑动效果
		$("body").bind('touchmove', function(e) {
				e.preventDefault()
			})
			//向上滑动处理
			//			touch.on(G_parameter.Group_box,'doubletap',function(){
			//				Touchfn.doubletap_fn()
			//			})
		touch.on(G_parameter.Group_img, 'swipeleft', function() {
			if (G_parameter.allowmove == true) {
				var i = Basicfn.fn_getindex(this, G_parameter.groupimg)
				Touchfn.swipeleft(i)
			}
		})
		touch.on(G_parameter.Group_img, 'swiperight', function() {
			if (G_parameter.allowmove == true) {
				var i = Basicfn.fn_getindex(this, G_parameter.groupimg)
				Touchfn.swiperight(i)
			}
		})
		touch.on(G_parameter.Group_img, 'doubletap', function() {
			Touchfn.doubletap_fn()
		})
		Basicfn.fn_start()
	}
}(Zepto))