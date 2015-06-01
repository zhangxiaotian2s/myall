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
				x: 33,
				y: 40
			},
			datanode: { //月份
				node_y: 5000,
				number_y: 11,
				max_y: 100000,
				unit_y: '元',
				node_x: 1,
				number_x: 31 //31天
			}

		}
		$.extend(true, cfg_base, cfg);
		//  数据设置部分
		var arrdata = [2000, 3000, 4000, 0, 1000, 5384, 19999, 3332, 44332, 5532, 12232, 44523, 73342, 0, 0, 0, 345, 11234, 4232, 43323, 4521, 5555, 42334, 1232, 5643, 6534, 69323, 50384, 30945, 29312]
		$.extend(true, arrdata, arr_data);

		var month_person = {
				init: function() {
					_this = this;
					canvas = document.getElementById('canvas');
					ctx = canvas.getContext('2d');
					_this.month_person_fn = new month_person_fn()
					_this.initlistener(ctx)
				},
				initlistener: function(ctx) {
					this.month_person_fn.drawlineX(ctx)
					this.month_person_fn.drawlineY(ctx)
					this.month_person_fn.mainline(ctx, arrdata, '#000')
				},
				startfn: function() {
					this.init()
				}
			}
			//个人单月横轴fn

		function month_person_fn() {
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
		}
		month_person_fn.prototype.drawlineX = function(ctx) {
			//画X轴横线
			ctx.beginPath()
			ctx.lineWidth = 1;
			ctx.moveTo(this.start_X, this.start_Y);
			ctx.lineTo(this.end_X, this.start_Y);
			ctx.stroke()
			ctx.closePath()
				//画分割点
			for (i = 1; i <= this.number_x; i++) {
				var i_x = this.start_X + this.space_x * i;
				ctx.beginPath();
				ctx.font = "10px  verdana"
				ctx.lineWidth = 2;
				ctx.moveTo(i_x, this.start_Y - 5);
				ctx.lineTo(i_x, this.start_Y);
				ctx.fillText(i + '日', i_x - 10, this.start_Y + 20)
				ctx.stroke();
				ctx.closePath();
			}
		}
		month_person_fn.prototype.drawlineY = function(ctx) {
			//画Y轴竖线
			ctx.beginPath()
			ctx.lineWidth = 1;
			ctx.moveTo(this.start_X, this.start_Y);
			ctx.lineTo(this.start_X, this.end_Y);
			ctx.stroke()
			ctx.closePath();
			//画分割点
			for (i = 1; i <= this.number_y; i++) {
				var i_y = this.start_Y - this.space_y * i;
				ctx.beginPath();
				ctx.lineWidth = 2;
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
			}
			//画 常见的最高高度的 X轴向标尺线
			ctx.beginPath()
			ctx.strokeStyle="#e3e3e3"
			ctx.lineWidth=1
			ctx.moveTo(this.start_X + 5,this.start_Y - this.space_y * (this.number_y-1));
			ctx.lineTo(this.end_X ,this.start_Y - this.space_y*(this.number_y-1))
			ctx.stroke()
			ctx.closePath()
		}
		month_person_fn.prototype.mainline = function(ctx, data, colorstyle) {
			this.arr_data = data;
			var datalength = this.arr_data.length;
			var Y_max_next = this.space_y * (this.number_y - 1) //仅次于最高值的那个 也就是 纵向从下往上的倒数第二个
			var Y_max_value = this.node_y * (this.number_y - 1);

			this.Proportion_y = this.space_y / this.node_y
			this.Max_Proportion_y = (this.space_y * 2) / (this.max_y - Y_max_value).toFixed(5)
			ctx.beginPath()
			ctx.moveTo(this.start_X, this.start_Y)
			ctx.strokeStyle = '#000'
			ctx.strokeWidth=0.1
			for (i = 1; i <= datalength; i++) {
				var the_value = this.arr_data[i - 1]
				if (typeof the_value != 'number') {//如果其中出现不为nuber的值 就让它等于0
					the_value = 0
				}
				
				var X_dot = this.start_X + this.space_x * i;
				if (the_value >= Y_max_value) {
					var Y_dot = this.start_Y - Y_max_next - (the_value - Y_max_value) * this.Max_Proportion_y
				} else {
					var Y_dot = this.start_Y - the_value * this.Proportion_y
				}
				ctx.lineTo(X_dot, Y_dot)

			}
			ctx.stroke()
			ctx.closePath()

		}







		month_person.startfn() //开始执行
	}

})(jQuery)