<template>
	<div class=""><div id="myEcharts" style="height:400px;"></div></div>
</template>

<script>
export default {
	name: 'Echarts',
	props:{
		data:{
			type:Object,
			default:{}
		}
	},
	data() {
		return {
			x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
		};
	},
	methods: {
		myEcharts() {
			// 基于准备好的dom，初始化echarts实例

			// var myChart = this.$echarts.init(document.getElementById('myEcharts'));
			let myChart = echarts.init(document.getElementById('myEcharts'));
			// // console.log(myChart);
			// 指定图表的配置项和数据
			let data = this.data

			let option = {
				tooltip: {
					show: true,
					trigger: 'axis',
					axisPointer: {
						type: 'shadow'
					}
				},
				grid: [
					{
						top: 100,
						bottom: 101
					},
					{
						height: 60,
						bottom: 40
					}
				],
				xAxis: [
					{
						type: 'category',
						data: data.xData,
						gridIndex: 0,
						axisLabel: {
							color: '#333'
						},
						axisLine: {
							lineStyle: {
								color: '#e7e7e7'
							}
						},
						axisTick: {
							lineStyle: {
								color: '#e7e7e7'
							}
						},
						zlevel: 2
					},
					{
						type: 'category',
						gridIndex: 1,
						axisLine: {
							show: false
						},
						zlevel: 1
					}
				],
				yAxis: [
					{
						type: 'value',
						gridIndex: 0,
						axisLabel: {
							color: '#333'
						},
						splitLine: {
							lineStyle: {
								type: 'dashed'
							}
						},
						axisLine: {
							lineStyle: {
								color: '#ccc'
							}
						},
						axisTick: {
							lineStyle: {
								color: '#ccc'
							}
						}
					},
					{
						type: 'value',
						gridIndex: 1,
						axisLabel: {
							show: false
						},
						axisLine: {
							show: false
						},
						splitLine: {
							show: false
						},
						axisTick: {
							show: false
						}
					}
				],
				series: [
					{
						data: data.yData,
						type: 'bar',
						label: {
							show: true,
							position: 'top',
							textStyle: {
								color: '#555'
							}
						},
						itemStyle: {
							normal: {
								color: params => {
									let colors = ['#4150d8', '#28bf7e', '#ed7c2f', '#f2a93b', '#f9cf36', '#4a5bdc', '#4cd698', '#f4914e', '#fcb75b', '#ffe180', '#b6c2ff', '#96edc1'];
									return colors[params.dataIndex];
								}
							}
						},
						xAxisIndex: 0,
						yAxisIndex: 0
					},
					{
						label: {
							show: true,
							position: 'inside',
							formatter: '{b}',
							offset: [0, 10],
							textStyle: {
								color: '#777'
							}
						},
						type: 'bar',
						barGap: 0,
						barWidth: '27.2727%',
						itemStyle: {
							normal: {
								color: 'rgba(134,176,237, .5)'
							}
						},
						xAxisIndex: 1,
						yAxisIndex: 1
					},
					{
						label: {
							show: true,
							position: 'inside',
							formatter: '{b}',
							offset: [0, 10],
							textStyle: {
								color: '#777'
							}
						},
						type: 'bar',
						barGap: 0,
						barWidth: '18.1818%',
						itemStyle: {
							normal: {
								color: 'rgba(40,191,126, .5)'
							}
						},
						xAxisIndex: 1,
						yAxisIndex: 1
					},
					{
						type: 'bar',
						barCategoryGap: 0,
						barGap: 0,
						barWidth: '9.0909%',
						itemStyle: {
							normal: {
								color: 'rgba(249,207,54, .5)'
							}
						},
						xAxisIndex: 1,
						yAxisIndex: 1
					}
				]
			};

			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);
			window.onresize = () => {
				myChart.resize();
			};
			/* this.myChart.on('click', function(res) {
				// console.log(res);
			}); */
		}
	},
	mounted() {
		this.myEcharts();
	}
};
</script>
