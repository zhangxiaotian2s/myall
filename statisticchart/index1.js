(function($) {
	$.fn.yearTrend = function(arg_year, arg_nubmer) {
		//横向年
		var config_year = {
			year: {
				theyear: 2015,
				startmonth: 1,
				space_x: 80,
				Maxvalue_y: 8000,
				node_y: 1000,
				space_y: 50
			}
		};
		var cfg_language = {
			month: '月',
			Miriade: '万'
		}

		//canvas 量
		var config_ctx = {
			w: 1200,
			h: 600,
			start_x: 80,
			start_y: 550, //高度数值减去要
			styleColor: "#000"
		};
		var arr_year_number1 = [2000, 4000, 5000, 1000, 2222, 5000, 5555, 3333, 4444, 1999, 3033, 4444];
		var arr_year_number2 = [3000, 3300, 6000, 2000, 4222, 2000, 2155, 4333, 1444, 3999, 1033, 5444];
		var arr_style=['#d2777c','#7897f0','#78f0bc','#f0ef78','#c178f0']
		
		var arryear_dot = new Array() //用来存贮位置点坐标
		$.extend(true, config_year, arg_year);
//		$.extend(true, arr_year_number, arg_nubmer);

		var year_base = {
			init: function() {
				var _this = this
				var canvas = document.getElementById('canvas');

				ctx = canvas.getContext('2d');
				_this.Axis_X = new Axis_X();
				_this.Axis_Y = new Axis_Y()
				_this.yeardata = new yearData()
				_this.initlistener(ctx)
			},
			initlistener: function(ctx) {
				this.Axis_X.drawyearlineX(ctx);
				this.Axis_Y.drawyearlineY(ctx)
				this.yeardata.drawDatachart(ctx, arr_year_number1,arr_style[0])
				this.yeardata.drawDatachart(ctx, arr_year_number2,arr_style[1])
			},
			startfn: function() {
				this.init()
			}

		}

		function Axis_X() {
			this.startX = config_ctx.start_x
			this.startY = config_ctx.start_y;
			this.endX = config_ctx.w - config_ctx.start_x;
			this.endY = this.startY;
		}
		Axis_X.prototype.drawyearlineX = function(ctx) {
			if (config_year.year.theyear != null) {
				this.space = config_year.year.space_x;
				this.txt = cfg_language.month;
				ctx.beginPath();
				ctx.moveTo(this.startX, this.startY);
				ctx.lineTo(this.endX, this.endY);
				ctx.stroke();
				for (i = 1; i <= 12; i++) {
					ctx.save();
					ctx.beginPath();
					ctx.lineWidth = 1;
					ctx.moveTo(this.startX + this.space * i, this.startY);
					ctx.lineTo(this.startX + this.space * i, this.startY - 5);
					ctx.font = "16px  verdana"
					ctx.fillText(i + this.txt, this.startX + this.space * i - 10, this.startY + 20); //X轴字体位置修正
					ctx.stroke();
					ctx.restore();
				}
			}
		}

		function Axis_Y() {
			this.startX = config_ctx.start_x;
			this.startY = config_ctx.start_y;
			this.endX = this.startX;
			this.endY = config_ctx.h - config_ctx.start_y
		}
		Axis_Y.prototype.drawyearlineY = function(ctx) {
			if (config_year.year.theyear != null) {
				this.txt = cfg_language.Miriade;
				this.space = config_year.year.space_y
				this.node_y = config_year.year.node_y
				this.Max_length = Math.floor(config_year.year.Maxvalue_y / config_year.year.node_y) + 1
				ctx.beginPath();
				ctx.moveTo(this.startX, this.startY);
				ctx.lineTo(this.endX, this.endY);
				ctx.stroke();
				ctx.closePath();
				for (i = 1; i <= this.Max_length; i++) {
					ctx.save()
					ctx.beginPath()
					ctx.lineWidth = 1;
					ctx.moveTo(this.startX, this.startY - this.space * i)
					ctx.lineTo(this.startX + 5, this.startY - this.space * i)
					ctx.font = "10px  verdana"
					ctx.textAlign = 'right'
					ctx.fillText(this.node_y * i + this.txt, this.startX - 10, this.startY - this.space * i + 5); //X轴字体位置修正
					ctx.stroke()
					ctx.closePath()
					ctx.restore()
				}
			}
		}

		function yearData() {
			this.space = config_year.year.space_x;
			this.start_x = config_ctx.start_x;
			this.start_y = config_ctx.start_y;
		}
		yearData.prototype.drawDatachart = function(ctx, arrdata, color) {
			this.data = arrdata;
			this.datalength = this.data.length;
			this.Proportion_y = config_year.year.node_y / config_year.year.space_y
			this.space_x = config_year.year.space_x
			this.drawDataline(ctx, arrdata, color)
			this.drawDataarc(ctx, arrdata, color)
			
		}

		yearData.prototype.drawDataline = function(ctx, arrdata, color) {
			ctx.beginPath()
			ctx.moveTo(this.start_x, this.start_y)
			ctx.strokeStyle = color
			for (i = 1; i <= this.datalength; i++) {
				var the_value = this.data[i - 1]
				if (typeof the_value == 'number') {
					var X_dot = this.start_x + this.space_x * i,
						Y_dot = this.start_y - the_value / this.Proportion_y
					ctx.lineTo(X_dot, Y_dot)
				}
			}
			ctx.stroke()
			ctx.closePath()
		}
		yearData.prototype.drawDataarc=function(ctx, arrdata, color){
			for (i = 1; i <= this.datalength; i++) {
				ctx.beginPath()
				ctx.fillStyle =color
				var the_value = this.data[i - 1]
				if (typeof the_value == 'number') {
					var X_dot = this.start_x + this.space_x * i,
						Y_dot = this.start_y - the_value / this.Proportion_y
					ctx.arc(X_dot, Y_dot, 4, 0, 360, false)
					ctx.fill()
					ctx.stroke()
					ctx.closePath()
				}
			}
		}
		
		window.onload = function() {
			year_base.startfn()
		}




	}
})(jQuery)