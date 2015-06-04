(function($) {
	$.fn.Cartogram = function(type, cfg, arr_data) {
		//	 统计图类型配置部分 类型确定部分
		//类型一：以个人单日业绩为数据的单月线性走势图
		var C_type = type;
		//统计图基本信息配置部分
		var cfg_base = {
			w: 1100,
			h: 500,
			origin: { //起始点设置
				x: 100,
				y: 550,
				end_x: 1150,
				end_y: 50
			},
			space: { //间距单位尺寸
				x: 80,
				y: 40
			},
			datanode: { //月份
				node_y: 200000,
				number_y: 11,
				max_y: 3000000,
				unit_y: '元',
				node_x: 1,
				number_x: 12, //3月
				unit_x: '月'
			},
			isshowdata: true

		}
		$.extend(false, cfg_base, cfg);
		//  数据设置部分
		//小组年度数据
		var team_year_jsondata = [{
			id: '',
			data_time: '',
			team_name: '',
			data: []
		}]
		$.extend(true, team_year_jsondata, arr_data);
		console.log(team_year_jsondata[0].data[2].value)
		var team_year_jsondata_fn = {
			get_one_team_month_data: function(team_year_jsondata, index) {
				var this_data = team_year_jsondata[index - 1].data;
				var length = this_data.length;
				var this_arrdata = [];
				for (i = 0; i < length; i++) {
					this_arrdata.push(this_data[i].value)
				}
				return this_arrdata;
			},

		}


		var arrdata = team_year_jsondata_fn.get_one_team_month_data(team_year_jsondata, 3) //获取团队年份每月的数组
		//		var arrdata = team_year_jsondata[0].data_arr
		//var arrdata2 = [2000, 3000, 4000, 2222, 33000, 1384, 9999, 3322, 4432, 55312, 1232, 44523, 73342, 0, 3334, 0, 34235, 1234, 43423, 3323, 45231, 15555, 32334, 12232, 643, 6534, 6933, 2384, 30945, 29312]
		//		$.extend(true, arrdata, arr_data);
		var single_data_line = {
				init: function() {
					_this = this;
					canvas = document.getElementById('canvas');
					ctx = canvas.getContext('2d');
					_this.single_data_linetype = new single_data_linetype();
					_this.initlistener(ctx);
				},
				initlistener: function(ctx) {
					this.single_data_linetype.drawstart(ctx, arrdata, '#104eb5');
					this.single_data_linetype.mouseovershow(ctx, arrdata, '#104eb5');
				},
				startfn: function() {
					this.init()
				}
			}
			//个人单月横轴fn

		function single_data_linetype() {
			this.start_X = cfg_base.origin.x;
			this.start_Y = cfg_base.origin.y;
			this.end_X = cfg_base.origin.end_x;
			this.end_Y = cfg_base.origin.end_y;
			this.space_x = cfg_base.space.x;
			this.node_x = cfg_base.datanode.node_x;
			this.number_x = cfg_base.datanode.number_x;
			this.space_y = cfg_base.space.y;
			this.node_y = cfg_base.datanode.node_y;
			this.number_y = cfg_base.datanode.number_y;
			this.max_y = cfg_base.datanode.max_y;
			this.unit_x = cfg_base.datanode.unit_x;
			this.unit_y = cfg_base.datanode.unit_y;
			this.isshowdata = cfg_base.isshowdata;
		}
		single_data_linetype.prototype.drawlineX = function(ctx) {
			//画X轴横线
			ctx.save();
			ctx.beginPath();
			ctx.lineWidth = 1;
			ctx.strokeStyle = '#000'
			ctx.moveTo(this.start_X, this.start_Y);
			ctx.lineTo(this.end_X, this.start_Y);
			ctx.stroke();
			ctx.closePath();
			ctx.restore();
			//画分割点
			for (i = 1; i <= this.number_x; i++) {
				var i_x = this.start_X + this.space_x * i;
				ctx.save()
				''
				ctx.beginPath();
				ctx.strokeStyle = '#000';
				ctx.fillStyle = '#000';
				ctx.font = "10px  verdana";
				ctx.textAlign = 'center';
				ctx.lineWidth = 2;
				ctx.moveTo(i_x, this.start_Y - 6);
				ctx.lineTo(i_x, this.start_Y);
				ctx.fillText(i + this.unit_x, i_x, this.start_Y + 20)
				ctx.stroke();
				ctx.closePath();
				ctx.restore();
			}
		}
		single_data_linetype.prototype.drawlineY = function(ctx) {
			//画Y轴竖线
			ctx.save()
			ctx.beginPath()
			ctx.lineWidth = 1;
			ctx.strokeStyle = '#000'
			ctx.moveTo(this.start_X, this.start_Y);
			ctx.lineTo(this.start_X, this.end_Y);
			ctx.stroke()
			ctx.closePath();
			ctx.restore()
				//画分割点
			for (i = 1; i <= this.number_y; i++) {
				var i_y = this.start_Y - this.space_y * i;
				ctx.save()
				ctx.beginPath();
				ctx.lineWidth = 2;
				ctx.strokeStyle = '#000';
				ctx.fillStyle = '#000'
				ctx.font = "10px  verdana"
				ctx.textAlign = 'right'
				if (i == this.number_y) {
					ctx.moveTo(this.start_X + 5, i_y - this.space_y);
					ctx.lineTo(this.start_X, i_y - this.space_y);
					ctx.fillText(this.max_y + '元', this.start_X - 5, i_y - this.space_y + 5)
				} else {
					ctx.moveTo(this.start_X + 5, i_y);
					ctx.lineTo(this.start_X, i_y);
					ctx.fillText(this.node_y * i + '元', this.start_X - 5, i_y + 5)
				}
				ctx.stroke();
				ctx.closePath();
				ctx.restore()
			}
			//画 常见的最高高度的 X轴向标尺线
			ctx.save()
			ctx.beginPath()
			ctx.strokeStyle = "#cecece"
			ctx.lineWidth = 1
			ctx.moveTo(this.start_X + 5, this.start_Y - this.space_y * (this.number_y - 1));
			ctx.lineTo(this.end_X, this.start_Y - this.space_y * (this.number_y - 1))
			ctx.stroke()
			ctx.closePath()
			ctx.restore()
		}
		single_data_linetype.prototype.mainline = function(ctx, data, colorstyle) {
			this.arr_data = data;

			this.arr_dot = new Array()
			var datalength = this.arr_data.length;
			var Y_max_next = this.space_y * (this.number_y - 1) //仅次于最高值的那个 也就是 纵向从下往上的倒数第二个
			var Y_max_value = this.node_y * (this.number_y - 1);
			this.Proportion_y = this.space_y / this.node_y
			this.Max_Proportion_y = (this.space_y * 2) / (this.max_y - Y_max_value).toFixed(5)
				//开始画走势线
			ctx.beginPath()
			ctx.moveTo(this.start_X, this.start_Y)
			ctx.strokeStyle = colorstyle
			ctx.strokeWidth = 0.1
			for (i = 1; i <= datalength; i++) {
				var the_value = this.arr_data[i - 1]
				if (typeof the_value != 'number') { //如果其中出现不为nuber的值 就让它等于0
					the_value = 0
				}
				var X_dot = this.start_X + this.space_x * i;
				if (the_value >= Y_max_value) {
					var Y_dot = this.start_Y - Y_max_next - (the_value - Y_max_value) * this.Max_Proportion_y
				} else {
					var Y_dot = this.start_Y - the_value * this.Proportion_y
				}
				ctx.lineTo(X_dot, Y_dot)
				var thearr = [X_dot, Y_dot, the_value]
				this.arr_dot.push(thearr) //把 X Y 坐标点 和 数值存入 this.arr_dot
			}
			ctx.stroke()
			ctx.closePath()
				//				开始画圆点  判断是否写数字
			var dot_length = this.arr_dot.length
			ctx.save()
			for (i = 0; i < dot_length; i++) {

				ctx.beginPath()
				ctx.textAlign = 'center'
				ctx.font = '12px  verdana '
				ctx.fillStyle = colorstyle
				ctx.arc(this.arr_dot[i][0], this.arr_dot[i][1], 2, 0, 360)
				if (this.isshowdata) {
					ctx.fillText(this.arr_dot[i][2] + this.unit_y, this.arr_dot[i][0], this.arr_dot[i][1] - 20)
				}
				ctx.fill()
				ctx.closePath()
			}
			ctx.restore()
		}
		single_data_linetype.prototype.mouseovershow = function(ctx, data, colorstyle) {
				var _this = this;
				$canvas = $('#canvas');
				var offsetX = $canvas.offset().left,
					offsetY = $canvas.offset().top,
					arr_length = _this.arr_dot.length;
				$canvas.mousemove(function(e) {
					var M_x = e.pageX - offsetX,
						M_Y = e.pageY - offsetY;
					if (M_x > _this.start_X && M_x < _this.end_X) {
						var i = Math.floor((M_x - _this.space_x / 2 - _this.start_X) / _this.space_x)
						if (i < arr_length) {
							_this.drawstart(ctx, data, colorstyle)
							ctx.save()
							ctx.beginPath()
							ctx.fillStyle = colorstyle;
							ctx.font = '16px  verdana '
							ctx.textAlign = 'center'
							ctx.strokeStyle = '#c3c3c3'
							if (!_this.isshowdata) {
								ctx.fillText(_this.arr_dot[i][2] + _this.unit_y, _this.arr_dot[i][0], _this.arr_dot[i][1] - 20)
							}
							ctx.moveTo(_this.arr_dot[i][0], _this.start_Y)
							ctx.lineTo(_this.arr_dot[i][0], _this.end_Y)
							ctx.stroke()
							ctx.closePath()
							ctx.restore()
						}
					}
				})
			}
			//数据信息处理解析

		function single_team_year_data_ac(team_year_jsondata) {
        

		}





		single_data_linetype.prototype.drawstart = function(ctx, data, colorstyle) {
			ctx.clearRect(0, 0, 1200, 800);
			this.drawlineX(ctx);
			this.drawlineY(ctx);
			this.mainline(ctx, data, colorstyle)
		}

		single_data_line.startfn() //开始执行
	}
})(jQuery)