<template>
	<div class="in-animate">
		<el-row>
			<el-col :span="24" v-if="ispermission">
				<div class="grid-content bg-purple-dark">
					<el-card shadow="always" class="box-card">
						<el-tabs v-model="active" @tab-click="handleClick">
							<el-tab-pane label="首页	" name="0">
								<el-row :gutter="20" class="marg-top20">
									<el-col :span="12">
										<div class="grid-content bg-purple">
											<el-card class="" shadow="hover">
												<div slot="header" class="clearfix">
													<el-row>
														<el-col :span="12">
															<div class="grid-content bg-purple"><h4>资讯</h4></div>
														</el-col>
														<el-col :span="0">
															<div class="grid-content bg-purple-light flex-end">
																<el-button-group>
																	<el-button type="primary" plain size="mini">今日</el-button>
																	<el-button type="primary" plain size="mini">本周</el-button>
																	<el-button type="primary" plain size="mini">本月</el-button>
																</el-button-group>
															</div>
														</el-col>
													</el-row>
												</div>
												<div class="item-box-card">
													<div v-for="(item, index) in newsList" :key="item.id" class="text item">
														<el-row>
															<el-col :span="2">
																<div class="grid-content bg-purple-dark">
																	<span class="show-sort">{{ index + 1 }}</span>
																</div>
															</el-col>
															<el-col :span="15">
																<div class="grid-content bg-purple-dark">{{ item.title }}</div>
															</el-col>
															<el-col :span="5">
																<div class="grid-content bg-purple-dark">
																	<span>{{ item.updateTime }}</span>
																</div>
															</el-col>
														</el-row>
														<el-divider></el-divider>
													</div>
												</div>
											</el-card>
										</div>
									</el-col>
									<el-col :span="12">
										<div class="grid-content bg-purple">
											<el-card class="" shadow="hover">
												<div slot="header" class="clearfix">
													<el-row>
														<el-col :span="12">
															<div class="grid-content bg-purple"><h4>通知</h4></div>
														</el-col>
														<el-col :span="0">
															<div class="grid-content bg-purple-light flex-end">
																<el-button-group>
																	<el-button type="primary" plain size="mini">今日</el-button>
																	<el-button type="primary" plain size="mini">本周</el-button>
																	<el-button type="primary" plain size="mini">本月</el-button>
																</el-button-group>
															</div>
														</el-col>
													</el-row>
												</div>
												<div class="item-box-card">
													<div v-for="(item, index) in annoucementList" :key="item.id" class="text item">
														<el-row>
															<el-col :span="2">
																<div class="grid-content bg-purple-dark">
																	<span class="show-sort">{{ index + 1 }}</span>
																</div>
															</el-col>
															<el-col :span="15">
																<div class="grid-content bg-purple-dark">{{ item.title }}</div>
															</el-col>
															<el-col :span="5">
																<div class="grid-content bg-purple-dark">
																	<span>{{ item.updateTime }}</span>
																</div>
															</el-col>
														</el-row>
														<el-divider></el-divider>
													</div>
												</div>
											</el-card>
										</div>
									</el-col>
								</el-row>

								<el-row :gutter="20" class="marg-top20">
									<el-col :span="12">
										<div class="grid-content bg-purple">
											<el-card class="" shadow="hover">
												<div slot="header" class="clearfix">
													<el-row>
														<el-col :span="12">
															<div class="grid-content bg-purple"><h4>活跃度排名</h4></div>
														</el-col>
														<el-col :span="0">
															<div class="grid-content bg-purple-light flex-end">
																<el-button-group>
																	<el-button type="primary" plain size="mini">今日</el-button>
																	<el-button type="primary" plain size="mini">本周</el-button>
																	<el-button type="primary" plain size="mini">本月</el-button>
																</el-button-group>
															</div>
														</el-col>
													</el-row>
												</div>
												<div class="item-box-card">
													<div v-for="(item, index) in userList" :key="item.id" class="text item">
														<el-row>
															<el-col :span="2">
																<div class="grid-content bg-purple-dark">
																	<span class="show-sort">{{ index + 1 }}</span>
																</div>
															</el-col>
															<el-col :span="15">
																<div class="grid-content bg-purple-dark">{{ item.userName }}</div>
															</el-col>
															<el-col :span="7">
																<div class="grid-content bg-purple-dark">
																	<span>{{ item.createTime }}</span>
																</div>
															</el-col>
														</el-row>
														<el-divider></el-divider>
													</div>
												</div>
											</el-card>
										</div>
									</el-col>
									<el-col :span="12">
										<div class="grid-content bg-purple">
											<el-card class="" shadow="hover">
												<div slot="header" class="clearfix">
													<el-row>
														<el-col :span="12">
															<div class="grid-content bg-purple"><h4>近期考试</h4></div>
														</el-col>
														<el-col :span="0">
															<div class="grid-content bg-purple-light flex-end">
																<el-button-group>
																	<el-button type="primary" plain size="mini">今日</el-button>
																	<el-button type="primary" plain size="mini">本周</el-button>
																	<el-button type="primary" plain size="mini">本月</el-button>
																</el-button-group>
															</div>
														</el-col>
													</el-row>
												</div>
												<div class="item-box-card">
													<div v-for="(item, index) in examList" :key="item.id" class="text item">
														<el-row>
															<el-col :span="2">
																<div class="grid-content bg-purple-dark">
																	<span class="show-sort">{{ index + 1 }}</span>
																</div>
															</el-col>
															<el-col :span="15">
																<div class="grid-content bg-purple-dark">{{ item.examName }}</div>
															</el-col>
															<el-col :span="7">
																<div class="grid-content bg-purple-dark">
																	<span>{{ item.updateTime }}</span>
																</div>
															</el-col>
														</el-row>
														<el-divider></el-divider>
													</div>
												</div>
											</el-card>
										</div>
									</el-col>
								</el-row>

								<el-row :gutter="20" class="marg-top20">
									<el-col :span="12">
										<div class="grid-content bg-purple">
											<el-card class="" shadow="hover">
												<div slot="header" class="clearfix">
													<el-row>
														<el-col :span="12">
															<div class="grid-content bg-purple"><h4>热门课程</h4></div>
														</el-col>
														<el-col :span="0">
															<div class="grid-content bg-purple-light flex-end">
																<el-button-group>
																	<el-button type="primary" plain size="mini">今日</el-button>
																	<el-button type="primary" plain size="mini">本周</el-button>
																	<el-button type="primary" plain size="mini">本月</el-button>
																</el-button-group>
															</div>
														</el-col>
													</el-row>
												</div>
												<div class="item-box-card">
													<div v-for="(item, index) in courseList" :key="item.id" class="text item">
														<el-row>
															<el-col :span="2">
																<div class="grid-content bg-purple-dark">
																	<span class="show-sort">{{ index + 1 }}</span>
																</div>
															</el-col>
															<el-col :span="15">
																<div class="grid-content bg-purple-dark">{{ item.courseName }}</div>
															</el-col>
															<el-col :span="7">
																<div class="grid-content bg-purple-dark">
																	<span>{{ item.updateTime }}</span>
																</div>
															</el-col>
														</el-row>
														<el-divider></el-divider>
													</div>
												</div>
											</el-card>
										</div>
									</el-col>
									<el-col :span="12">
										<div class="grid-content bg-purple">
											<el-card class="" shadow="hover">
												<div slot="header" class="clearfix">
													<el-row>
														<el-col :span="12">
															<div class="grid-content bg-purple"><h4>热门图书</h4></div>
														</el-col>
														<el-col :span="0">
															<div class="grid-content bg-purple-light flex-end">
																<el-button-group>
																	<el-button type="primary" plain size="mini">今日</el-button>
																	<el-button type="primary" plain size="mini">本周</el-button>
																	<el-button type="primary" plain size="mini">本月</el-button>
																</el-button-group>
															</div>
														</el-col>
													</el-row>
												</div>
												<div class="item-box-card">
													<div v-for="(item, index) in bookList" :key="item.id" class="text item">
														<el-row>
															<el-col :span="2">
																<div class="grid-content bg-purple-dark">
																	<span class="show-sort">{{ index + 1 }}</span>
																</div>
															</el-col>
															<el-col :span="15">
																<div class="grid-content bg-purple-dark">{{ item.bookName }}</div>
															</el-col>
															<el-col :span="7">
																<div class="grid-content bg-purple-dark">
																	<span>{{ item.updateTime }}</span>
																</div>
															</el-col>
														</el-row>
														<el-divider></el-divider>
													</div>
												</div>
											</el-card>
										</div>
									</el-col>
								</el-row>
							</el-tab-pane>
							<el-tab-pane label="运营分析" name="1">
								<el-card class="" shadow="never">
									<div slot="header" class="clearfix"><el-button style="float: right; padding: 3px 0" type="text">
										<el-cascader
											:options="orgList" 
											:props="{label:'orgName',children:'childrenOrg',value:'orgCode'}"
											@change="handleChooseOrg"
											placeholder="选择机构"
											:show-all-levels="false"></el-cascader>
									</el-button></div>
									<div class="d-flex justify-content-around">
										<div
											style="width: 200px;height: 100px;"
											v-for="(t, i) in resgistList"
											class="d-flex flex-column justify-content-center align-items-center border ml-1 mt-1 rounded"
										>
											<span>{{ t.name }}</span>
											<span class="font-weight-bold h4">{{ t.num }}</span>
										</div>
									</div>

									<div class="d-flex mt-5">
										<Charts ID="registTotal" :opt="registTotal" :width="50"></Charts>
										<Charts ID="registNum" :opt="registNumData" :width="50"></Charts>
									</div>
									<div class="d-flex justify-content-around">
										<!-- <div class="d-flex flex-column justify-content-center align-items-center border" style="border-radius: 35%; padding: 20px 0; width: 200px;">
											<span>{{attendList[0].name}}</span>
											<span class="h3">{{attendList[0].num}}</span>
											<span>{{attendList[0].rote}}%</span>
										</div>
										<div class="d-flex flex-column justify-content-center align-items-center border" style="border-radius: 35%; padding: 20px 0; width: 200px;">
											<span>{{attendList[1].name}}</span>
											<span class="h3">{{attendList[1].num}}</span>
											<span>{{attendList[1].rote}}%</span>
										</div>
										<div class="d-flex flex-column justify-content-center align-items-center border" style="border-radius: 35%; padding: 20px 0; width: 200px;">
											<span>{{attendList[2].name}}</span>
											<span class="h3 d-flex align-items-center">
												<i style="font-size: 10px;">平均人数:</i>
												{{attendList[2].num}}
											</span>
											<span>{{attendList[2].rote}}%</span>
										</div>
										<div class="d-flex flex-column justify-content-center align-items-center border" style="border-radius: 35%; padding: 20px 0; width: 200px;">
											<span>{{attendList[3].name}}</span>
											<span class="h3 d-flex align-items-center">
												<i style="font-size: 10px;">平均人数:</i>
												{{attendList[3].num}}
											</span>
											<span>{{attendList[3].rote}}%</span>
										</div> -->
										<Charts ID="todayCharts" :opt="todayData" :width="25" height="200px"></Charts>
										<Charts ID="yesterdayCharts" :opt="yesterdayData" :width="25" height="200px"></Charts>
										<Charts ID="thisMonthAttendance" :opt="thisMonthAttendance" :width="25" height="200px"></Charts>
										<Charts ID="lastMonthAttendance" :opt="lastMonthAttendance" :width="25" height="200px"></Charts>
										
									</div>

									<div class="mt-5">
										<el-card class="" shadow="never">
										  <div slot="header" class="clearfix">
										    <el-button style="float: right; padding: 3px 0" type="text">
													<el-radio-group v-model="sradioTher" @change="schanged" class="ml-auto">
														<el-radio label="today">今天</el-radio>
														<el-radio label="yesterday">昨天</el-radio>
														<el-radio label="thisWeek">本周</el-radio>
														<el-radio label="thisMonth">本月</el-radio>
													</el-radio-group>
												</el-button>
										  </div>
										  <div class="d-flex w-100">
										    <Charts ID="sevenAttendance" :opt="sevenAttendanceData" :width="50"></Charts>
										    <Charts ID="attendanceData" :opt="attendanceData" :width="50"></Charts>
										  </div>
										</el-card>
									</div>
									<div class="d-flex mt-4 justify-content-around">
										<div class="d-flex flex-column justify-content-center align-items-center border rounded" style="padding: 10px 20px;">
											<span>{{jifengList[0].name}}</span>
											<small class="h5">{{jifengList[0].num}}</small>
										</div>
										<div class="d-flex flex-column justify-content-center align-items-center border rounded" style="padding: 10px 20px;">
											<span>{{jifengList[1].name}}</span>
											<small class="h5">{{jifengList[1].num}}</small>
										</div>
										<div class="d-flex flex-column justify-content-center align-items-center border rounded" style="padding: 10px 20px;">
											<span>上月积分</span>
											<div class="d-flex">
												<img src="../../assets/images/up.png" alt="" style="width: 20px;height: 20px;" />
												<span class="d-flex flex-column align-items-center">
													<small class="h5">{{jifengList[2].num}}</small>
													<small>产生积分</small>
												</span>
												<img src="../../assets/images/exchange.png" alt="" style="width: 20px;height: 20px;" class="ml-4" />
												<span class="d-flex flex-column align-items-center">
													<small class="h5">{{jifengList[3].num}}</small>
													<small>兑换积分</small>
												</span>
											</div>
										</div>

										<div class="d-flex flex-column justify-content-center align-items-center border rounded" style="padding: 10px 20px;">
											<span>本月积分</span>
											<div class="d-flex">
												<img src="../../assets/images/up.png" alt="" style="width: 20px;height: 20px;" />
												<span class="d-flex flex-column align-items-center">
													<small class="h5">{{jifengList[4].num}}</small>
													<small>产生积分</small>
												</span>
												<img src="../../assets/images/exchange.png" alt="" style="width: 20px;height: 20px;" class="ml-4" />
												<span class="d-flex flex-column align-items-center">
													<small class="h5">{{jifengList[5].num}}</small>
													<small>兑换积分</small>
												</span>
											</div>
										</div>
									</div>
									<div class="mt-2">
										<el-card class="" shadow="never">
										  <div slot="header" class="clearfix">
										    <el-button style="float: right; padding: 3px 0" type="text">
													<el-radio-group v-model="rradioTher" @change="rchanged" class="ml-auto">
														<el-radio label="today">今天</el-radio>
														<el-radio label="thisWeek">本周</el-radio>
														<el-radio label="thisMonth">本月</el-radio>
													</el-radio-group>
												</el-button>
										  </div>
										 <div class="d-flex">
											 <Charts ID="sevenJifen" :opt="sevenJifenData" :width="50"></Charts>
											 <Charts ID="attendanceRank" :opt="partJifenData" :width="50"></Charts>
										 </div>
										</el-card>
									</div>
									
									<div>
										<el-card class="mt-3" shadow="never">
											<div slot="header" class="w-100">
												<div class="d-flex w-100" >
													<el-radio-group v-model="radioTher" @change="changed" class="ml-auto">
														<el-radio label="today">今天</el-radio>
														<el-radio label="thisWeek">本周</el-radio>
														<el-radio label="thisMonth">本月</el-radio>
													</el-radio-group>
												</div>
											</div>
											<div class="d-flex">
												<div class="w-50 d-flex flex-column justify-content-center border-right mr-3" style="box-sizing: border-box;padding-right: 50px;">
													<h3>个人积分排名</h3>
													<div v-for="(t,i) in sortPerson" class="mt-4 d-flex">
														<span class="show-sort">{{i+1}}</span>
														<span class="h5 ml-2">{{t.userName}}</span>
														<span class="h5 ml-auto" style="margin-left: 60px;">{{t.integral}}积分</span>
													</div>
												</div>
												<div class="w-50" style="box-sizing: border-box;padding-right: 50px;">
													<h3>项目部积分排名</h3>
													<div v-for="(t,i) in sortOrg" class="mt-4 d-flex">
														<span class="show-sort">{{i+1}}</span>
														<span class="h5 ml-2">{{t.orgName}}</span>
														<span class="h5 ml-auto" style="margin-left: 60px;">{{t.integral}}积分</span>
													</div>
												</div>
											</div>
										</el-card>
									</div>
								</el-card>
							</el-tab-pane>
						</el-tabs>
					</el-card>
				</div>
			</el-col>
			<el-col v-else><div class="d-flex bg-white justify-content-center align-items-center" style="height: 400px;">暂无权限查看</div></el-col>
		</el-row>
		<el-backtop></el-backtop>
	</div>
