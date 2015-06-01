(function($) {
	$.fn.PageTab = function(options) {
		var confing = {
				pageIndex: 1,
				nowIndex: null,
				ovartime: 500,
				allpage:'.page',
				page: '.page_',
				loading: '#loading',
				btn_next:'#btn_next',
				landscape:'<div id="landscape"><p>子曰：竖屏浏览比较好</p></div>',
				ismove: true,
				upstyle: {
					now: 'from-top-out',
					next: 'from-bottom-in'
				},
				downstyle:{
					now:'from-bottom-out',
					next:'from-top-in'
				},
				downclass: {
					now: '',
					next: ''
				},
				swipe: {
					up: 1,
					down: 2,
					left: 3,
					right: 4
				}
			}
			//重覆盖cofing
		$.extend(true, confing, options);
		//获得page 长度
		var pagelength = $(confing.allpage).length;

		var basefn = {
			loading: function() {
				$(confing.loading).remove()
			},
			isMoble: function() { //判断是不是moble
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
			},
			startfn: function() {
				if (this.isMoble()) {
					$('body').removeClass('isPC').append(confing.landscape)
					$('#wrap').removeClass('relative')
					
				}
			}
		}
		var touchmovefn = {
			swipeupfn: function() {
				if (confing.ismove) {
					confing.nowIndex=confing.pageIndex
					confing.pageIndex += 1;
					if (confing.pageIndex > pagelength) {
						confing.pageIndex = 1
					}
					console.log(confing.pageIndex)
//					touchmovefn.setlastindex(confing.swipe.up)
					touchmovefn.swipetabfn(confing.swipe.up)
				}
			},
			swipedownfn: function() {
				if (confing.ismove) {
					confing.nowIndex=confing.pageIndex
					confing.pageIndex--;
					if (confing.pageIndex < 1) {
						confing.pageIndex = pagelength
					}
//					touchmovefn.setlastindex(confing.swipe.down)
					touchmovefn.swipetabfn(confing.swipe.down)
				}
			},
//			setlastindex: function(direction) {
//				if (direction == 1) {
//					if (confing.pageIndex == pagelength) {
//						confing.nowIndex = 1;
//					} else {
//						confing.lastIndex = confing.pageIndex + 1;
//					}
//				} else if (direction == 2) {
//					if (confing.pageIndex == 1) {
//						confing.lastIndex = pagelength
//					} else {
//						confing.lastIndex = confing.pageIndex - 1;
//					}
//				}
//			},
			swipetabfn: function(direction) {
				confing.ismove = false
				var lastClass, nowClass;
				var nowpage = $(confing.page + confing.nowIndex),
					lastpage = $(confing.page + confing.pageIndex);

				switch (direction) {
					case 1:
						lastClass = confing.upstyle.next;
						nowClass = confing.upstyle.now;
						break;
					case 2:
						lastClass = confing.downstyle.next;
						nowClass = confing.downstyle.now;
						break;
				}
				lastpage.removeClass('hide')
				lastpage.addClass(lastClass);
//				nowpage.children("*").addClass("addhide")
				nowpage.addClass(nowClass);
				setTimeout(function() {
					nowpage.removeClass(nowClass);
					nowpage.addClass('hide')
//					nowpage.children("*").removeClass("addhide")
				    nowpage.removeClass('pagenow')
				    lastpage.removeClass(lastClass)
				    lastpage.addClass('pagenow')
					confing.ismove = true
				}, confing.ovartime)
			}

		}






		//阻止默认的touchmove
		document.addEventListener('touchmove', function(event) {
			event.preventDefault()
		}, false)



		touch.on('body', 'swipeup', function() {
			touchmovefn.swipeupfn()
		})
		
		
		touch.on('body', 'swipedown', function() {
			touchmovefn.swipedownfn()
		})
		
		touch.on(confing.btn_next,'tap',function(){
			touchmovefn.swipeupfn()
		})





		//加载完删除loading
		window.onload = function() {
				basefn.loading()
			}
			//开始时执行
		$(document).ready(function(){
		basefn.startfn()
		})



	}
})(Zepto)