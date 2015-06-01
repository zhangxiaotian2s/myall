(function($) {

	$.fn.Crazybrother = function() {
		//设置基本元素
		var time = Math.round(1000 / 60)
		var Basicelement = {
				ctx: '#canvas',
				roadsrc: 'images/road.jpg',
				bikesrc: 'images/car.png',
				w: 1000,
				h: 536,
				roadwidth: 1183,
				roadheight: 536,
				bikewidth: 90,
				bikeheight: 68,
				bikeX: 100,
				bikeY: 200,
				bgDistance: 0,
				speed: 2,
				eatnumber:0,
				arrGold: [],
				overtime: time,
				timer: null,
				eventType: {
					start: 'touchstart',
					move: 'touchmove',
					end: 'touchend'
				},
			}
			//基本方法
		var BasiceFn = {
			startFn: function() {
				var _this = this;
				_this.init();
			},
			//初始化
			init: function() {
				var _this = this
				var canvas = document.querySelector(Basicelement.ctx);
				ctx = canvas.getContext('2d');

				var road = new Image();
				_this.road = road;
				road.src = Basicelement.roadsrc;
				road.onload = function() {
					ctx.drawImage(road, 0, 0, Basicelement.roadwidth, Basicelement.roadheight)
				}

				var bike = new Image();
				bike.src = Basicelement.bikesrc;
				bike.onload = function() {
					ctx.drawImage(bike, 100, 300, Basicelement.bikewidth, Basicelement.bikeheight)
				}
				_this.bike = new Bike(ctx)
				_this.initLinster(ctx)
			},
			initLinster: function(ctx) {
				var _this = this
				var body = $(document.body);
				var move = false;
				body.on(Basicelement.eventType.start, Basicelement.ctx, function(e) {
					move = true;
					_this.bike.setPosition(e)
					_this.run(ctx)
				}).on(Basicelement.eventType.move, Basicelement.ctx, function(e) {
					if (move == true) {
						_this.bike.setPosition(e)
					}
				}).on(Basicelement.eventType.end, Basicelement.ctx, function(e) {
					move = false
				})
			},
			creatGold: function(ctx) {
				var _this = this
				var creatRate = 100;
				var random = Math.random();
				if (random * creatRate > creatRate - 1) {
					var id = Basicelement.arrGold.length;
					var top = Math.floor((Math.random() * 4)) * 50 + 300;
					var type = Math.round(Math.random());
					//					var type = Math.floor(top) % 2 == 0 ? 0 : 1;
					var gold = new Gold(type, top, id);
					Basicelement.arrGold.push(gold)
				}
			},
			clearRectFn: function(ctx) {
				ctx.clearRect(0, 0, Basicelement.w, Basicelement.h)
			},
			run: function(ctx) {
				var _this = this;
				_this.tiemr;
				clearInterval(_this.timer)
				_this.timer = setInterval(function() {
					_this.runbg(ctx);
					_this.bike.drawBike();
					_this.creatGold(ctx)
					_this.bike.eatGold(Basicelement.arrGold)
					for (i = Basicelement.arrGold.length - 1; i >= 0; i--) {
						var gold = Basicelement.arrGold[i];
						if (gold) {
							gold.move(ctx);
						}
					}
				}, Basicelement.overtime)
			},

			runbg: function(ctx) {
				var _this = this;
				if (Basicelement.bgDistance >= Basicelement.roadwidth) {
					Basicelement.bgDistance = 0
				}
				Basicelement.bgDistance += Basicelement.speed
				ctx.drawImage(_this.road, -Basicelement.bgDistance, 0, Basicelement.roadwidth, Basicelement.roadheight)
				ctx.drawImage(_this.road, (Basicelement.roadwidth - Basicelement.bgDistance), 0, Basicelement.roadwidth, Basicelement.roadheight)
			},
			isMobile: function() {
				var sUserAgent = navigator.userAgent.toLowerCase(),
					bIsIpad = sUserAgent.match(/ipad/i) == "ipad",
					bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os",
					bIsMidp = sUserAgent.match(/midp/i) == "midp",
					bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
					bIsUc = sUserAgent.match(/ucbrowser/i) == "ucbrowser",
					bIsAndroid = sUserAgent.match(/android/i) == "android",
					bIsCE = sUserAgent.match(/windows ce/i) == "windows ce",
					bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile",
					bIsWebview = sUserAgent.match(/webview/i) == "webview";
				return (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM);
			}
		}

		function Bike(ctx) {
			var bike = new Image()
			bike.src = Basicelement.bikesrc;
			this.drawBike = function() {
				ctx.drawImage(bike, Basicelement.bikeX, Basicelement.bikeY, Basicelement.bikewidth, Basicelement.bikeheight)
			}
			this.setPosition = function(e) {
				var Tx = e.offsetX - Basicelement.bikewidth / 2;
				var Ty = e.offsetY - Basicelement.bikeheight / 2;
				if (Tx < 0) {
					Tx = 0;
				} else if (Tx >= Basicelement.roadwidth - Basicelement.bikewidth * 2) {
					Tx = Basicelement.roadwidth - Basicelement.bikewidth * 2
				}
				if (Ty < 235) {
					Ty = 235
				} else if (Ty > 423) {
					Ty = 423
				}
				Basicelement.bikeX = Tx;
				Basicelement.bikeY = Ty;
				this.drawBike()
			}
			this.eatGold = function(arrGold) {
				for (i = 0; i < arrGold.length; i++) {
					var g = arrGold[i];
					if (Math.abs(Basicelement.bikeY - g.top + 19) < 40 && Math.abs(Basicelement.bikeX - g.Px + 19) < 64) {
						if(g.type==0){
							alert("草这是屎")
						}
						arrGold.splice($.inArray(g, arrGold), 1)
					}
				}
			}
		}

		if (!BasiceFn.isMobile()) {
			Basicelement.eventType.start = 'mousedown';
			Basicelement.eventType.move = 'mousemove';
			Basicelement.eventType.end = 'mouseup';
		}

		function Gold(type, top, id) {
			this.type = type;
			this.id = id;
			this.top = top;
			this.width = 38;
			this.height = 38;
			this.top = top;
			this.left = 800;
			var p = this.type == 0 ? 'images/food1.png' : 'images/food2.png';
			this.pic = new Image()
			this.pic.src = p;
			this.speed = 2
			this.lx = Basicelement.w
		}
		
		Gold.prototype.paint = function(ctx) {
			ctx.drawImage(this.pic, this.left, this.top, this.width, this.height)
		}
		
		Gold.prototype.move = function(ctx) {
			this.speed += 2
			this.Px = this.lx - this.speed
			ctx.drawImage(this.pic, this.Px, this.top, this.width, this.height)
		}
		BasiceFn.startFn()
	}



}(jQuery))