</template>

<script>
import BaseChart from './components/BaseChart.vue';
import Charts from './components/charts.vue';
import api from '../../api/api.js';
import {
	getRegisterStatistics,
	getRegisterNumberByOrgCode,
	getIntegralStatistics,
	getCourseParticipationRate,
	getCourseIntegralConstitute,
	getLast7daysCourseIntegral,
	getMonthlyCourseIntegral,
	getAttendanceStatistics,
	getLast7DaysAttendanceStatistics,
	getOrgsAttendanceRank,
	getCourseCount,
	getQuestionCount,
	getIntegralPersonRank,
	getIntegralOrgsRank,
	getOrgsAttendanceStatistics
} from '../../api/home.js';
import {mapState} from 'vuex'
export default {
	components: {
		BaseChart,
		Charts
	},
	data() {
		return {
			radio: 'thisMonth',
			sradioTher:'thisMonth',
			rradioTher:'thisMonth',
			radioTher: 'thisMonth',
			resgistList: [
				{ name: '在册人数', num: 53, color: '#ff5500' },
				{ name: '历史人数', num: 123, color: '#0056B3' },
				{ name: '累计积分', num: 173, color: '#aa0000' },
				{ name: '课程总数', num: 183, color: '#55ffff' },
				{ name: '题库', num: 183, color: '#aa00ff' }
			],
			jifengList: [
				{ name: '现有积分', num: 123, color: '#0056B3' },
				{ name: '累计积分', num: 53, color: '#ff5500' },
				{ name: '上月产生积分', num: 173, color: '#aa0000' },
				{ name: '上月兑换积分', num: 173, color: '#aa0000' },
				{ name: '本月产生积分', num: 183, color: '#aa557f' },
				{ name: '本月兑换积分', num: 183, color: '#aa557f' }
			],
			attendList:[
				{name:'今日考勤',num:0,rote:0},
				{name:'昨日考勤',num:0,rote:0},
				{name:'‘上月考勤率',num:0,rote:0},
				{name:'本月考勤率',num:0,rote:0},
			],
			ispermission: true,
			active: '1',
			newsList: [],
			annoucementList: [],
			userList: [],
			examList: [],
			courseList: [],
			bookList: [],
			registNumData: {},
			partJifenData: {},
			makeUpJifenData: {},
			registTotal: {},
			jifenTotal: {},
			sevenJifenData: {},
			monthJifenData: {},
			todayData: {},
			attendanceData:{},
			thisMonthAttendance: {},
			lastMonthAttendance: {},
			yesterdayData: {},
			sevenAttendanceData: {},
			attendanceRank: {},
			total: 0,
			sortPerson: [],
			sortOrg: [],
			orgList:[],
			loading:''
		};
	},
	methods: {
		handleClick(e) {
			this.showLoading()
			setTimeout(()=>{
				this.hideLoading()
			},2000)
			// console.log(e);
		},
		showLoading(){
			this.loading = this.$loading({
					lock: true,
					text: '加载中...',
					spinner: 'el-icon-loading',
					background: 'rgba(255, 255, 255, 0.7)'
				});
		},
		hideLoading(){
			this.loading.close();
		},
		handleChooseOrg(e){
			this.showLoading()
			if(e==='all'){
				this.getData()
				return this.hideLoading()
			}
			this.getRegisterStatistics({orgCode:e[0]});
			this.getIntegralStatistics({orgCode:e[0]});
			this.getRegisterNumberByOrgCode({orgCode:e[0]});
			this.getRegisterNumberByOrgCode({orgCode:e[0]});
			this.getCourseParticipationRate({orgCode:e[0]});
			this.getCourseIntegralConstitute({orgCode:e[0]});
			this.getLast7daysCourseIntegral({orgCode:e[0]});
			this.getMonthlyCourseIntegral({orgCode:e[0]});
			this.getAttendanceStatistics({ time: 'today',orgCode:e[0] });
			this.getAttendanceStatistics({ time: 'yesterday',orgCode:e[0] });
			this.getAttendanceStatistics({ time: 'lastMonth',orgCode:e[0] });
			this.getAttendanceStatistics({ time: 'thisMonth',orgCode:e[0] });
			this.getLast7DaysAttendanceStatistics();
			this.getOrgsAttendanceRank({ time: 'thisMonth' });
			this.getCourseCount({orgCode:e[0]});
			this.getQuestionCount({orgCode:e[0]});
			this.getIntegralPersonRank({ time: 'thisMonth',orgCode:e[0] });
			this.getIntegralOrgsRank({ time: 'thisMonth',orgCode:e[0]});
			this.getOrgsAttendanceStatistics({ time: 'thisMonth',orgCode:e[0] });
			this.hideLoading()
		},
		change(e) {
			// console.log(e);
			this.showLoading()
			this.getOrgsAttendanceRank({ time: e });
			this.hideLoading()
		},
		changed(e) {
			this.showLoading()
			this.getIntegralPersonRank({ time: e ,orgCode:this.orgCode});
			this.getIntegralOrgsRank({ time: e,orgCode:this.orgCode});
			this.hideLoading()
		},
		schanged(e){
			console.log(e);
			this.showLoading()
			this.getOrgsAttendanceStatistics({ time: e,orgCode:this.orgCode });
			this.hideLoading()
		},
		rchanged(e){
			console.log(e);
			this.showLoading()
			this.getCourseParticipationRate({ time: e,orgCode:this.orgCode });
			this.hideLoading()
		},
		handleChooseDate(val) {},
		queryExamPlanByPage(params) {
			api.queryExamPlanByPageAPI(params).then(res => {
				// // console.log(res);
				if (res.code == 0) {
					this.examList = res.data.records;
				}
			});
		},
		queryStudentByPage(params) {
			api.getUserListAPI(params).then(res => {
				// // console.log(res);
				if (res.code == 0) {
					this.userList = res.data;
				}
			});
		},
		queryBookByPage(params) {
			api.queryBookByPageAPI(params).then(res => {
				// // console.log(res);
				if (res.code == 0) {
					this.bookList = res.data.records;
				}
			});
		},
		queryCourseByPage(params) {
			api.queryCourseByPageAPI(params).then(res => {
				// // console.log(res);
				if (res.code == 0) {
					this.courseList = res.data.records;
				}
			});
		},
		noticeByPage(params) {
			api.noticeByPageAPI(params).then(res => {
				// // console.log(res);
				if (res.code == 0) {
					this.annoucementList = res.data.records;
				}
			});
		},
		newsPage(params) {
			api.newsPageAPI(params).then(res => {
				// // console.log(res);
				if (res.code == 0) {
					this.newsList = res.data.records;
				}
			});
		},
		getRegisterStatistics(p = {}) {
			getRegisterStatistics(p).then(res => {
				if (res.code === 401) return (this.ispermission = false);
				this.total = res.data.registerNumber;
				this.resgistList[1].num = res.data.historyNumber;
				this.resgistList[0].num = res.data.registerNumber;
				// this.resgistList[2].num=res.data.lastMonthIncreased
				// this.resgistList[3].num=res.data.lastMonthCancelNumber
				let dashedPic =
					'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM8AAAAOBAMAAAB6G1V9AAAAD1BMVEX////Kysrk5OTj4+TJycoJ0iFPAAAAG0lEQVQ4y2MYBaNgGAMTQQVFOiABhlEwCugOAMqzCykGOeENAAAAAElFTkSuQmCC';
				let color = ['#FF8700', '#ffc300', '#00e473', '#009DFF'];
				let chartData = [
					{
						name: '历史人数',
						value: res.data.historyNumber,
						unit: '人'
					},
					{
						name: '在册人数',
						value: res.data.registerNumber,
						unit: '人'
					},
					{
						name: '上月注销',
						value: res.data.lastMonthCancelNumber,
						unit: '人'
					},
					{
						name: '上月增长',
						value: res.data.lastMonthIncreased,
						unit: '人'
					}
				];
				let arrName = [];
				let arrValue = [];
				let sum = 0;
				let pieSeries = [],
					lineYAxis = [];

				// 数据处理
				chartData.forEach((v, i) => {
					arrName.push(v.name);
					arrValue.push(v.value);
					sum = sum + v.value;
				});
				// 图表option整理
				chartData.forEach((v, i) => {
					pieSeries.push({
						name: '人数',
						type: 'pie',
						clockWise: false,
						hoverAnimation: false,
						radius: [65 - i * 15 + '%', 57 - i * 15 + '%'],
						center: ['30%', '50%'],
						label: {
							show: false
						},
						data: [
							{
								value: v.value,
								name: v.name
							},
							{
								value: sum - v.value,
								name: '',
								itemStyle: {
									color: 'rgba(0,0,0,0)'
								}
							}
						]
					});
					pieSeries.push({
						name: '',
						type: 'pie',
						silent: true,
						z: 1,
						clockWise: false, //顺时加载
						hoverAnimation: false, //鼠标移入变大
						radius: [65 - i * 15 + '%', 57 - i * 15 + '%'],
						center: ['30%', '50%'],
						label: {
							show: false
						},
						data: [
							{
								value: 7.5,
								itemStyle: {
									color: '#E3F0FF'
								}
							},
							{
								value: 2.5,
								name: '',
								itemStyle: {
									color: 'rgba(0,0,0,0)'
								}
							}
						]
					});
					v.percent = ((v.value / sum) * 100).toFixed(1) + '%';
					lineYAxis.push({
						value: i,
						textStyle: {
							rich: {
								circle: {
									color: color[i],
									padding: [0, 5]
								}
							}
						}
					});
				});
				let option = {
					backgroundColor: '#fff',
					color: color,
					grid: {
						top: '15%',
						bottom: '54%',
						left: '30%',
						containLabel: false
					},
					yAxis: [
						{
							type: 'category',
							inverse: true,
							axisLine: {
								show: false
							},
							axisTick: {
								show: false
							},
							axisLabel: {
								formatter: function(params) {
									let item = chartData[params];
									return '{line|}{circle|●}{name|' + item.name + '}{value|' + item.value + '}{unit|人}';
								},
								interval: 0,
								inside: true,
								textStyle: {
									color: '#333',
									fontSize: 14,
									rich: {
										line: {
											width: 170,
											height: 10,
											backgroundColor: { image: dashedPic }
										},
										name: {
											color: '#666',
											fontSize: 14
										},
										bd: {
											color: '#ccc',
											padding: [0, 5],
											fontSize: 14
										},
										percent: {
											color: '#333',
											fontSize: 14
										},
										value: {
											color: '#333',
											fontSize: 16,
											fontWeight: 500,
											padding: [0, 0, 0, 20]
										},
										unit: {
											fontSize: 14
										}
									}
								},
								show: true
							},
							data: lineYAxis
						}
					],
					xAxis: [
						{
							show: false
						}
					],
					series: pieSeries
				};
				this.registTotal = option;
			});
		},
		getIntegralStatistics(p = {}) {
			getIntegralStatistics(p).then(res => {
				if (res.code === 401) return (this.ispermission = false);
				this.jifengList[0].num = res.data.currentIntegral;
				this.jifengList[1].num = res.data.totalIntegral;
				this.resgistList[2].num = res.data.totalIntegral;
				this.jifengList[2].num = res.data.lastMonthIntegral;
				this.jifengList[3].num = res.data.lastMonthExchangeIntegral || 0;
				this.jifengList[4].num = res.data.thisMonthIntegral;
				this.jifengList[5].num = res.data.thisMonthExchangeIntegral || 0;
				let bgColor = '#fff';
				let title = '总积分';
				let color = ['#0E7CE2', '#FF8352', '#E271DE', '#F8456B', '#00FFFF', '#4AEAB0'];
				let echartData = [
					{
						name: '现有积分',
						value: res.data.currentIntegral
					},
					{
						name: '历史积分',
						value: res.data.totalIntegral
					},
					{
						name: '上月积分',
						value: res.data.lastMonthIntegral
					},
					{
						name: '本月积分',
						value: res.data.thisMonthIntegral
					}
				];

				let formatNumber = function(num) {
					let reg = /(?=(\B)(\d{3})+$)/g;
					return num.toString().replace(reg, ',');
				};
				let total = echartData[0].value;

				let option = {
					backgroundColor: bgColor,
					color: color,
					// tooltip: {
					//     trigger: 'item'
					// },
					title: [
						{
							text: '{name|' + title + '}\n{val|' + formatNumber(total) + '}',
							top: 'center',
							left: 'center',
							textStyle: {
								rich: {
									name: {
										fontSize: 14,
										fontWeight: 'normal',
										color: '#666666',
										padding: [10, 0]
									},
									val: {
										fontSize: 32,
										fontWeight: 'bold',
										color: '#333333'
									}
								}
							}
						},
						{
							text: '单位：个',
							top: 20,
							left: 20,
							textStyle: {
								fontSize: 14,
								color: '#666666',
								fontWeight: 400
							}
						}
					],
					series: [
						{
							type: 'pie',
							radius: ['45%', '60%'],
							center: ['50%', '50%'],
							data: echartData,
							hoverAnimation: false,
							itemStyle: {
								normal: {
									borderColor: bgColor,
									borderWidth: 2
								}
							},
							labelLine: {
								normal: {
									length: 20,
									length2: 120,
									lineStyle: {
										color: '#e6e6e6'
									}
								}
							},
							label: {
								normal: {
									formatter: params => {
										return '{icon|●}{name|' + params.name + '}{value|' + formatNumber(params.value) + '}';
									},
									padding: [0, -100, 25, -100],
									rich: {
										icon: {
											fontSize: 16
										},
										name: {
											fontSize: 14,
											padding: [0, 10, 0, 4],
											color: '#666666'
										},
										value: {
											fontSize: 18,
											fontWeight: 'bold',
											color: '#333333'
										}
									}
								}
							}
						}
					]
				};
				this.jifenTotal = option;
			});
		},
		getRegisterNumberByOrgCode(p = {}) {
			getRegisterNumberByOrgCode(p).then(res => {
				if (res.code === 401) return (this.ispermission = false);
				if(res.data.length===0) return
		  let option = {
				    tooltip: {
				        trigger: 'axis',
				        axisPointer: { // 坐标轴指示器，坐标轴触发有效
				            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				        },
				    },
				    legend: {
				        selectedMode:true,//取消图例上的点击事件
				        data: ['在册人数','上月注销','上月增长','历史人数']
				    },
				    grid: {
				        left: '5px',
				        right: '4%',
				        bottom: '45px',
				        containLabel: true
				    },
				    xAxis: [{
								show:false,
				        type: 'value',
				        axisLabel: {
				            formatter: '{value}'
				        },
				    }],
				    yAxis: [{
				       
				         type: 'category',
				        data: res.data.map(v=>v.orgName)
				    }],
				    "dataZoom": [{
				        "yAxisIndex": [0],
				        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
				    }],
						color:['#ffc300', '#00e473','#009DFF', '#FF8700'],
				    series: [
				        {
				            name: '在册人数',
				            type: 'bar',
				            stack: '饱和度',
				            data: res.data.map(v=>v.registerNumber),
				        },
				        {
				            name: '上月注销',
				            type: 'bar',
				            stack: '饱和度',
				            data: res.data.map(v=>v.lastMonthCancelNumber)
				        },
								{
								    name: '上月增长',
								    type: 'bar',
								    stack: '饱和度',
								    data: res.data.map(v=>v.lastMonthIncreased)
								},
								{
								    name: '历史人数',
								    type: 'bar',
								    stack: '饱和度',
								    data: res.data.map(v=>v.historyNumber),
										label: {
										    normal: {
										        show: true,
										        position: 'right',
										        formatter: '{c}',
														offset: [10, 0],
										        textStyle: {
										            align: 'center',
										            baseline: 'middle',
										            fontSize: 10,
										            fontWeight: '400',
										        }
										    },
										},
								},
				    ]
				};
				
				
				this.registNumData = option;
			});
		},
		getCourseParticipationRate(p = {}) {
			getCourseParticipationRate(p).then(res => {
				if (res.code === 401) return (this.ispermission = false);
				if(res.data.length===0) return
				var colorList = ['#73DDFF', '#73ACFF', '#FDD56A', '#FDB36A', '#FD866A', '#9E87FF', '#b0f8ff', '#aeff2c', '#000000', '#aa0000', '#005500', '#aaaa00', '#5500ff', '#55007f', '#550000', '#ffff7f', '#ff55ff', '#55557f', '#00aa7f', '#555500', '#aaaa7f', '#00ff7f', '#ff557f', '#00ffff', '#ff5500']
				let option = {
						title: {
								text: '学习参与率',
								x: 'center',
								y: 'center',
								textStyle: {
										fontSize: 10
								}
						},
						tooltip: {
								trigger: 'item'
						},
						series: [{
								type: 'pie',
								center: ['50%', '50%'],
								radius: ['24%', '45%'],
								clockwise: true,
								avoidLabelOverlap: true,
								hoverOffset: 15,
								itemStyle: {
										normal: {
												color: function(params) {
														return colorList[params.dataIndex]
												}
										}
								},
								label: {
										show: true,
										position: 'outside',
										formatter: '{a|{b}：{d}%}\n{hr|}',
										rich: {
												hr: {
														backgroundColor: 't',
														borderRadius: 3,
														width: 3,
														height: 3,
														padding: [3, 3, 0, -12]
												},
												a: {
														padding: [-30, 15, -20, 15]
												}
										}
								},
								labelLine: {
										normal: {
												length: 20,
												length2: 30,
												lineStyle: {
														width: 1
												}
										}
								},
								data: res.data.map(v=>{
									return {
										name:v.orgName,
										value:v.courseStudyNumber
									}
								}),
						}]
				};
				this.partJifenData = option;
			});
		},
		getCourseIntegralConstitute(p = {}) {
			getCourseIntegralConstitute(p).then(res => {
				if (res.code === 401) return (this.ispermission = false);
				if(res.data.length===0) return
				let option = {
					    tooltip: {
					        trigger: 'axis',
					        axisPointer: { // 坐标轴指示器，坐标轴触发有效
					            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					        },
					        formatter:function(params){//自动提示工具
					            var params0Value = params[0].value;
					            var params1Value = params[1].value;
					            var params2Value = params[2].value;
					            // if(params[0].value<=0){params0Value = params[0].value}
					            // if(params[1].value<=0){params0Value = params[1].value}
					            // if(params[2].value<=0){params0Value = params[2].value}
					            return params[0].axisValue+'<br />'+params[0].marker+"在册人数："+params0Value+'<br />'+params[1].marker+"注销人数："+params1Value
					        }
					    },
					    legend: {
					        selectedMode:true,//取消图例上的点击事件
					        data: ['注销人数','在册人数']
					    },
					    grid: {
					        left: '5px',
					        right: '4%',
					        bottom: '45px',
					        containLabel: true
					    },
					    xAxis: [{
					        type: 'value',
					        axisLabel: {
					            formatter: '{value}'
					        },
					    }],
					    yAxis: [{
					       
					         type: 'category',
					        data: res.data.map(v=>v.orgName)
					    },
							 {
							                    //左侧柱状图的Y轴
							                    gridIndex: 0, //y轴所在的 grid 的索引
							                    splitLine: 'none',
							                    axisTick: 'none',
							                    axisLine: 'none',
							                    data:  [],
							                    inverse: true,
							                    axisLabel: {
							                        show: true,
							                        verticalAlign: 'bottom',
							                        align: 'right',
							                        padding: [0, 20, 15, 0],
							                        textStyle: {
							                            color: '#fff',
							                            fontSize: '16',
							                        },
							                        formatter: function(value) {
							                            return '{x|' + value + '}  {y|' + "辆}"
							                        },
							                        rich: {
							                            y: {
							                                color: '#befbff',
							                                fontSize: 16
							                            },
							                            x: {
							                                color: '#f6cf42',
							                                fontSize: 16
							                            }
							                        }
							                    }
							                },],
					    "dataZoom": [{
					        "yAxisIndex": [ 0],
					        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
					    }],
					    series: [
					        {
					            name: '在册人数',
					            type: 'bar',
					            stack: '饱和度',
					            data: res.data.map(v=>v.registerNumber)
					        },
					        {
					            name: '注销人数',
					            type: 'bar',
					            stack: '饱和度',
					            data: res.data.map(v=>{
												let item=res.data.find(i=>i.orgCode===v.orgCode)
												return item.historyNumber-item.registerNumber
											})
					        }
					    ]
					};
				this.makeUpJifenData = option;
			});
		},
		getLast7daysCourseIntegral(p = {}) {
			getLast7daysCourseIntegral(p).then(res => {
				if (res.code === 401) return (this.ispermission = false);
				// console.log(111111,res);
				const colorList = ['#9E87FF', '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF'];
				let option = {
					backgroundColor: '#fff',
					title: {
						text: '近7日课程积分',
						textStyle: {
							fontSize: 18,
							fontWeight: 600
						},
						left: '0',
						top: '5%'
					},
					legend: {
						icon: 'circle',
						top: '5%',
						right: '5%',
						itemWidth: 6,
						itemGap: 20,
						textStyle: {
							color: '#556677'
						}
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							label: {
								show: true,
								backgroundColor: '#fff',
								color: '#556677',
								borderColor: 'rgba(0,0,0,0)',
								shadowColor: 'rgba(0,0,0,0)',
								shadowOffsetY: 0
							},
							lineStyle: {
								width: 0
							}
						},
						backgroundColor: '#fff',
						textStyle: {
							color: '#5c6c7c'
						},
						padding: [10, 10],
						extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)'
					},
					grid: {
						top: '15%'
					},
					xAxis: [
						{
							type: 'category',
							data: res.data.map(v => {
								let i = v.date.split('-');
								return i[i.length - 1];
							}),
							axisLine: {
								lineStyle: {
									color: '#DCE2E8'
								}
							},
							axisTick: {
								show: false
							},
							axisLabel: {
								interval: 0,
								textStyle: {
									color: '#556677'
								},
								// 默认x轴字体大小
								fontSize: 12,
								// margin:文字到x轴的距离
								margin: 15
							},
							axisPointer: {
								label: {
									// padding: [11, 5, 7],
									padding: [0, 0, 10, 0],
				
									margin: 15,
									// 移入时的字体大小
									fontSize: 12,
									backgroundColor: {
										type: 'linear',
										x: 0,
										y: 0,
										x2: 0,
										y2: 1,
										colorStops: [
											{
												offset: 0,
												color: '#fff' // 0% 处的颜色
											},
											{
												// offset: 0.9,
												offset: 0.86,
												/*
					0.86 = （文字 + 文字距下边线的距离）/（文字 + 文字距下边线的距离 + 下边线的宽度）
					                        
					                        */
												color: '#fff' // 0% 处的颜色
											},
											{
												offset: 0.86,
												color: '#33c0cd' // 0% 处的颜色
											},
											{
												offset: 1,
												color: '#33c0cd' // 100% 处的颜色
											}
										],
										global: false // 缺省为 false
									}
								}
							},
							boundaryGap: false
						}
					],
					yAxis: [
						{
							type: 'value',
							axisTick: {
								show: false
							},
							axisLine: {
								show: true,
								lineStyle: {
									color: '#DCE2E8'
								}
							},
							axisLabel: {
								textStyle: {
									color: '#556677'
								}
							},
							splitLine: {
								show: false
							}
						},
						{
							type: 'value',
							position: 'right',
							axisTick: {
								show: false
							},
							axisLabel: {
								textStyle: {
									color: '#556677'
								},
								formatter: '{value}'
							},
							axisLine: {
								show: true,
								lineStyle: {
									color: '#DCE2E8'
								}
							},
							splitLine: {
								show: false
							}
						}
					],
					series: [
						{
							name: '积分',
							type: 'line',
							data: res.data.map(v => v.courseIntegral),
							symbolSize: 1,
							symbol: 'circle',
							smooth: true,
							yAxisIndex: 0,
							showSymbol: false,
							lineStyle: {
								width: 5,
								color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
									{
										offset: 0,
										color: '#9effff'
									},
									{
										offset: 1,
										color: '#9E87FF'
									}
								]),
								shadowColor: 'rgba(158,135,255, 0.3)',
								shadowBlur: 10,
								shadowOffsetY: 20
							},
							itemStyle: {
								normal: {
									color: colorList[0],
									borderColor: colorList[0]
								}
							}
						},
						{
							data: res.data.map(v => v.averageIntegral),
							type: 'line',
							smooth: true,
							name: '平均积分',
							symbol: 'none',
							lineStyle: {
								color: '#3275FB',
								width: 4,
								shadowColor: 'rgba(255, 255, 255, 0.3)', //设置折线阴影
								shadowBlur: 15,
								shadowOffsetY: 20
							}
						}
					]
				};
				this.sevenJifenData = option;
			});
		},
		getMonthlyCourseIntegral(p = {}) {
			getMonthlyCourseIntegral(p).then(res => {
				if(res.data.length===0) return
				const colorList = ['#9E87FF', '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF'];
				let option = {
					backgroundColor: '#fff',
					title: {
						text: '每月课程积分',
						textStyle: {
							fontSize: 18,
							fontWeight: 600
						},
						left: '0',
						top: '5%'
					},
					legend: {
						icon: 'circle',
						top: '5%',
						right: '5%',
						itemWidth: 6,
						itemGap: 20,
						textStyle: {
							color: '#556677'
						}
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							label: {
								show: true,
								backgroundColor: '#fff',
								color: '#556677',
								borderColor: 'rgba(0,0,0,0)',
								shadowColor: 'rgba(0,0,0,0)',
								shadowOffsetY: 0
							},
							lineStyle: {
								width: 0
							}
						},
						backgroundColor: '#fff',
						textStyle: {
							color: '#5c6c7c'
						},
						padding: [10, 10],
						extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)'
					},
					grid: {
						top: '15%'
					},
					xAxis: [
						{
							type: 'category',
							data: res.data.map(v => {
								let i = v.month.split('-');
								return i[i.length - 1];
							}),
							axisLine: {
								lineStyle: {
									color: '#DCE2E8'
								}
							},
							axisTick: {
								show: false
							},
							axisLabel: {
								interval: 0,
								textStyle: {
									color: '#556677'
								},
								// 默认x轴字体大小
								fontSize: 12,
								// margin:文字到x轴的距离
								margin: 15
							},
							axisPointer: {
								label: {
									// padding: [11, 5, 7],
									padding: [0, 0, 10, 0],

									margin: 15,
									// 移入时的字体大小
									fontSize: 12,
									backgroundColor: {
										type: 'linear',
										x: 0,
										y: 0,
										x2: 0,
										y2: 1,
										colorStops: [
											{
												offset: 0,
												color: '#fff' // 0% 处的颜色
											},
											{
												// offset: 0.9,
												offset: 0.86,
												/*
					0.86 = （文字 + 文字距下边线的距离）/（文字 + 文字距下边线的距离 + 下边线的宽度）
					                        
					                        */
												color: '#fff' // 0% 处的颜色
											},
											{
												offset: 0.86,
												color: '#33c0cd' // 0% 处的颜色
											},
											{
												offset: 1,
												color: '#33c0cd' // 100% 处的颜色
											}
										],
										global: false // 缺省为 false
									}
								}
							},
							boundaryGap: false
						}
					],
					yAxis: [
						{
							type: 'value',
							axisTick: {
								show: false
							},
							axisLine: {
								show: true,
								lineStyle: {
									color: '#DCE2E8'
								}
							},
							axisLabel: {
								textStyle: {
									color: '#556677'
								}
							},
							splitLine: {
								show: false
							}
						},
						{
							type: 'value',
							position: 'right',
							axisTick: {
								show: false
							},
							axisLabel: {
								textStyle: {
									color: '#556677'
								},
								formatter: '{value}'
							},
							axisLine: {
								show: true,
								lineStyle: {
									color: '#DCE2E8'
								}
							},
							splitLine: {
								show: false
							}
						}
					],
					series: [
						{
							name: '积分',
							type: 'line',
							data: res.data.map(v => v.courseIntegral),
							symbolSize: 1,
							symbol: 'circle',
							smooth: true,
							yAxisIndex: 0,
							showSymbol: false,
							lineStyle: {
								width: 5,
								color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
									{
										offset: 0,
										color: '#9effff'
									},
									{
										offset: 1,
										color: '#9E87FF'
									}
								]),
								shadowColor: 'rgba(158,135,255, 0.3)',
								shadowBlur: 10,
								shadowOffsetY: 20
							},
							itemStyle: {
								normal: {
									color: colorList[0],
									borderColor: colorList[0]
								}
							}
						},
						{
							data: res.data.map(v => v.averageIntegral),
							type: 'line',
							smooth: true,
							name: '平均积分',
							symbol: 'none',
							lineStyle: {
								color: '#3275FB',
								width: 4,
								shadowColor: 'rgba(255, 255, 255, 0.3)', //设置折线阴影
								shadowBlur: 15,
								shadowOffsetY: 20
							}
						}
					]
				};
				this.monthJifenData = option;
			});
		},
		getAttendanceStatistics(p = {}) {
			getAttendanceStatistics(p).then(res => {
				let msg = '';
				if (p.time === 'today') {
					msg = '今日考勤';
					this.attendList[0].num=res.data.attendancePeopleNumber
					this.attendList[0].rote=((res.data.attendancePeopleNumber / this.total) * 100).toFixed(2);
				} else if (p.time === 'yesterday') {
					msg = '昨日考勤';
					this.attendList[1].num=res.data.attendancePeopleNumber
					this.attendList[1].rote=((res.data.attendancePeopleNumber / this.total) * 100).toFixed(2);
				} else if (p.time === 'lastMonth') {
					msg = '上月考勤';
					this.attendList[2].num=res.data.attendancePeopleNumber
					this.attendList[2].rote=((res.data.attendancePeopleNumber / this.total) * 100).toFixed(2);
				} else if (p.time === 'thisMonth') {
					msg = '本月考勤';
					this.attendList[3].num=res.data.attendancePeopleNumber
					this.attendList[3].rote=((res.data.attendancePeopleNumber / this.total) * 100).toFixed(2);
				}
				
				let rote = ((res.data.attendancePeopleNumber / this.total) * 100).toFixed(2);
				var data = [rote / 100];
				let option = {
					backgroundColor: '#fff',
					title: {
						text: res.data.attendancePeopleNumber,
						textStyle: {
							fontSize: 25,
							fontFamily: 'Microsoft Yahei',
							fontWeight: 'normal',
							color: '#fff',
							rich: {
								a: {
									fontSize: 25
								}
							}
						},
						x: 'center',
						y: '30%',
						subtext: `${msg}`,
						subtextStyle: {
							fontSize: 15
						}
					},
					graphic: [
						{
							type: 'group',
							left: 'center',
							top: '60%',
							children: [
								{
									type: 'text',
									z: 100,
									left: '10',
									top: 'middle',
									style: {
										fill: '#fff',
										fontSize: 15,
										text: `${rote}%`,
										font: '20px Microsoft YaHei'
									}
								}
							]
						}
					],
					series: [
						{
							type: 'liquidFill',
							radius: '80%',
							center: ['50%', '50%'],
							//  shape: 'roundRect',
							data: data,
							backgroundStyle: {
								color: {
									type: 'radial',
									x: 0.5,
									y: 0.5,
									r: 0.7,
									colorStops: [
										{
											offset: 1,
											color: 'rgba(50, 65, 96, 1)'
										},
										{
											offset: 0.5,
											color: 'rgba(50, 65, 96, 1)'
										},
										{
											offset: 0,
											color: 'rgba(111, 117, 139, 1)'
										}
									],
									globalCoord: false
								}
							},
							outline: {
								borderDistance: 0,
								itemStyle: {
									borderWidth: 0,
									borderColor: {
										type: 'linear',
										x: 1,
										y: 0,
										x2: 0,
										y2: 0,
										colorStops: [
											{
												offset: 0,
												color: 'rgba(212, 252, 125, 0)'
											},
											{
												offset: 0.5,
												color: 'rgba(2, 193, 131, 0)'
											},
											{
												offset: 1,
												color: 'rgba(2, 193, 131, 0)'
											}
										],
										globalCoord: false
									},
									shadowBlur: 10,
									shadowColor: 'rgba(13, 13, 46, 0)'
								}
							},
							color: new echarts.graphic.RadialGradient(0.6, 0, 1, [
								{
									offset: 0,
									color: 'rgba(178, 251, 105, 0)'
								},
								{
									offset: 1,
									color: 'rgba(10, 203, 135, 0)'
								}
							]),
							label: {
								normal: {
									formatter: ''
								}
							}
						},
						{
							type: 'liquidFill',
							radius: '80%',
							center: ['50%', '50%'],
							//  shape: 'roundRect',
							data: data,
							backgroundStyle: {
								color: {
									type: 'radial',
									x: 0.5,
									y: 0.5,
									r: 0.7,
									colorStops: [
										{
											offset: 1,
											color: 'rgba(50, 65, 96, 1)'
										},
										{
											offset: 0.5,
											color: 'rgba(50, 65, 96, 1)'
										},
										{
											offset: 0,
											color: 'rgba(111, 117, 139, 1)'
										}
									],
									globalCoord: false
								}
							},
							outline: {
								borderDistance: 17,
								itemStyle: {
									borderWidth: 7,
									borderColor: {
										type: 'linear',
										x: 1,
										y: 0,
										x2: 0,
										y2: 0,
										colorStops: [
											{
												offset: 0,
												color: 'rgba(212, 252, 125, 1)'
											},
											{
												offset: 0.5,
												color: 'rgba(2, 193, 131, 1)'
											},
											{
												offset: 1,
												color: 'rgba(2, 193, 131, 1)'
											}
										],
										globalCoord: false
									},
									shadowBlur: 10,
									shadowColor: 'rgba(13, 13, 46, 1)'
								}
							},
							color: new echarts.graphic.RadialGradient(0.6, 0, 1, [
								{
									offset: 0,
									color: 'rgba(178, 251, 105, 1)'
								},
								{
									offset: 1,
									color: 'rgba(10, 203, 135, 1)'
								}
							]),
							label: {
								normal: {
									formatter: ''
								}
							}
						}
					]
				};
				if (p.time === 'today') {
					this.todayData = option;
				} else if (p.time === 'yesterday') {
					this.yesterdayData = option;
				} else if (p.time === 'lastMonth') {
					this.lastMonthAttendance = option;
				} else if (p.time === 'thisMonth') {
					this.thisMonthAttendance = option;
				}
			});
		},
		getOrgsAttendanceRank(p = {}) {
			getOrgsAttendanceRank(p).then(res => {
				if(res.data.length===0) return
				// console.log(444, res);
				res.data.sort((a, b) => {
					return b.attendancePeopleNumber - a.attendancePeopleNumber;
				});
				let option = {
					color: ['#aa0000', '#1f9'],
					title: {
						text: '考勤排名',
						top: '5%',
						left: '0'
					},
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b} : {c}'
					},
					grid: {
						top: '25%',
						right: '5%',
						left: '5%',
						bottom: '10%'
					},
					xAxis: {
						type: 'category',
						data: res.data.map(v => v.orgName),
						show: false
					},
					yAxis: [
						{
							axisLine: {
								show: false,
								lineStyle: {
									color: '#ccc'
								}
							},
							type: 'value',
							axisTick: {
								show: false
							},
							splitLine: {
								show: true,
								lineStyle: {
									color: '#384267'
								}
							},
							axisLabel: {
								color: '#cccccc',
								fontSize: '10'
							}
						},
						{
							type: 'value',
							name: '',
							position: 'right',
							axisLabel: {
								formatter: '{value} %',
								color: '#27719F'
							},
							max: 100,
							splitLine: {
								show: false
							},
							axisPointer: {
								show: true
							},
							axisTick: {
								show: false
							},
							axisLine: {
								show: true,
								lineStyle: {
									color: '#27719F'
								}
							}
						}
					],
					series: [
						{
							type: 'bar',
							name: '人数',
							barWidth: '20',
							data: res.data.map(v => v.attendancePeopleNumber),
							itemStyle: {
								normal: {
									color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
										{
											offset: 0,
											color: '#ff0000'
										},
										{
											offset: 1,
											color: '#ff0000'
										}
									])
								}
							}
						}
					]
				};
				this.attendanceRank = option;
			});
		},
		getLast7DaysAttendanceStatistics(p = {}) {
			getLast7DaysAttendanceStatistics(p).then(res => {
				// console.log(11111, res);
				res.data.reverse();
				const colorList = ['#9E87FF', '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF'];
				let option = {
					backgroundColor: '#fff',
					title: {
						text: '近7日考勤人数',
						textStyle: {
							fontSize: 18,
							fontWeight: 600
						},
						left: '0',
						top: '5%'
					},
					legend: {
						icon: 'circle',
						top: '5%',
						right: '5%',
						itemWidth: 6,
						itemGap: 20,
						textStyle: {
							color: '#556677'
						}
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							label: {
								show: true,
								backgroundColor: '#fff',
								color: '#556677',
								borderColor: 'rgba(0,0,0,0)',
								shadowColor: 'rgba(0,0,0,0)',
								shadowOffsetY: 0
							},
							lineStyle: {
								width: 0
							}
						},
						backgroundColor: '#fff',
						textStyle: {
							color: '#5c6c7c'
						},
						padding: [10, 10],
						extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)'
					},
					grid: {
						top: '15%'
					},
					xAxis: [
						{
							type: 'category',
							data: res.data.map(v => {
								let i = v.date.split('-');
								return i[i.length - 1];
							}),
							axisLine: {
								lineStyle: {
									color: '#DCE2E8'
								}
							},
							axisTick: {
								show: false
							},
							axisLabel: {
								interval: 0,
								textStyle: {
									color: '#556677'
								},
								// 默认x轴字体大小
								fontSize: 12,
								// margin:文字到x轴的距离
								margin: 15
							},
							axisPointer: {
								label: {
									// padding: [11, 5, 7],
									padding: [0, 0, 10, 0],

									margin: 15,
									// 移入时的字体大小
									fontSize: 12,
									backgroundColor: {
										type: 'linear',
										x: 0,
										y: 0,
										x2: 0,
										y2: 1,
										colorStops: [
											{
												offset: 0,
												color: '#fff' // 0% 处的颜色
											},
											{
												// offset: 0.9,
												offset: 0.86,
												/*
					0.86 = （文字 + 文字距下边线的距离）/（文字 + 文字距下边线的距离 + 下边线的宽度）
					                        
					                        */
												color: '#fff' // 0% 处的颜色
											},
											{
												offset: 0.86,
												color: '#33c0cd' // 0% 处的颜色
											},
											{
												offset: 1,
												color: '#33c0cd' // 100% 处的颜色
											}
										],
										global: false // 缺省为 false
									}
								}
							},
							boundaryGap: false
						}
					],
					yAxis: [
						{
							type: 'value',
							axisTick: {
								show: false
							},
							axisLine: {
								show: true,
								lineStyle: {
									color: '#DCE2E8'
								}
							},
							axisLabel: {
								textStyle: {
									color: '#556677'
								}
							},
							splitLine: {
								show: false
							}
						},
						{
							type: 'value',
							position: 'right',
							axisTick: {
								show: false
							},
							axisLabel: {
								textStyle: {
									color: '#556677'
								},
								formatter: '{value}'
							},
							axisLine: {
								show: true,
								lineStyle: {
									color: '#DCE2E8'
								}
							},
							splitLine: {
								show: false
							}
						}
					],
					series: [
						{
							name: '人数',
							type: 'line',
							data: res.data.map(v => v.attendancePeopleNumber),
							symbolSize: 1,
							symbol: 'circle',
							smooth: true,
							yAxisIndex: 0,
							showSymbol: false,
							lineStyle: {
								width: 5,
								color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
									{
										offset: 0,
										color: '#9effff'
									},
									{
										offset: 1,
										color: '#9E87FF'
									}
								]),
								shadowColor: 'rgba(158,135,255, 0.3)',
								shadowBlur: 10,
								shadowOffsetY: 20
							},
							itemStyle: {
								normal: {
									color: colorList[0],
									borderColor: colorList[0]
								}
							}
						},
						{
							data: res.data.map(v => v.averageAttendanceNumber),
							type: 'line',
							smooth: true,
							name: '平均人数',
							symbol: 'none',
							lineStyle: {
								color: '#3275FB',
								width: 4,
								shadowColor: 'rgba(255, 255, 255, 0.3)', //设置折线阴影
								shadowBlur: 15,
								shadowOffsetY: 20
							}
						}
					]
				};
				this.sevenAttendanceData = option;
			});
		},
		getCourseCount(p = {}) {
			getCourseCount(p).then(res => {
				// console.log(99,res);
				this.resgistList[3].num = res.data;
			});
		},
		getQuestionCount(p = {}) {
			getQuestionCount(p).then(res => {
				this.resgistList[4].num = res.data;
			});
		},
		getIntegralPersonRank(p = {}) {
			getIntegralPersonRank(p).then(res => {
				// console.log(1,res);
				this.sortPerson = res.data;
			});
		},
		getIntegralOrgsRank(p = {}) {
			getIntegralOrgsRank(p).then(res => {
				// console.log(2,res);
				if(res.data.length===0) return
				this.sortOrg = res.data;
			});
		},
		getOrgsAttendanceStatistics(p={}){
			getOrgsAttendanceStatistics(p).then(res=>{
				if(res.data.length===0) return
				// console.log(111111111,res);
				let option = {
					    tooltip: {
					        trigger: 'axis',
					        axisPointer: { // 坐标轴指示器，坐标轴触发有效
					            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					        },
					    },
					    legend: {
					        selectedMode:true,//取消图例上的点击事件
					        data: ['总人数','考勤人数']
					    },
					    grid: {
					        left: '5px',
					        right: '4%',
					        bottom: '45px',
					        containLabel: true
					    },
					    xAxis: [{
									show:false,
					        type: 'value',
					        axisLabel: {
					            formatter: '{value}'
					        },
									name:'历史人数'
					    }],
					    yAxis: [{
					         type: 'category',
					        data: res.data.map(v=>v.orgName)
					    }],
					    "dataZoom": [{
					        "yAxisIndex": [0],
					        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
					    }],
							color:['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
					    series: [
								
					        {
					            name: '考勤人数',
					            type: 'bar',
					            stack: '饱和度',
					            data: res.data.map(v=>v.attendancePeopleNumber)
					        },
									{
									    name: '总人数',
									    type: 'bar',
									    stack: '饱和度',
									    data: res.data.map(v=>v.totalPeopleNumber),
											label: {
											    normal: {
											        show: true,
											        position: 'right',
											        formatter: '{c}',
															offset: [10, 0],
											        textStyle: {
											            align: 'center',
											            baseline: 'middle',
											            fontSize: 10,
											            fontWeight: '400',
											        }
											    },
											},
									},
									
					    ]
					};
					this.attendanceData=option
			})
		},
		getData() {
			this.showLoading()
			this.getRegisterStatistics({orgCode:this.orgCode});
			this.getIntegralStatistics({orgCode:this.orgCode});
			this.getRegisterNumberByOrgCode({orgCode:this.orgCode});
			this.getRegisterNumberByOrgCode({orgCode:this.orgCode});
			this.getCourseParticipationRate({orgCode:this.orgCode});
			this.getCourseIntegralConstitute({orgCode:this.orgCode});
			this.getLast7daysCourseIntegral({orgCode:this.orgCode});
			this.getMonthlyCourseIntegral({orgCode:this.orgCode});
			this.getAttendanceStatistics({ time: 'today',orgCode:this.orgCode });
			this.getAttendanceStatistics({ time: 'yesterday',orgCode:this.orgCode });
			this.getAttendanceStatistics({ time: 'lastMonth',orgCode:this.orgCode });
			this.getAttendanceStatistics({ time: 'thisMonth',orgCode:this.orgCode });
			this.getLast7DaysAttendanceStatistics({orgCode:this.orgCode});
			this.getOrgsAttendanceRank({ time: 'thisMonth' });
			this.getCourseCount({orgCode:this.orgCode});
			this.getQuestionCount({orgCode:this.orgCode});
			this.getIntegralPersonRank({ time: 'thisMonth',orgCode:this.orgCode });
			this.getIntegralOrgsRank({ time: 'thisMonth',orgCode:this.orgCode });
			this.getOrgsAttendanceStatistics({ time: 'thisMonth',orgCode:this.orgCode });
			this.hideLoading()
		},
		getSysOrgTree(){
			api.getSysOrgTreeAPI({orgCode:this.orgCode}).then(res=>{
				// console.log(res);
				if(res.code==0){
					let d=res.data[0].childrenOrg
					this.orgList=d.map(v=>{
						v.childrenOrg=null
						return v
					})
					if(this.orgCode==''){
						this.orgList.unshift({orgName:'全部',orgCode:this.orgCode})
					}else{
						this.orgList=[]
						this.orgList.unshift({orgName:'全部',orgCode:''})
					}
				}
			})
		},
	},
	computed:{
		...mapState({
			user:s=>s.userInfo
		}),
		orgCode(){
			return this.user.projectDepartment==='admin'?'':this.user.projectDepartment
		}
	},
	created() {
		const loading = this.$loading({
				lock: true,
				text: '加载中...',
				spinner: 'el-icon-loading',
				background: 'rgba(255, 255, 255, 0.7)'
			});
		let params = { pageNo: 1, pageSize: 10 };
		this.getSysOrgTree()
		this.getData();
		// console.log(this.$echarts);
		this.newsPage(params);
		this.noticeByPage(params);
		this.queryExamPlanByPage(params);
		this.queryCourseByPage(params);
		this.queryBookByPage(params);
		this.queryStudentByPage(params);
		setTimeout(()=>{
			loading.close();
		},1000)
	},
	mounted() {}
};
</script>

<style>
.box-card::-webkit-scrollbar {
	width: 0 !important;
}
.box-card {
	height: 850px !important;
	overflow-y: scroll;
	-ms-overflow-style: none;
	overflow: -moz-scrollbars-none;
}
.el-card {
	border: 0;
}
.item-box-card::-webkit-scrollbar {
	width: 0 !important;
}
.item-box-card {
	min-height: 400px;
	max-height: 400px;
	overflow-y: auto;
	-ms-overflow-style: none;
	overflow: -moz-scrollbars-none;
}
.show-sort {
	background-color: #409eff;
	color: white;
	padding: 5px 10px;
	border-radius: 5px;
	margin-right: 10px;
}
.show-sorts {
	background-color: grey;
	color: white;
	padding: 5px 10px;
	border-radius: 5px;
	margin-right: 10px;
}
.color-red {
	color: red;
}
.color-blue {
	color: #409eff;
}
.color-ye {
	color: green;
}
</style>
