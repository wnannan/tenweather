//$(function(){
	

//	1.获取默认城市的天气信息
//	2.获取所有城市的信息
//	3.点击每个城市可以获取当前城市的天气信息
//	4.在搜索框内输入要搜索的城市,点击搜索按钮可以进行搜索
	
	
	
	
	//1.获取当前城市的天气信息
	let tianqi;
	$.ajax({
		type:"get",
		url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
		dataType: "jsonp",
		success: function(obj){
//			console.log(obj);
			tianqi = obj.data;
			console.log(tianqi);
			updata(tianqi);
		}
	})
	//获取当前天气数据
	function updata(tianqi){
		//获取当前城市
		$(".top p").html(tianqi.city);
		//获取当前城市的天气状况
		$(".top-kongqi h5").html(tianqi.weather.quality_level);
		//获取当前温度
		$(".tem").html(tianqi.weather.current_temperature);
		//获取当前的天气状况
		$(".tm2").html(tianqi.weather.current_condition);
		//获取当前风向
		$(".tm3").html(tianqi.weather.wind_direction);
		//获取当前风力
		$(".tm4").html(tianqi.weather.wind_level+"级");
		
		//今天的天气
		$(".todayliright .hi").html(tianqi.weather.dat_high_temperature+"/");
		$(".todayliright p .low").html(tianqi.weather.dat_low_temperature);
		$(".todaylileft p").eq(1).html(tianqi.weather.dat_condition);
		//获取天气图标，更改属性值  
		$(".todayliright img").attr("src","./img/"+tianqi.weather.dat_weather_icon_id+".png");
		
		//明天的天气
		$(".tomorrow p").eq(1).html(tianqi.weather.tomorrow_condition);
		$(".tomorrow p .hi").html(tianqi.weather.tomorrow_high_temperature+"/");
		$(".tomorrow p .low").html(tianqi.weather.tomorrow_low_temperature);
		$(".tomorrow img").attr("src","./img/"+tianqi.weather.dat_weather_icon_id+".png");
		
		//未来24小时天气
		let hweather = tianqi.weather.hourly_forecast;
//		console.log(hweather);
		hweather.forEach(function(v,i){
			//console.log(v);
			//创建一个li追加在ul的昨天天气之后
//			let li = document.createElement("li");
//			$("").append(li);
//			//添加时间、天气图标、温度
//			$(" li").append("<span class='list_top'>+v.hour+</span>");
//			console.log(v,i);
				let str = `<li>
							<p class="time"></p>
							<img src="" alt="" class="img"/>
							<p><span class="tp"></span><sup>o</sup></p> 
							</li>`;
				$(".temp").append(str);
				$(".temp li .time").eq(i).html(v.hour+":00");
				$(".temp .img").eq(i).attr("src","./img/"+v.weather_icon_id +".png");
				$(".tp").eq(i).html(v.temperature);
		})
		
		//未来多天的天气信息
		let dweather = tianqi.weather.forecast_list;
		dweather.forEach(function(v,i){
			let str = `<li>
							<p class="data">09/25</p>
							<p class="weather"><span class="hi"></span><sup>o</sup></p>
							<img src="./img/31.png" alt="" />
							<p class="weather"><span class="low"></span><sup>o</sup></p>
							<p class="wind big">南风</p>
							<p class="wind num">3级</p>
						</li>`
			$(".container").append(str);
			$(".container li .data").eq(i).html(v.date.substr(5,6));
			$(".container li .hi").eq(i).html(v.high_temperature);
			$(".container li .low").eq(i).html(v.low_temperature);
			$(".container li img").eq(i).attr("src","./img/"+v.weather_icon_id+".png");
			$(".container li .big").eq(i).html(v.wind_direction);
			$(".container li .num").eq(i).html(v.wind_level+"级");
		})
	}
	
	//点击城市，出现城市页面
	$(".top>p").click(function(){
		console.log(1)
		$(".topwrapper").css({"display":"block"});
//		$(".today").css({"display":"none"}); 
		$(".wrapper").css({"display":"none"});
		$(".ct-scroll").css({"display":"none"});
		$(".foot").css({"display":"none"});
		$(".footer").css({"display":"none"});
		
	})
	//点击取消，城市页面消失
	$(".topwrapper-top>a").click(function(){
		$(".topwrapper").css({"display":"none"});
		$(".wrapper").css({"display":"block"});
		$(".ct-scroll").css({"display":"block"});
		$(".foot").css({"display":"block"});
		$(".footer").css({"display":"block"});
		
	})
	//获取城市信息
	let city;
	$.ajax({
		type:"get",
		url:"https://www.toutiao.com/stream/widget/local_weather/city/",
		dataType:"jsonp",
		success:function(obj){
			city=obj.data;
			console.log(city);
			updataCity(city);
		}
	})

	//获取每个城市信息
	function updataCity(city){
		let k = 0;
		for(let i in city){
			let str = `<div class="hotcity history">
						<p>${i}</p>
						<ul class="city"></ul>
						</div>`
			$(".topwrapper").append(str);
			
			for(let j in city[i]){  
				let str1 = `<li>${j}</li> `;
				$(".history .city").eq(k).append(str1);
			}
			k++;
		}
	}
	//点击每个城市，获取当前城市的天气信息
	
	window.onload = function(){	
		$("li").click(function(){
			console.log(1);
			$(".topwrapper").css({"display":"none"});
			$(".wrapper").css({"display":"block"});
			$(".ct-scroll").css({"display":"block"});
			$(".foot").css({"display":"block"});
			$(".footer").css({"display":"block"});
			let con = $(this).html();
			ajaxs(con);
			console.log(con)
		})
		//获取某个城市的天气信息
		function ajaxs(str){
			let url1 = `https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`;
			$.ajax({
				type:"get",
				url:url1,
				dataType:"jsonp",
				success:function(obj){
					console.log(obj)
					let tianqi2 = obj.data;
					updata(tianqi2);
				}
			})
		}
		//在搜索框内输入内容，获取当前天气情况
		$("input").focus(function(){
			$(".topwrapper-top a").html("搜索");
		})
		$("input").blur(function(){
			$(".topwrapper-top a").html("取消");
		})
		//点击搜索时，获取input中的内容进行搜索
		$(".topwrapper-top a").click(function(){
			$(".topwrapper").css({"display":"none"});
			$(".wrapper").css({"display":"block"});
			$(".ct-scroll").css({"display":"block"});
			$(".foot").css({"display":"block"});
			$(".footer").css({"display":"block"});
			let text = $(".topwrapper-top input").val();
//			console.log(text);
			for(let i in city){
				for(let j in city[i]){
					if(text==j){
						ajaxs(text);
						return;
					}
				}
			}
			
		})
	
	}
//})
